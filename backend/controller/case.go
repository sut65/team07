package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
)

// POST /emercase
func CreateEmercase(c *gin.Context) {

	var emercase entity.Case
	var emergency entity.Emergency
	var gender entity.Gender
	var employee entity.Employee

	// bind เข้าตัวแปร emercase
	if err := c.ShouldBindJSON(&emercase); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา emergency ด้วย id
	if tx := entity.DB().Where("id = ?", emercase.EmergencyID).First(&emergency); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "companies not found"})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", emercase.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type_abls not found"})
		return
	}

	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", emercase.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employees not found"})
		return
	}

	// 11: สร้าง emercase
	st := entity.Case{
		Location:  emercase.Location,
		Patient:   emercase.Patient,
		Age:       emercase.Age,
		Status:    emercase.Status,
		Emergency: emergency, // โยงความสัมพันธ์กับ Entity Company
		Gender:    gender,    // โยงความสัมพันธ์กับ Entity TypeAbl
		Employee:  employee,  // โยงความสัมพันธ์กับ Entity Employee
		Datetime:  emercase.Datetime,
	}

	// บันทึก
	if err := entity.DB().Create(&st).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": st})
}

// GET /emercase/:id
func GetEmercase(c *gin.Context) {
	var emercase entity.Case
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM emercases WHERE id = ?", id).Scan(&emercase).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": emercase})
}

// GET /emercases
func ListEmercase(c *gin.Context) {
	var emercases []entity.Case
	if err := entity.DB().Raw("SELECT * FROM emercases").Scan(&emercases).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": emercases})
}

// DELETE /emercases/:id
func DeleteEmercase(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM emercases WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "emercase not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /emercases
func UpdateEmercase(c *gin.Context) {

	var emercase entity.Case
	var emergency entity.Emergency
	var gender entity.Gender
	var employee entity.Employee

	if err := c.ShouldBindJSON(&emercase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", emercase.ID).First(&emercase); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "emercase not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", emergency.ID).First(&emergency); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "emergency not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", gender.ID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", employee.ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	UpdateEmercase := entity.Case{
		Location:  emercase.Location,
		Patient:   emercase.Patient,
		Age:       emercase.Age,
		Status:    emercase.Status,
		Emergency: emergency, // โยงความสัมพันธ์กับ Entity Company
		Gender:    gender,    // โยงความสัมพันธ์กับ Entity TypeAbl
		Employee:  employee,  // โยงความสัมพันธ์กับ Entity Employee
		Datetime:  emercase.Datetime,
	}

	if err := entity.DB().Where("id = ?", emercase.ID).Updates(&UpdateEmercase).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "update successful!!",
		"data":   UpdateEmercase,
	})
}

