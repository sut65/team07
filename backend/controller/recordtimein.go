package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
)

// POST /recordtimein
func CreateRecordTimeIn(c *gin.Context) {
	var recordtimein entity.RecordTimeIn
	var ambulance entity.Ambulance
	var employee entity.Employee
	var recordtimeout entity.RecordTimeOUT

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 จะถูก bind เข้าตัวแปร recordtimeIN
	if err := c.ShouldBindJSON(&recordtimein); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา recordtimeout ด้วย id
	if tx := entity.DB().Where("id = ?", recordtimein.RecordTimeOUTID).First(&recordtimeout); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "recordtimeout not found"})
		return
	}

	// 9: ค้นหา ambulance ด้วย id
	if tx := entity.DB().Where("id = ?", recordtimein.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ambulance not found"})
		return
	}

	// 10: ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", recordtimein.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employees not found"})
		return
	}

	//11: สร้าง RecordTimeIn
	recordTI := entity.RecordTimeIn{
		Employee:      employee,            // โยงความสัมพันธ์กับ Entity Employee
		Ambulance:     ambulance,           // โยงความสัมพันธ์กับ Entity Ambalance
		RecordTimeOUT: recordtimeout,       // โยงความสัมพันธ์กับ Entity Recordtimeout
		Odo:           recordtimein.Odo,    // ตั้งค่าฟิลด์ odo meter
		TimeIn:        recordtimein.TimeIn, // ตั้งค่าฟิลด์ Date
		Note:          recordtimein.Note,   // ตั้งค่าฟิลด์ note
	}

	// 12: บันทึก
	if err := entity.DB().Create(&recordTI).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": recordTI})
}

// GET /recordtimein/:id
func GetRecordTimeIn(c *gin.Context) {

	var recordtimein entity.RecordTimeIn
	id := c.Param("id")

	if err := entity.DB().Preload("Ambulance").Preload("RecordTimeOUT").Preload("Employee").Raw("SELECT * FROM record_time_ins WHERE id = ?", id).Find(&recordtimein).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": recordtimein})
}

// GET /recordtimein/:eid
func GetRecordTimeInByEmployee(c *gin.Context) {

	var recordtimein entity.RecordTimeIn
	employee_id := c.Param("employee_id")

	if err := entity.DB().Preload("Ambulance").Preload("RecordTimeOUT").Preload("Employee").Raw("SELECT * FROM record_time_ins WHERE employee_id = ?", employee_id).Find(&recordtimein).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": recordtimein, "status": "getrecordtimeinbyemployee success "})
}

// GET /recordtimeins
func ListRecordTimeIns(c *gin.Context) {

	var recordtimein []entity.RecordTimeIn

	if err := entity.DB().Preload("Employee").Preload("Ambulance").Preload("RecordTimeOUT").Raw("SELECT * FROM record_time_ins").Find(&recordtimein).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": recordtimein})
}

// DELETE /recordtimein/:id
func DeleteRecordTimeIn(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM record_time_ins WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "recordtimein not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// Update RecordTimeIn
func UpdateRecordTimeIn(c *gin.Context) {

	var recordtimeIN entity.RecordTimeIn
	var recordtimeIN_old entity.RecordTimeIn

	var recordtimeout entity.RecordTimeOUT
	var ambulance entity.Ambulance
	var employee entity.Employee

	// Bind Json to var emp
	if err := c.ShouldBindJSON(&recordtimeIN); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	fmt.Println(recordtimeIN.Odo)

	// Check recordtimein is haved ?
	if tx := entity.DB().Where("id = ?", recordtimeIN.ID).First(&recordtimeIN_old); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("RecordtimeIN id = %d not found", recordtimeIN.ID)})
		c.Abort()
		return
	}

	if recordtimeIN.Note == "" {
		recordtimeIN.Note = recordtimeIN_old.Note
	}

	if recordtimeIN.Odo == 0 {
		recordtimeIN.Odo = recordtimeIN_old.Odo
	}

	if recordtimeIN.TimeIn.String() == "0001-01-01 00:00:00 +0000 UTC" {
		recordtimeIN.TimeIn = recordtimeIN_old.TimeIn
	}

	// if new have company_id
	if recordtimeIN.AmbulanceID != nil {
		if tx := entity.DB().Where("id = ?", recordtimeIN.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found company"})
			return
		}
		fmt.Print("NOT NULL")
		recordtimeIN.Ambulance = ambulance
	} else {
		if tx := entity.DB().Where("id = ?", recordtimeIN.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found company"})
			return
		}
		fmt.Print("NULL")
		recordtimeIN.Ambulance = ambulance
	}

	// if new have disinfectant
	if recordtimeIN.RecordTimeOUTID != nil {
		if tx := entity.DB().Where("id = ?", recordtimeIN.RecordTimeOUTID).First(&recordtimeout); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found company"})
			return
		}
		fmt.Print("NOT NULL")
		recordtimeIN.RecordTimeOUT = recordtimeout
	} else {
		if tx := entity.DB().Where("id = ?", recordtimeIN.RecordTimeOUTID).First(&recordtimeout); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found company"})
			return
		}
		fmt.Print("NULL")
		recordtimeIN.RecordTimeOUT = recordtimeout
	}

	// if new have employee_id
	if recordtimeIN.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", ambulance.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		recordtimeIN.Employee = employee
	} else {
		if tx := entity.DB().Where("id = ?", recordtimeIN.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		recordtimeIN.Employee = employee
	}

	// Update abl in database
	if err := entity.DB().Save(&recordtimeIN).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   recordtimeIN,
	})
}
