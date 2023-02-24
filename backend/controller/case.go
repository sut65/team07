package controller

import (
	"fmt"
	"net/http"

	"github.com/asaskevich/govalidator"
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

	// แทรกการ validate controller
	if _, err := govalidator.ValidateStruct(emercase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา emergency ด้วย id
	if tx := entity.DB().Where("id = ?", emercase.EmergencyID).First(&emergency); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "โปรดเลือกประเภทเหตุฉุกเฉิน"})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", emercase.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "โปรดเลือกเพศ"})
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
		Emergency: emergency,
		Gender:    gender,
		Employee:  employee,
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
	if err := entity.DB().Preload("Emergency").Preload("Gender").Preload("Employee").Raw("SELECT * FROM cases WHERE id = ?", id).Find(&emercase).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": emercase})
}

// GET /emercases
func ListEmercase(c *gin.Context) {
	var emercases []entity.Case
	if err := entity.DB().Preload("Emergency").Preload("Gender").Raw("SELECT * FROM cases").Find(&emercases).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": emercases})
}

// DELETE /emercases/:id
func DeleteEmercase(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM cases WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "emercase not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /emercases
func UpdateEmercase(c *gin.Context) {

	var emercase entity.Case
	var emercaseold entity.Case
	var emergency entity.Emergency
	var gender entity.Gender
	var employee entity.Employee

	if err := c.ShouldBindJSON(&emercase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check emercase is haved ?
	if tx := entity.DB().Where("id = ?", emercase.ID).First(&emercaseold); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Carcare id = %d not found", emercase.ID)})
		c.Abort()
		return
	}

	if emercase.EmergencyID != nil {
		if tx := entity.DB().Where("id = ?", emercase.EmergencyID).First(&emergency); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found emergency"})
			return
		}
		fmt.Print("NOT NULL")
		emercase.Emergency = emergency
	} else {
		if tx := entity.DB().Where("id = ?", emercase.EmergencyID).First(&emergency); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found emergency"})
			return
		}
		fmt.Print("NULL")
		emercase.Emergency = emergency
	}

	if emercase.GenderID != nil {
		if tx := entity.DB().Where("id = ?", emercase.GenderID).First(&gender); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found gender"})
			return
		}
		fmt.Print("NOT NULL")
		emercase.Gender = gender
	} else {
		if tx := entity.DB().Where("id = ?", emercase.GenderID).First(&gender); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found gender"})
			return
		}
		fmt.Print("NULL")
		emercase.Gender = gender
	}

	if emercase.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", emercase.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		fmt.Print("NOT NULL")
		emercase.Employee = employee
	} else {
		if tx := entity.DB().Where("id = ?", emercase.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		fmt.Print("NULL")
		emercase.Employee = employee
	}

	// แทรกการ validate controller
	if _, err := govalidator.ValidateStruct(emercase); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&emercase).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "update successful!!",
		"data":   emercase,
	})
}

// GET /carstat
func GetEmergency(c *gin.Context) {
	var emergencies []entity.Emergency
	if err := entity.DB().Raw("SELECT * FROM emergencies").Scan(&emergencies).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": emergencies})
}

// GET /genders
func GetGender(c *gin.Context) {
	var genders []entity.Gender
	if err := entity.DB().Raw("SELECT * FROM genders").Scan(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": genders})
}
