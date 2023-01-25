package controller

import (
	"fmt"
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
	if err := entity.DB().Preload("Ambulance").Preload("Disinfactant").Preload("Employee").Raw("SELECT * FROM disinfections WHERE id = ?", id).Find(&disinfection).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": disinfection})

}

// GET /users
func ListDisinfactions(c *gin.Context) {
	var disinfection []entity.Disinfection

	if err := entity.DB().Preload("Ambulance").Preload("Disinfactant").Preload("Employee").Raw("SELECT * FROM disinfections").Find(&disinfection).Error; err != nil {
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
	var disinfection_old entity.Disinfection

	var disinfectant entity.Disinfactant
	var ambulance entity.Ambulance
	var employee entity.Employee

	// Bind Json to var emp
	if err := c.ShouldBindJSON(&disinfection); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check abl is haved ?
	if tx := entity.DB().Where("id = ?", disinfection.ID).First(&disinfection_old); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Ambulance id = %d not found", disinfection.ID)})
		c.Abort()
		return
	}

	if disinfection.Note == "" {
		disinfection.Note = disinfection_old.Note
	}

	if disinfection.AmountDisinfectant == 0 {
		disinfection.AmountDisinfectant = disinfection_old.AmountDisinfectant
	}

	if disinfection.WorkTime.String() == "0001-01-01 00:00:00 +0000 UTC" {
		disinfection.WorkTime = disinfection_old.WorkTime
	}

	// if new have company_id
	if disinfection.AmbulanceID != nil {
		if tx := entity.DB().Where("id = ?", disinfection.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found company"})
			return
		}
		fmt.Print("NOT NULL")
		disinfection.Ambulance = ambulance
	} else {
		if tx := entity.DB().Where("id = ?", disinfection.AmbulanceID).First(&ambulance); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found company"})
			return
		}
		fmt.Print("NULL")
		disinfection.Ambulance = ambulance
	}

	// if new have disinfectant
	if disinfection.DisinfactantID != nil {
		if tx := entity.DB().Where("id = ?", disinfection.DisinfactantID).First(&disinfectant); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found company"})
			return
		}
		fmt.Print("NOT NULL")
		disinfection.Disinfactant = disinfectant
	} else {
		if tx := entity.DB().Where("id = ?", disinfection.DisinfactantID).First(&disinfectant); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found company"})
			return
		}
		fmt.Print("NULL")
		disinfection.Disinfactant = disinfectant
	}

	// if new have employee_id
	if disinfection.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", ambulance.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		disinfection.Employee = employee
	} else {
		if tx := entity.DB().Where("id = ?", disinfection.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		disinfection.Employee = employee
	}

	// Update abl in database
	if err := entity.DB().Save(&disinfection).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   disinfection,
	})


	// if err := c.ShouldBindJSON(&disinfection); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// if tx := entity.DB().Where("id = ?", disinfection.ID).First(&disinfection); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "vehicleinspection not found"})
	// 	return
	// }
	// if tx := entity.DB().Where("id = ?", disinfectant.ID).First(&disinfectant); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "statuscheck not found"})
	// 	return
	// }
	// if tx := entity.DB().Where("id = ?", ambulance.ID).First(&ambulance); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "ambulance not found"})
	// 	return
	// }
	// if tx := entity.DB().Where("id = ?", employee.ID).First(&employee); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
	// 	return
	// }

	// UpdateDisinfection := entity.Disinfection{
	// 	WorkTime: 				disinfection.WorkTime,
	// 	AmountDisinfectant:		disinfection.AmountDisinfectant,	
	// 	Note: 					disinfection.Note,	
	// 	Disinfactant: 			disinfectant,			//โยง คสพ Entity Disinfectant
	// 	Ambulance:                 ambulance,                                   //โยง คสพ Entity Car
	// 	Employee:                  employee,                                    //โยง คสพ Entity Employee	
	// }

	// if err := entity.DB().Where("id = ?", disinfection.ID).Updates(&UpdateDisinfection).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// c.JSON(http.StatusOK, gin.H{
	// 	"status": "Updating success!!",
	// 	"data":   UpdateDisinfection,
	// })
}

// GET /companies
func ListDisinfectants(c *gin.Context) {

	var disinfectants []entity.Disinfactant

	if err := entity.DB().Raw("SELECT * FROM disinfactants").Scan(&disinfectants).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": disinfectants})
}

func ListAmbulance(c *gin.Context) {

	var ambulance []entity.Ambulance

	if err := entity.DB().Raw("SELECT * FROM ambulances").Scan(&ambulance).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ambulance})
}
