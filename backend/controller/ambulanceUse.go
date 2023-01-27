package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
)

// POST /ambulanceUse
func CreateAmbulanceUse(c *gin.Context) {

	var ambulanceUse entity.AmbulanceUse
	var employee entity.Employee
	var medicine entity.Medicine
	var ambulance entity.Ambulance

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 bind เข้าตัวแปร ambulanceUse
	if err := c.ShouldBindJSON(&ambulanceUse); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", ambulanceUse.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employees not found"})
		return
	}

	// 9: ค้นหา medicine ด้วย id
	if tx := entity.DB().Where("id = ?", ambulanceUse.MedicineID).First(&medicine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicines not found"})
		return
	}

	// 10: ค้นหา ambulance ด้วย id
	if tx := entity.DB().Where("id = ?", ambulanceUse.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ambulances not found"})
		return
	}

	// 11: สร้าง ambulanceUse
	amu := entity.AmbulanceUse{

		Employee:  employee,            // โยงความสัมพันธ์กับ Entity Employee
		Medicine:  medicine,            // โยงความสัมพันธ์กับ Entity Medicine
		Ambulance: ambulance,           // โยงความสัมพันธ์กับ Entity Ambulance
		Amount:    ambulanceUse.Amount, // ตั้งค่าฟิลด์ Amount
		Date:      ambulanceUse.Date,   // ตั้งค่าฟิลด์ Date

	}

	// 12: บันทึก
	if err := entity.DB().Create(&amu).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": amu})
}

// GET /ambulanceUse/:id
func GetAmbulanceUse(c *gin.Context) {

	var ambulanceUse entity.AmbulanceUse
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM ambulance_use WHERE id = ?", id).Scan(&ambulanceUse).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ambulanceUse})
}

// GET /ambulanceUse/:eid
func GetAmbulanceUseByEmployee(c *gin.Context) {

	var ambulanceUse []entity.AmbulanceUse
	employee_id := c.Param("eid")

	if err := entity.DB().Preload("Employee").Preload("Ambulance").Preload("Medicine").Raw("SELECT * FROM ambulance_uses WHERE employee_id = ?", employee_id).Find(&ambulanceUse).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ambulanceUse, "status": "getAmbulanceUseByEmployee success "})
}

// GET /ambulanceUses
func ListAmbulanceUse(c *gin.Context) {

	var ambulanceUse []entity.AmbulanceUse

	if err := entity.DB().Preload("Employee").Preload("Medicine").Preload("Medicine").Raw("SELECT * FROM ambulance_uses").Find(&ambulanceUse).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ambulanceUse})
}

// DELETE /ambulanceUse/:id
func DeleteAmbulanceUse(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM ambulance_uses WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "ambulanceUse not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// Update AmbulanceUse
func UpdateAmbulanceUse(c *gin.Context) {

	//main
	var ambulanceUse entity.AmbulanceUse
	var ambulanceUseOld entity.AmbulanceUse

	//relation
	var employee entity.Employee
	var medicine entity.Medicine
	var ambulance entity.Ambulance

	// Bind Json to var emp
	if err := c.ShouldBindJSON(&ambulanceUse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check abl is haved ?
	if tx := entity.DB().Where("id = ?", ambulanceUse.ID).First(&ambulanceUseOld); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("AmbulanceUse id = %d not found", ambulanceUse.ID)})
		c.Abort()
		return
	}

	if ambulanceUse.Amount == 0 {
		ambulanceUse.Amount = ambulanceUseOld.Amount
	}

	if ambulanceUse.Date.String() == "0001-01-01 00:00:00 +0000 UTC" {
		ambulanceUse.Date = ambulanceUseOld.Date
	}

	// if new have employee_id
	if ambulanceUse.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", ambulanceUse.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		fmt.Print("NOT NULL")
		ambulanceUse.Employee = employee
	} else {
		if tx := entity.DB().Where("id = ?", ambulanceUse.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		fmt.Print("NULL")
		ambulanceUse.Employee = employee
	}

	// if new have medicine_id
	if ambulanceUse.MedicineID != nil {
		if tx := entity.DB().Where("id = ?", ambulanceUse.MedicineID).First(&medicine); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found medicine"})
			return
		}
		ambulanceUse.Medicine = medicine
	} else {
		if tx := entity.DB().Where("id = ?", ambulance.TypeAblID).First(&medicine); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found medicine"})
			return
		}
		ambulanceUse.Medicine = medicine
	}

	// if new have ambulance_id
	if ambulance.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", ambulanceUse.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found ambulance"})
			return
		}
		ambulanceUse.Ambulance = ambulance
	} else {
		if tx := entity.DB().Where("id = ?", ambulanceUse.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found ambulance"})
			return
		}
		ambulanceUse.Ambulance = ambulance
	}

	// Update ambulanceUse in database
	if err := entity.DB().Save(&ambulanceUse).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   ambulanceUse,
	})

}

// GET /medicine
func ListMedicines(c *gin.Context) {

	var medicines []entity.Medicine

	if err := entity.DB().Raw("SELECT * FROM medicines").Scan(&medicines).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": medicines})
}
