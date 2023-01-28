package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
)

// --------------------------- Medicine -----------------------

// // List all Medicines
// // GET Medicines
// func ListMedicine(c *gin.Context) {

// 	var medicines []entity.Medicine

// 	if err := entity.DB().Raw("SELECT * FROM medicines").Find(&medicines).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{
// 			"error": err.Error(),
// 		})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{
// 		"data": medicines,
// 	})

// }

// Get some medicine
// GET /medicine/:id
func GetMedicine(c *gin.Context) {
	var medicine entity.Medicine

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM medicines WHERE id = ?", id).Find(&medicine).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": medicine,
	})

}

// CREATE medicine
// POST /medicine
func CreateMedicine(c *gin.Context) {
	// main entity
	var medicine entity.Medicine

	if err := c.ShouldBindJSON(&medicine); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	med := entity.Medicine{
		MedicineName:    medicine.MedicineName,
		MedicineWarning: medicine.MedicineWarning,
		MedicineType:    medicine.MedicineType,
		MeasureUnit:     medicine.MeasureUnit,
	}

	if err := entity.DB().Create(&med).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   med,
	})
}

// UPDATE medicine
// PATCH /medicine
func UpdateMedicine(c *gin.Context) {

	// Req Body
	var newMedicine entity.Medicine
	// Old Data
	var oldMedicine entity.Medicine

	if err := c.ShouldBindJSON(&newMedicine); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// check data is haved in database ?
	if tx := entity.DB().Where("id = ?", newMedicine.ID).First(&oldMedicine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": fmt.Sprintf(`Medicine id = %d is not in database`, newMedicine.ID),
		})
		return
	}

	// update database
	if err := entity.DB().Save(&newMedicine).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   newMedicine,
	})
}

// Delete medicine
// DELETE /medicine/:id
func DeleteMedicine(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM medicines WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "not found medicine",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": id,
	})
}

// ------------------------------- ambulance Store ----------------------

// List Store
// GET /ambulanceStores
func ListAmbulanceStore(c *gin.Context) {
	var stores []entity.AmbulanceStore
	if err := entity.DB().Preload("Employee").Preload("Medicine").Preload("Ambulance").Raw("SELECT * FROM ambulance_stores").Find(&stores).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": stores,
	})

}

// Get store by id
// GET /ambulanceStore/:id
func GetAmbulanceStore(c *gin.Context) {
	var store entity.AmbulanceStore

	id := c.Param("id")

	if err := entity.DB().Preload("Employee").Preload("Medicine").Preload("Ambulance").Raw("SELECT * FROM ambulance_stores WHERE id = ?", id).Find(&store).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": store,
	})

}

// Create medicine Store
// POST /ambulanceStore
func CreateAmbulanceStore(c *gin.Context) {

	// main entity
	var store entity.AmbulanceStore
	// realtion entity
	var medicine entity.Medicine
	var ambulance entity.Ambulance
	var employee entity.Employee

	// Binding body to AmbulanceStore type
	if err := c.ShouldBindJSON(&store); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// find data in database
	// Find medicine in database
	if tx := entity.DB().Where("id = ?", store.MedicineID).First(&medicine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "medicine is not found",
		})
		return
	}
	fmt.Println(store.AmbulanceID)
	// Find ambulance
	if tx := entity.DB().Where("id = ?", store.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ambulance is not found",
		})
		return
	}

	// Find employee
	if tx := entity.DB().Where("id = ?", store.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "employee is not found",
		})
		return
	}

	// set var ambulance store
	ambstore := entity.AmbulanceStore{
		Amount:    store.Amount,
		Date:      store.Date,
		Medicine:  medicine,
		Ambulance: ambulance,
		Employee:  employee,
	}

	// Create Amb Store in database
	if err := entity.DB().Create(&ambstore).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   ambstore,
	})

}

// Update Ambulance store
// PATCH /ambulanceStore
func UpdateAmbulanceStore(c *gin.Context) {

	// main entity
	var newStore entity.AmbulanceStore

	// old entity
	var oldStore entity.AmbulanceStore

	// realtion entity
	var medicine entity.Medicine
	var ambulance entity.Ambulance
	var employee entity.Employee

	// Binding body to AmbulanceStore type
	if err := c.ShouldBindJSON(&newStore); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Find Old Ambulance Store
	if tx := entity.DB().Raw("SELECT * FROM ambulance_stores WHERE id = ?", newStore.ID).First(&oldStore); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "not found ambulance store",
		})
		return
	}

	// Find medicine in database
	if tx := entity.DB().Where("id = ?", newStore.MedicineID).First(&medicine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "not found medicine",
		})
		return
	}

	// Find ambulance in database
	if tx := entity.DB().Where("id = ?", newStore.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "not found ambulance",
		})
		return
	}

	// Find employee in database
	if tx := entity.DB().Where("id = ?", newStore.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "not found employee",
		})
		return
	}

	// Add a relation from finded
	newStore.Ambulance = ambulance
	newStore.Employee = employee
	newStore.Medicine = medicine

	// Will Validator in this Part

	// Will Validator in this Part

	// Update employee
	if err := entity.DB().Save(&newStore).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   employee,
	})

}

// DELETE Ambulance System
// DELETE /ambulanceStore/:id
func DeleteAmbulanceStore(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM ambulance_stores WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ambulance stores is not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}
