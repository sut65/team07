package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
)

// ----------------- Working Area ----------------

// List all Working Area
// GET /workingareas
func ListWorkingArea(c *gin.Context) {

	var workingAreas []entity.WorkingArea
	if err := entity.DB().Raw("SELECT * FROM working_areas").Find(&workingAreas).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": workingAreas,
	})

}

// Find by id Working Area
// GET /workingarea/:id
func GetWorkingArea(c *gin.Context) {

	var workingarea entity.WorkingArea
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM working_areas WHERE id = ?", id).Scan(&workingarea).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": workingarea,
	})
}

// CREATE Working Area
// POST /workingarea
func CreateWorkingArea(c *gin.Context) {
	//main
	var workingarea entity.WorkingArea

	if err := c.ShouldBindJSON(&workingarea); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Create Working area
	wa := entity.WorkingArea{
		WorkingArea: workingarea.WorkingArea,
	}

	// Save Working Area
	if err := entity.DB().Create(&wa).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   wa,
	})
}

// UPDATE Working Area
// PATCH /workingarea
func UpdateWorkingArea(c *gin.Context) {

	var workingarea entity.WorkingArea
	var workingareaold entity.WorkingArea

	if err := c.ShouldBindJSON(&workingarea); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// check data is haved in database
	if tx := entity.DB().Where("id = ?", workingarea.ID).First(&workingareaold); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Working area id = %d not found", workingarea.ID)})
		c.Abort()
		return
	}

	// Update data in database
	if err := entity.DB().Save(&workingarea).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   workingarea,
	})

}

// DELETE Working Area
// DELETE /workingarea/:id
func DeleteWorkingArea(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM working_areas WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workingarea not found"})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// ---------------- Employee ---------------

// List all Employee
// GET /employees
func ListEmployee(c *gin.Context) {
	var employees []entity.Employee
	if err := entity.DB().Preload("User").Preload("WorkingArea").Preload("Education").Raw("SELECT * FROM employees").Find(&employees).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": employees,
	})
}

// Get Once Employee
// GET /employee/:id
func GetEmployee(c *gin.Context) {
	var employee entity.Employee
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("WorkingArea").Preload("Education").Raw("SELECT * FROM employees WHERE id = ?", id).Find(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": employee,
	})
}

// Create Employee
// POST /employee
func CreateEmployee(c *gin.Context) {
	//main
	var employee entity.Employee
	//relation
	var user entity.User
	var workingarea entity.WorkingArea
	var status entity.Status
	var education entity.Education

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// get user from database
	if tx := entity.DB().Where("id = ?", employee.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "user is not found",
		})
		return
	}

	// get working area from database
	if tx := entity.DB().Where("id = ?", employee.WorkingAreaID).First(&workingarea); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Working area is not found Please Check or insert to database",
		})
		return
	}

	// get status from database
	if tx := entity.DB().Where("id = ?", employee.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Status is not found",
		})
		return
	}

	// get education from database
	if tx := entity.DB().Where("id = ?", employee.EducationID).First(&education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Education is not found",
		})
		return
	}

	emp := entity.Employee{
		Name:        employee.Name,
		Surname:     employee.Surname,
		Age:         employee.Age,
		Date:        employee.Date,
		User:        user,
		WorkingArea: workingarea,
		Status:      status,
		Education:   education,
	}

	if err := entity.DB().Create(&emp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "create Employee Success",
		"data":   emp,
	})
}

// Update Employee
// PATCH /employee
func UpdateEmployee(c *gin.Context) {

	//main
	var employee entity.Employee
	var employeeold entity.Employee

	//relation
	var user entity.User
	var workingarea entity.WorkingArea
	var status entity.Status
	var education entity.Education

	// Bind Json to var emp
	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check emp is haved ?
	if tx := entity.DB().Where("id = ?", employee.ID).First(&employeeold); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Employee id = %d not found", employee.ID)})
		c.Abort()
		return
	}

	if employee.Name == "" {
		employee.Name = employeeold.Name
	}

	if employee.Surname == "" {
		employee.Surname = employeeold.Surname
	}

	if employee.Age == 0 {
		employee.Age = employeeold.Age
	}

	if employee.Date.String() == "0001-01-01 00:00:00 +0000 UTC" {
		employee.Date = employeeold.Date
	}

	// if new have userid
	if employee.UserID != nil {
		if tx := entity.DB().Where("id = ?", employee.UserID).First(&user); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found user"})
			return
		}
		fmt.Print("NOT NULL")
		employee.User = user
	} else {
		if tx := entity.DB().Where("id = ?", employeeold.UserID).First(&user); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found user"})
			return
		}
		fmt.Print("NULL")
		employee.User = user
	}

	// if new have statusid
	if employee.StatusID != nil {
		if tx := entity.DB().Where("id = ?", employee.StatusID).First(&status); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found status"})
			return
		}
		employee.Status = status
	} else {
		if tx := entity.DB().Where("id = ?", employeeold.StatusID).First(&status); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found status"})
			return
		}
		employee.Status = status
	}

	//if new have working area id
	if employee.WorkingAreaID != nil {
		if tx := entity.DB().Where("id = ?", employee.WorkingAreaID).First(&workingarea); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found workingarea"})
			return
		}
		employee.WorkingArea = workingarea
	} else {
		if tx := entity.DB().Where("id = ?", employeeold.WorkingAreaID).First(&workingarea); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found workingarea"})
			return
		}
		employee.WorkingArea = workingarea
	}

	// if new have education id
	if employee.EducationID != nil {
		if tx := entity.DB().Where("id = ?", employee.EducationID).First(&education); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found status"})
			return
		}
		employee.Education = education
	} else {
		if tx := entity.DB().Where("id = ?", employeeold.EducationID).First(&education); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found status"})
			return
		}
		employee.Education = education
	}

	// Update emp in database
	if err := entity.DB().Save(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   employee,
	})

}

// Delete Employee
// DELETE /employee/:id
func DeleteEmployee(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM employees WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee is not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})

}

// --------------- Education -------------- (Maybe)
