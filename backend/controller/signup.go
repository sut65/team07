package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
	"github.com/sut65/team07/services"
)

// ---------------------------------------------- ฟังก์ชัน Role  ------------------------

func CreateRole(c *gin.Context) {
	var role entity.Role

	if err := c.ShouldBindJSON(&role); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}

	if err := entity.DB().Create(&role).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"err": err.Error()})
		c.Abort()
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"status": "create role success",
		"data":   role,
	})

}

func ListRole(c *gin.Context) {
	var role []entity.Role

	if err := entity.DB().Raw("SELECT * FROM roles").Find(&role).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": role,
	})
}

// ---------------------------------------------- ฟังก์ชัน Signup ของ User ------------------------

type signup struct {
	Name     string `json:"user_name"`
	Password string
	RoleName string
}

func Signup(c *gin.Context) {

	// สำหรับรับค่า User
	var user entity.User
	// สำหรับรับค่า Role
	var role entity.Role
	// สำหรับรับค่า signup จาก Body ของ forntend
	var signup signup

	if err := c.ShouldBindJSON(&signup); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		//ถ้า Error ให้ทำการ Abort ค่าทิ้งเลย ไม่ต้องทำงานต่อ
		c.Abort()
		return
	}

	// ค้นหา role จาก DB
	if tx := entity.DB().Where("name = ?", signup.RoleName).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		//ถ้า ไม่พบ Role ให้ทำการ Abort ทิ้งเลย ไม่ต้องทำงานต่อ
		c.Abort()
		return
	}

	// check ว่ามี user อยู่แล้วไหม
	if tx := entity.DB().Where("name = ?", signup.Name).First(&user); tx.RowsAffected != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "have user in database"})
		//ถ้าพบว่ามี user อยู่แล้วให้ทำการ Abort ทิ้งเลย ไม่ต้องทำงานต่อ
		c.Abort()
		return
	}

	password, err := services.Hash(signup.Password)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cannot hashing password"})
		c.Abort()
		return
	}

	//สร้าง User ขึ้นมา เก็บใส่ var user
	user = entity.User{
		Name:     signup.Name,
		Password: password,
		Role:     role,
	}

	//ทำการ Create User ลงในตาราง User
	if err := entity.DB().Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"err": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"status": "created User in User entity",
		"data":   user,
	})

}

// -------------------- User --------------------
func ListUser(c *gin.Context) {
	var users []entity.User
	if err := entity.DB().Preload("Role").Raw("SELECT * FROM users").Find(&users).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": users,
	})
}

// -------------------- User --------------------
