package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
)

// POST /users
func CreateVehicleInspection(c *gin.Context) {
	var vehicleinspection entity.VehicleInspection
	var ambulance entity.Ambulance
	var employee entity.Employee
	var statuscheck entity.StatusCheck
	var ambulancepart entity.AmbulancePart

	if err := c.ShouldBindJSON(&vehicleinspection); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", vehicleinspection.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ambulance not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", vehicleinspection.StatusCheckID).First(&statuscheck); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statuscheck not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", vehicleinspection.AmbulancePartID).First(&ambulancepart); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ambulancepart not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", vehicleinspection.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	veh := entity.VehicleInspection{
		OdoMeter:                  vehicleinspection.OdoMeter, //กรอกเลขไมล์
		Fail:                      vehicleinspection.Fail,
		StatusCheck:               statuscheck,
		AmbulancePart:             ambulancepart,                                       //โยง คสพ Entity Case
		Ambulance:                 ambulance,                                           //โยง คสพ Entity Car
		Employee:                  employee,                                            //โยง คสพ Entity Employee
		VehicleInspectionDatetime: vehicleinspection.VehicleInspectionDatetime.Local(), // field DateTime
	}
	if _, err := govalidator.ValidateStruct(veh); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//บันทึก
	if err := entity.DB().Create(&veh).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": veh})
}

// GET /user/:id
func GetVehicleInspection(c *gin.Context) {
	var vehicleinspection entity.VehicleInspection
	id := c.Param("id")
	if err := entity.DB().Preload("Ambulance").Preload("StatusCheck").Preload("Employee").Preload("Employee.User.Role").Preload("Employee.User").Preload("AmbulancePart").Preload("Ambulance.TypeAbl").Raw("SELECT * FROM vehicle_inspections WHERE id = ?", id).Find(&vehicleinspection).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": vehicleinspection})

}

// GET /users
func ListVehicleInspections(c *gin.Context) {
	var vehicleinspection []entity.VehicleInspection

	if err := entity.DB().Preload("Ambulance").Preload("StatusCheck").Preload("Employee").Preload("Employee.User.Role").Preload("Employee.User").Preload("AmbulancePart").Preload("Ambulance.TypeAbl").Raw("SELECT * FROM vehicle_inspections").Find(&vehicleinspection).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": vehicleinspection})
}

// DELETE /users/:id

func DeleteVehicleInspection(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM vehicle_inspections WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "vehicleinspection not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users

func UpdateVehicleInspection(c *gin.Context) {
	var payload entity.VehicleInspection //รับค่าที่ส่งมาจาก client
	var vehicleinspection entity.VehicleInspection
	var ambulance entity.Ambulance
	var employee entity.Employee
	var statuscheck entity.StatusCheck
	var ambulancepart entity.AmbulancePart

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.ID).Find(&vehicleinspection); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "vehicleinspection_id  not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", payload.AmbulanceID).Find(&ambulance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ambulance_id  not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", payload.AmbulancePartID).Find(&ambulancepart); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ambulancepart_id not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", payload.EmployeeID).Find(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee_id not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", payload.StatusCheckID).Find(&statuscheck); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statuscheck_id not found"})
		return
	}

	UpdatingVehicleInspection := entity.VehicleInspection{
		OdoMeter:                  payload.OdoMeter, //กรอกเลขไมล์
		Fail:                      payload.Fail,
		StatusCheck:               statuscheck,
		AmbulancePart:             ambulancepart,                     //โยง คสพ Entity Case
		Ambulance:                 ambulance,                         //โยง คสพ Entity Car
		Employee:                  employee,                          //โยง คสพ Entity Employee
		VehicleInspectionDatetime: payload.VehicleInspectionDatetime, // field DateTime
	}

	if _, err := govalidator.ValidateStruct(UpdatingVehicleInspection); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", vehicleinspection.ID).Updates(&UpdatingVehicleInspection).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Updating success!!",
		"data":   UpdatingVehicleInspection,
	})
}

// GET /user/:id
func GetStatusCheck(c *gin.Context) {
	var statuscheck entity.StatusCheck
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM status_checks WHERE id = ?", id).Find(&statuscheck).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statuscheck})

}

// GET /users
func ListStatusChecks(c *gin.Context) {
	var statuschecks []entity.StatusCheck

	if err := entity.DB().Raw("SELECT * FROM status_checks").Find(&statuschecks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statuschecks})
}

func GetAmbulancePart(c *gin.Context) {
	var ambulancepart entity.AmbulancePart
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM ambulance_parts WHERE id = ?", id).Find(&ambulancepart).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ambulancepart})

}

func ListAmbulanceParts(c *gin.Context) {
	var ambulanceparts []entity.AmbulancePart

	if err := entity.DB().Raw("SELECT * FROM ambulance_parts").Find(&ambulanceparts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ambulanceparts})
}

// GET /ambulance/:id
func GetAmbulanceByTypeAbl(c *gin.Context) {
	var ambulance []entity.Ambulance
	id := c.Param("type_id")
	if err := entity.DB().Raw("SELECT * FROM ambulances WHERE type_abl_id = ?  ", id).Find(&ambulance).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ambulance})
}
