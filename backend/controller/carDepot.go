package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
)

// POST /ambulance
func CreateCarDepot(c *gin.Context) {

	var ambulance entity.Ambulance
	var park entity.Park
	var employee entity.Employee
	var carDepot entity.CarDepot
	// 3: ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", ambulance.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employees not found"})
		return
	}

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 จะถูก bind เข้าตัวแปร carDepot
	if err := c.ShouldBindJSON(&carDepot); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา park ด้วย id
	if tx := entity.DB().Where("id = ?", carDepot.ParkID).First(&park); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "parks not found"})
		return
	}

	// 9: ค้นหา ambulance ด้วย id
	if tx := entity.DB().Where("id = ?", carDepot.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ambulance not found"})
		return
	}

	// 11: สร้าง carDepot
	cd := entity.CarDepot{
		Employee:  employee,         // โยงความสัมพันธ์กับ Entity em
		Ambulance: ambulance,        // โยงความสัมพันธ์กับ Entity am
		Park:      park,             // โยงความสัมพันธ์กับ Entity Park
		EmpCode:   carDepot.EmpCode, // ตั้งค่าฟิลด์ empCode
		PNum:      carDepot.PNum,    // ตั้งค่าฟิลด์ PNum
		Date:      carDepot.Date,    // ตั้งค่าฟิลด์ Date
	}

	// 12: บันทึก
	if err := entity.DB().Create(&cd).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cd})
}

// GET /carDepot/:id
func GetCarDepot(c *gin.Context) {

	var carDepot entity.CarDepot
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM carDepots WHERE id = ?", id).Scan(&carDepot).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carDepot})
}

// GET /carDepot/:empid
func GetCarDepotByEmployee(c *gin.Context) {

	var carDepot []entity.CarDepot
	employee_id := c.Param("empid")

	if err := entity.DB().Preload("Employee").Preload("Ambulance").Preload("Park").Raw("SELECT * FROM carDepot WHERE employee_id = ?", employee_id).Find(&carDepot).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carDepot, "status": "getCarDepotByEmployee success "})
}

// GET /cardepots
func ListCarDepots(c *gin.Context) {

	var carDepots []entity.CarDepot

	if err := entity.DB().Preload("Employee").Preload("Ambulance").Preload("Park").Raw("SELECT * FROM carDepots").Find(&carDepots).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": carDepots})
}

// DELETE /carDepot/:id
func DeleteCarDepot(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM carDepots WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "carDepot not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// Update CarDepot
func UpdateCardepot(c *gin.Context) {

	//main
	var carDepot entity.CarDepot
	var carDepotold entity.CarDepot

	//relation
	var employee entity.Employee
	var ambulance entity.Ambulance
	var park entity.Park

	// Bind Json to var emp
	if err := c.ShouldBindJSON(&carDepot); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check carDepot is haved ?
	if tx := entity.DB().Where("id = ?", carDepot.ID).First(&carDepotold); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("CarDepot id = %d not found", carDepot.ID)})
		c.Abort()
		return
	}

	if carDepot.EmpCode == "" {
		carDepot.EmpCode = carDepotold.EmpCode
	}

	if carDepot.PNum == 0 {
		carDepot.PNum = carDepot.PNum
	}

	if carDepot.Date.String() == "0001-01-01 00:00:00 +0000 UTC" {
		carDepot.Date = carDepot.Date
	}

	// if have new employee_id
	if ambulance.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", ambulance.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		ambulance.Employee = employee
	} else {
		if tx := entity.DB().Where("id = ?", ambulance.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		ambulance.Employee = employee
	}

	// if have new ambulance_id
	if carDepot.AmbulanceID != nil {
		if tx := entity.DB().Where("id = ?", carDepot.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found ambulance"})
			return
		}
		fmt.Print("NOT NULL")
		carDepot.Ambulance = ambulance
	} else {
		if tx := entity.DB().Where("id = ?", carDepot.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found ambulance"})
			return
		}
		fmt.Print("NULL")
		carDepot.Ambulance = ambulance
	}

	// if have new Park
	if carDepot.ParkID != nil {
		if tx := entity.DB().Where("id = ?", carDepot.ParkID).First(&park); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found park"})
			return
		}
		carDepot.Park = park
	} else {
		if tx := entity.DB().Where("id = ?", carDepot.ParkID).First(&park); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found park"})
			return
		}
		carDepot.Park = park
	}

	// Update carDepot in database
	if err := entity.DB().Save(&carDepot).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   carDepot,
	})

}

// GET /Parks
func ListParks(c *gin.Context) {

	var parks []entity.Park

	if err := entity.DB().Raw("SELECT * FROM parks").Scan(&parks).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": parks})
}
