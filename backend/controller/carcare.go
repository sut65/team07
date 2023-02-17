package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
)

// POST /carcare
func CreateCarcare(c *gin.Context) {

	var carcare entity.Carcare
	var carstat entity.Carstat
	var employee entity.Employee
	var vehicleinspection entity.VehicleInspection

	// bind เข้าตัวแปร carcare
	if err := c.ShouldBindJSON(&carcare); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา carstat ด้วย id
	if tx := entity.DB().Where("id = ?", carcare.CarStatID).First(&carstat); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "companies not found"})
		return
	}

	// ค้นหา vehicleInspection ด้วย id
	if tx := entity.DB().Where("id = ?", carcare.VehicleInspectionID).First(&vehicleinspection); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type_abls not found"})
		return
	}

	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", carcare.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employees not found"})
		return
	}

	// 11: สร้าง carcare
	st := entity.Carcare{
		SaveDate:          carcare.SaveDate,
		ReciveDate:        carcare.ReciveDate,
		Bill:              carcare.Bill,
		Note:              carcare.Note,
		CarStat:           carstat,
		VehicleInspection: vehicleinspection,
		Employee:          employee,
	}

	// บันทึก
	if err := entity.DB().Create(&st).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": st})
}

// GET /carcare/:id
func GetCarcare(c *gin.Context) {
	var carcare entity.Carcare
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM carcares WHERE id = ?", id).Scan(&carcare).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carcare})
}

// GET /carcares
func ListCarcare(c *gin.Context) {
	var carcares []entity.Carcare
	if err := entity.DB().Raw("SELECT * FROM carcares").Scan(&carcares).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carcares})
}

// DELETE /carcares/:id
func DeleteCarcare(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM carcares WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "carcare not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /carcares
func UpdateCarcare(c *gin.Context) {

	var carcare entity.Carcare
	var carstat entity.Carstat
	var vehicleinspection entity.VehicleInspection
	var employee entity.Employee

	if err := c.ShouldBindJSON(&carcare); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", carcare.ID).First(&carcare); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "carcare not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", carstat.ID).First(&carstat); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "carstat not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", vehicleinspection.ID).First(&vehicleinspection); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "vehicleInspection not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", employee.ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	UpdateCarcare := entity.Carcare{
		CarStat:    carstat,
		SendDate:   carcare.SendDate,
		ReciveDate: carcare.ReciveDate,
		Bill:       carcare.Bill,
		Note:       carcare.Note,
		SaveDate:   carcare.SaveDate,
	}

	if err := entity.DB().Where("id = ?", carcare.ID).Updates(&UpdateCarcare).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "update successful!!",
		"data":   UpdateCarcare,
	})
}

// GET /emergencys
func Getcarstat(c *gin.Context) {
	var carstats []entity.Carstat
	if err := entity.DB().Raw("SELECT * FROM carstats").Scan(&carstats).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carstats})
}
