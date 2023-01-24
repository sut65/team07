package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
)

// POST /users
func CreateDisinfection(c *gin.Context) {
	var disinfection entity.Disinfection
	var disinfectant entity.Disinfactant
	var ambulance entity.Ambulance
	var employee entity.Employee

	if err := c.ShouldBindJSON(&disinfection); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", disinfection.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ambulance not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", disinfection.DisinfactantID).First(&disinfectant); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "disinfectant not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", disinfection.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	dft := entity.Disinfection{
		WorkTime: 				disinfection.WorkTime,
		AmountDisinfectant:		disinfection.AmountDisinfectant,	
		Note: 					disinfection.Note,	
		Disinfactant: 			disinfectant,			//โยง คสพ Entity Case
		Ambulance:                 ambulance,                                   //โยง คสพ Entity Car
		Employee:                  employee,                                    //โยง คสพ Entity Employee	
	}

	//บันทึก
	if err := entity.DB().Create(&dft).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dft})
}

// GET /user/:id
func GetDisinfection(c *gin.Context) {
	var disinfection entity.Disinfection
	id := c.Param("id")
	if err := entity.DB().Preload("Ambulance").Preload("Disinfectant").Preload("Employee").Raw("SELECT * FROM disinfections WHERE id = ?", id).Find(&disinfection).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": disinfection})

}

// GET /users
func ListDisinfactions(c *gin.Context) {
	var disinfection []entity.Disinfection

	if err := entity.DB().Preload("Ambulance").Preload("Disinfectant").Preload("Employee").Raw("SELECT * FROM disinfections").Find(&disinfection).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": disinfection})
}

// DELETE /users/:id

func DeleteDisinfection(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM disinfections WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "disinfections not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users

func UpdateDisinfection(c *gin.Context) {

	var disinfection entity.Disinfection
	var disinfectant entity.Disinfactant
	var ambulance entity.Ambulance
	var employee entity.Employee

	if err := c.ShouldBindJSON(&disinfection); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", disinfection.ID).First(&disinfection); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "vehicleinspection not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", disinfectant.ID).First(&disinfectant); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statuscheck not found"})
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

	UpdateDisinfection := entity.Disinfection{
		WorkTime: 				disinfection.WorkTime,
		AmountDisinfectant:		disinfection.AmountDisinfectant,	
		Note: 					disinfection.Note,	
		Disinfactant: 			disinfectant,			//โยง คสพ Entity Case
		Ambulance:                 ambulance,                                   //โยง คสพ Entity Car
		Employee:                  employee,                                    //โยง คสพ Entity Employee	
	}

	if err := entity.DB().Where("id = ?", disinfection.ID).Updates(&UpdateDisinfection).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Updating success!!",
		"data":   UpdateDisinfection,
	})
}
