package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
)

// POST /students
func CreateAmbulance(c *gin.Context) {

	var ambulance entity.Ambulance
	var company entity.Company
	var typeAbl entity.TypeAbl
	var employee entity.Employee

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร watchVideo
	if err := c.ShouldBindJSON(&ambulance); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา advisor ด้วย id
	if tx := entity.DB().Where("id = ?", ambulance.CompanyID).First(&company); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "video not found"})
		return
	}

	// 11: ค้นหา faculty ด้วย id
	if tx := entity.DB().Where("id = ?", ambulance.TypeAblID).First(&typeAbl); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resolution not found"})
		return
	}

	// 12: ค้นหา year ด้วย id
	if tx := entity.DB().Where("id = ?", ambulance.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "playlist not found"})
		return
	}

	// 14: สร้าง WatchVideo
	st := entity.Ambulance{
		Company:  company,            // โยงความสัมพันธ์กับ Entity Company
		TypeAbl:  typeAbl,            // โยงความสัมพันธ์กับ Entity TypeAbl
		Employee: employee,           // โยงความสัมพันธ์กับ Entity Employee
		Clp:      ambulance.Clp,      // ตั้งค่าฟิลด์ Clp
		CarBrand: ambulance.CarBrand, // ตั้งค่าฟิลด์ CarBrand
		Date:     ambulance.Date,     // ตั้งค่าฟิลด์ Date
	}

	// 15: บันทึก
	if err := entity.DB().Create(&st).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": st})
}

// GET /ambulance/:id
func GetAmbulance(c *gin.Context) {

	var ambulance entity.Ambulance
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM ambulances WHERE id = ?", id).Scan(&ambulance).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ambulance})
}

// GET /ambulance/:eid
func GetAmbulanceByEmployee(c *gin.Context) {

	var ambulance entity.Ambulance
	employee_id := c.Param("employee_id")

	if err := entity.DB().Preload("Company").Preload("TypeAbl").Preload("Employee").Raw("SELECT * FROM ambulances WHERE employee_id = ?", employee_id).Find(&ambulance).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ambulance, "status": "getstudentbyid success "})
}

// GET /ambulances
func ListAmbulances(c *gin.Context) {

	var ambulances []entity.Ambulance

	if err := entity.DB().Raw("SELECT * FROM ambulances").Scan(&ambulances).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ambulances})
}

// DELETE /ambulance/:id
func DeleteAmbulance(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM ambulances WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// Update Employee
func UpdateAmbulance(c *gin.Context) {

	//main
	var ambulance entity.Ambulance
	var ambulanceold entity.Ambulance

	//relation
	var company entity.Company
	var typeAbl entity.TypeAbl

	// Bind Json to var emp
	if err := c.ShouldBindJSON(&ambulance); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		c.Abort()
		return
	}

	// Check abl is haved ?
	if tx := entity.DB().Where("id = ?", ambulance.ID).First(&ambulanceold); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Ambulance id = %d not found", ambulance.ID)})
		c.Abort()
		return
	}

	if ambulance.Clp == "" {
		ambulance.Clp = ambulanceold.Clp
	}

	if ambulance.CarBrand == "" {
		ambulance.CarBrand = ambulanceold.CarBrand
	}

	if ambulance.Date.String() == "0001-01-01 00:00:00 +0000 UTC" {
		ambulance.Date = ambulanceold.Date
	}

	// if new have company_id
	if ambulance.CompanyID != nil {
		if tx := entity.DB().Where("id = ?", ambulance.CompanyID).First(&company); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found user"})
			return
		}
		fmt.Print("NOT NULL")
		ambulance.Company = company
	} else {
		if tx := entity.DB().Where("id = ?", ambulance.CompanyID).First(&company); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found user"})
			return
		}
		fmt.Print("NULL")
		ambulance.Company = company
	}

	// if new have typeAbl_id
	if ambulance.TypeAblID != nil {
		if tx := entity.DB().Where("id = ?", ambulance.TypeAblID).First(&typeAbl); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found status"})
			return
		}
		ambulance.TypeAbl = typeAbl
	} else {
		if tx := entity.DB().Where("id = ?", ambulance.TypeAblID).First(&typeAbl); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found status"})
			return
		}
		ambulance.TypeAbl = typeAbl
	}

	// Update emp in database
	if err := entity.DB().Save(&ambulance).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Update Success",
		"data":   ambulance,
	})

}



// GET /companies
func ListCompanies(c *gin.Context) {

	var companies []entity.Company

	if err := entity.DB().Raw("SELECT * FROM companies").Scan(&companies).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": companies})
}


// GET /typeAbls
func ListTypeAbls(c *gin.Context) {

	var type_abls []entity.TypeAbl

	if err := entity.DB().Raw("SELECT * FROM type_abls").Scan(&type_abls).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": type_abls})
}
