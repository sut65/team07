package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
)

// POST /carWash
func CreateCarWash(c *gin.Context) {

	var ambulance entity.Ambulance
	var statusAm entity.StatusAm
	var employee entity.Employee
	var carWash entity.CarWash

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 จะถูก bind เข้าตัวแปร carWash
	if err := c.ShouldBindJSON(&carWash); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 3: ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", carWash.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employees not found"})
		return
	}

	// 8: ค้นหา statusAm ด้วย id
	if tx := entity.DB().Where("id = ?", carWash.StatusAmID).First(&statusAm); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statusAm not found"})
		return
	}

	// 9: ค้นหา ambulance ด้วย id
	if tx := entity.DB().Where("id = ?", carWash.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ambulance not found"})
		return
	}

	// 11: สร้าง carWash
	cd := entity.CarWash{
		Employee:   employee,           // โยงความสัมพันธ์กับ Entity em
		Ambulance:  ambulance,          // โยงความสัมพันธ์กับ Entity am
		StatusAm:   statusAm,           // โยงความสัมพันธ์กับ Entity StatusAm
		ComName:    carWash.ComName,    // ตั้งค่าฟิลด์ ComName
		ComTel:     carWash.ComTel,     // ตั้งค่าฟิลด์ ComTel
		ReceiptNum: carWash.ReceiptNum, // ตั้งค่าฟิลด์ ReceiptNum
		SerFees:    carWash.SerFees,    // ตั้งค่าฟิลด์ SerFees
		Date:       carWash.Date,       // ตั้งค่าฟิลด์ Date
	}

	// 12: บันทึก
	if err := entity.DB().Create(&cd).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cd})
}

// GET /carWash/:id
func GetCarWash(c *gin.Context) {

	var carWash entity.CarWash
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM car_washs WHERE id = ?", id).Scan(&carWash).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carWash})
}

// GET /carWash/:empid
func GetCarWashByEmployee(c *gin.Context) {

	var carWash []entity.CarWash
	employee_id := c.Param("empid")

	if err := entity.DB().Preload("Employee").Preload("Ambulance").Preload("StatusAm").Raw("SELECT * FROM car_washs WHERE employee_id = ?", employee_id).Find(&carWash).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carWash, "status": "getCarWashByEmployee success "})
}

// GET /carWashs
func ListCarWashs(c *gin.Context) {

	var carWashs []entity.CarWash

	if err := entity.DB().Preload("Employee").Preload("Ambulance").Preload("StatusAm").Raw("SELECT * FROM car_washs").Find(&carWashs).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carWashs})
}

// DELETE /carWash/:id
func DeleteCarWash(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM car_washs WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "carWash not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// Update CarWash
func UpdateCarWash(c *gin.Context) {

	//main
	var carWash entity.CarWash
	var carWashold entity.CarWash

	//relation
	var employee entity.Employee
	var ambulance entity.Ambulance
	var statusAm entity.StatusAm

	// Bind Json to var emp
	if err := c.ShouldBindJSON(&carWash); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check carWash is haved ?
	if tx := entity.DB().Where("id = ?", carWash.ID).First(&carWashold); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("CarWash id = %d not found", carWash.ID)})
		c.Abort()
		return
	}

	if carWash.ComName == "" {
		carWash.ComName = carWashold.ComName
	}

	if carWash.ComTel == "" {
		carWash.ComTel = carWashold.ComTel
	}

	if carWash.ReceiptNum == "" {
		carWash.ReceiptNum = carWashold.ReceiptNum
	}

	if carWash.SerFees == 0 {
		carWash.SerFees = carWashold.SerFees
	}

	if carWash.Date.String() == "0001-01-01 00:00:00 +0000 UTC" {
		carWash.Date = carWashold.Date
	}

	// if have new employee_id
	if carWash.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", carWash.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		carWash.Employee = employee
	} else {
		if tx := entity.DB().Where("id = ?", carWash.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		carWash.Employee = employee
	}

	// if have new ambulance_id
	if carWash.AmbulanceID != nil {
		if tx := entity.DB().Where("id = ?", carWash.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found ambulance"})
			return
		}
		fmt.Print("NOT NULL")
		carWash.Ambulance = ambulance
	} else {
		if tx := entity.DB().Where("id = ?", carWash.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found ambulance"})
			return
		}
		fmt.Print("NULL")
		carWash.Ambulance = ambulance
	}

	// if have new StatusAm
	if carWash.StatusAmID != nil {
		if tx := entity.DB().Where("id = ?", carWash.StatusAmID).First(&statusAm); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found statusAm"})
			return
		}
		carWash.StatusAm = statusAm
	} else {
		if tx := entity.DB().Where("id = ?", carWash.StatusAmID).First(&statusAm); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found statusAm"})
			return
		}
		carWash.StatusAm = statusAm
	}

	// Update carWash in database
	if err := entity.DB().Save(&carWash).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   carWash,
	})

}

// GET /StatusAm
func ListStatusAms(c *gin.Context) {

	var statusAms []entity.StatusAm

	if err := entity.DB().Raw("SELECT * FROM statusAms").Scan(&statusAms).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": statusAms})
}
