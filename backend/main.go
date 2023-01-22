package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/controller"
	"github.com/sut65/team07/entity"
)

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	//to set CORS
	r.Use(CORSMiddleware())

	//Controller

	r.POST("/role", controller.CreateRole)
	r.GET("/roles", controller.ListRole)
	r.POST("/signup", controller.Signup)

	// --------------------------------- ระบบบันทึกข้อมูลพนักงาน -----------------------------

	// ----------------- Working Area ----------------------------
	// List
	r.GET("/workingareas", controller.ListWorkingArea)
	// Get by id
	r.GET("/workingarea/:id", controller.GetWorkingArea)
	// Create
	r.POST("/workingarea", controller.CreateWorkingArea)
	// UPDATE
	r.PATCH("/workingarea", controller.UpdateWorkingArea)
	// Delete
	r.DELETE("/workingarea/:id", controller.DeleteWorkingArea)
	// ----------------- Working Area ----------------------------

	// ----------------- Employee ----------------------------
	// List
	r.GET("/employees", controller.ListEmployee)
	// Get by id
	r.GET("/employee/:id", controller.GetEmployee)
	// Create
	r.POST("/employee", controller.CreateEmployee)
	// UPDATE
	r.PATCH("/employee", controller.UpdateEmployee)
	// DELETE
	r.DELETE("/employee/:id", controller.DeleteEmployee)
	// ----------------- Employee ----------------------------

	// --------------------------------- ระบบบันทึกข้อมูลพนักงาน -----------------------------

	// ---------------------------------- ระบบจัดซื้อรถพยาบาล -------------------------------

	// List ambulances
	r.GET("/ambulances", controller.ListAmbulances)
	// Get by id
	r.GET("/ambulances/:id", controller.GetAmbulance)
	// Get by eid
	r.GET("/ambulance/:eid", controller.GetAmbulanceByEmployee)
	// Create
	r.POST("/ambulance", controller.CreateAmbulance)
	// DELETE
	r.DELETE("/ambulance/:id", controller.DeleteAmbulance)
	// UPDATE
	r.PATCH("/ambulance", controller.UpdateAmbulance)

	// List companies
	r.GET("/companies", controller.ListCompanies)
	// List type_abls
	r.GET("/type_abls", controller.ListTypeAbls)

	// ---------------------------------- ระบบจัดซื้อรถพยาบาล -------------------------------

	r.GET("/recordtimeouts", controller.ListRecordTimeOuts)
	r.GET("/recordtimeout/:id", controller.GetRecordTimeOut)
	r.POST("/recordtimeout", controller.CreateRecordTimeOut)
	r.DELETE("/recordtimeout/:id", controller.DeleteRecordTimeOut)
	r.PATCH("/recordtimeout", controller.UpdateRecordTimeOut)

	r.POST("/signin", controller.Signin)

	//Run server using gin gonic
	r.Run()
}
