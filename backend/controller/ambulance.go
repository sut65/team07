package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/entity"
)

// POST /students
func CreateStudent(c *gin.Context) {

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
func GetStudent(c *gin.Context) {

	var ambulance entity.Ambulance
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM ambulances WHERE id = ?", id).Scan(&ambulance).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ambulance})
}

// GET /ambulance/:eid
func GetStudentByUser(c *gin.Context) {

	var ambulance entity.Ambulance
	employee_id := c.Param("employee_id")

	if err := entity.DB().Preload("Company").Preload("TypeAbl").Preload("Employee").Raw("SELECT * FROM ambulances WHERE employee_id = ?", employee_id).Find(&ambulance).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ambulance, "status": "getstudentbyid success "})
}

// GET /ambulances
func ListStudents(c *gin.Context) {

	var ambulances []entity.Ambulance

	if err := entity.DB().Raw("SELECT * FROM ambulances").Scan(&ambulances).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ambulances})
}

// DELETE /ambulance/:id
func DeleteStudent(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM ambulances WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "student not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
