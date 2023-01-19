package controller

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
	"github.com/sut65/team07/services"
)

type LoginPayload struct {
	User     string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token    string
	UserID   uint   `json:"user_id"`
	RoleName string `json:"role_name"`
}

// POST /signin
func Signin(c *gin.Context) {
	var payload LoginPayload
	var user entity.User
	var role entity.Role
	var employee entity.Employee

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ค้นหา login ด้วย Username ที่ผู้ใช้กรอกมา
	if err := entity.DB().Raw("SELECT * FROM user WHERE name = ?", payload.User).Scan(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ตรวจสอบ Password
	err := services.VerifyPassword(user.Password, payload.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user credentials"})
		return
	}

	//ค้นหา Employee Role ID ด้วย login_id
	if err := entity.DB().Raw("SELECT * FROM employees WHERE user_id = ?", user.ID).Scan(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ค้นหา Role ด้วย role_id
	if err := entity.DB().Raw("SELECT * FROM roles WHERE id = ?", user.RoleID).Scan(&role).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	jwtWrapper := services.JwtWrapper{
		SecretKey:      "Secret",
		Issuer:         "AuthService",
		ExpirationHour: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(user.ID, role.Name)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse{
		Token:    signedToken,
		UserID:   user.ID,
		RoleName: role.Name,
	}
	fmt.Print(tokenResponse)
	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

// GET /valid
// validation token
func Validation(c *gin.Context) {
	clientToken := c.Request.Header.Get("Authorization")
	if clientToken == "" {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "No Authorization header provided",
		})
		return
	}

	extractedToken := strings.Split(clientToken, "Bearer ")

	if len(extractedToken) == 2 {
		clientToken = strings.TrimSpace(extractedToken[1])
	} else {
		c.JSON(http.StatusBadGateway, gin.H{"error": "Incorrect Format of Authorization Token", "len": extractedToken})
		return
	}

	jwtWrapper := services.JwtWrapper{
		SecretKey: "Secret",
		Issuer:    "AuthService",
	}

	claims, err := jwtWrapper.ValidateToken(clientToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "Valid Ok",
		"data":   claims,
	})
}
