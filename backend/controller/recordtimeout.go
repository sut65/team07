package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
)

// POST /users
func CreateRecordTimeOut(c *gin.Context) {
	var recordtimeout entity.RecordTimeOUT
	var ambulances entity.Ambulance
	var cases entity.Case
	var employees entity.Employee

	if err := c.ShouldBindJSON(&recordtimeout); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", recordtimeout.AmbulanceID).First(&ambulances); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ambulance not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", recordtimeout.CaseID).First(&cases); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "case not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", recordtimeout.EmployeeID).First(&employees); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	rec := entity.RecordTimeOUT{
		// RecordTimeOutID: recordtimeout.RecordTimeOutID,
		OdoMeter:              recordtimeout.OdoMeter, //กรอกเลขไมล์
		Annotation:            recordtimeout.Annotation,
		Case:                  cases,                               //โยง คสพ Entity Case
		Ambulance:             ambulances,                          //โยง คสพ Entity Car
		Employee:              employees,                           //โยง คสพ Entity Employee
		RecordTimeOutDatetime: recordtimeout.RecordTimeOutDatetime, // field DateTime
	}

	//บันทึก
	if err := entity.DB().Create(&rec).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rec})
}

// GET /user/:id
func GetRecordTimeOut(c *gin.Context) {
	var recordtimeout entity.RecordTimeOUT
	id := c.Param("id")
	if err := entity.DB().Preload("Ambulance").Preload("Case").Preload("Employee").Raw("SELECT * FROM record_time_outs WHERE id = ?", id).Find(&recordtimeout).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": recordtimeout})

}

// GET /users
func ListRecordTimeOuts(c *gin.Context) {
	var recordtimeouts []entity.RecordTimeOUT
	if err := entity.DB().Preload("Ambulance").Preload("Case").Preload("Employee").Raw("SELECT * FROM record_time_outs").Find(&recordtimeouts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": recordtimeouts})
}

// DELETE /users/:id

func DeleteRecordTimeOut(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM record_time_outs WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "recordtimeout not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users

func UpdateRecordTimeOut(c *gin.Context) {

	var recordtimeout entity.RecordTimeOUT
	var cases entity.Case
	var ambulance entity.Ambulance
	var employee entity.Employee

	if err := c.ShouldBindJSON(&recordtimeout); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", recordtimeout.ID).First(&recordtimeout); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "recordtimeout not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", cases.ID).First(&cases); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "case not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", ambulance.ID).First(&ambulance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ambulance not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", employee.ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}
	UpdatingRecordTimeOut := entity.RecordTimeOUT{
		Annotation:            recordtimeout.Annotation,
		OdoMeter:              recordtimeout.OdoMeter,
		RecordTimeOutDatetime: recordtimeout.RecordTimeOutDatetime,
		Case:                  cases,
		Ambulance:             ambulance,
		Employee:              employee,
	}

	if err := entity.DB().Where("id = ?", recordtimeout.ID).Updates(&UpdatingRecordTimeOut).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Updating success!!",
		"data":   UpdatingRecordTimeOut,
	})
}

// GET /ambulance/:id
func GetAmbulanceByTypeAblID(c *gin.Context) {
	var ambulance []entity.Ambulance
	id := c.Param("type_id")
	if err := entity.DB().Raw("SELECT * FROM ambulances WHERE type_abl_id = ?", id).Find(&ambulance).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ambulance})
}

// GET /GetCase
func GetCase(c *gin.Context) {
	var cases []entity.Case
	if err := entity.DB().Raw("SELECT * FROM cases ORDER BY id DESC").Find(&cases).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cases})
}
