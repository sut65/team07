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
	r.GET("/users", controller.ListUser)

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

	// ----------------- Education ------------------------
	// List
	r.GET("/educations", controller.ListEducation)
	// Get by id
	r.GET("/education/:id", controller.GetEducation)
	// ----------------- Education ------------------------

	// ------------------- Status -------------------------
	// List Status
	r.GET("/statuses", controller.ListStatus)
	// Get by id
	r.GET("/status/:id", controller.GetStatus)

	// ------------------- Status -------------------------

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
	r.GET("/abl/:type_id", controller.GetAmbulanceByTypeAblID)
	r.GET("/cases", controller.GetCase)
	// // ---------------------------------- ระบบบันทึกการใช้รถขาเข้าของพนักงาน -------------------------------
	// r.GET("/recordtimeins", controller.ListRecordTimeIns)
	// // Get by eid
	// r.GET("/recordtimein/:employee_id", controller.GetRecordTimeInByEmployee)
	// // Create
	// r.POST("/recordtimein", controller.CreateRecordTimeIn)
	// // DELETE
	// r.DELETE("/recordtimein/:id", controller.DeleteRecordTimeIn)
	// // UPDATE
	// r.PATCH("/recordtimein", controller.UpdateRecordTimeIn)
	// // ---------------------------------- ระบบบันทึกการใช้รถขาเข้าของพนักงาน -------------------------------

	r.GET("/vehicleinspections", controller.ListVehicleInspections)
	r.GET("/vehicleinspection/:id", controller.GetVehicleInspection)
	r.POST("/vehicleinspection", controller.CreateVehicleInspection)
	r.DELETE("/vehicleinspection/:id", controller.DeleteVehicleInspection)
	r.PATCH("/vehicleinspection", controller.UpdateVehicleInspection)

	r.GET("/statuschecks", controller.ListStatusChecks)
	r.GET("/statuscheck/:id", controller.GetStatusCheck)
	r.GET("/ambulanceparts", controller.ListAmbulanceParts)
	r.GET("/ambulancepart/:id", controller.GetAmbulancePart)

	r.GET("/disinfections", controller.ListDisinfactions)
	r.GET("/disinfection/:id", controller.GetDisinfection)
	r.POST("/disinfection", controller.CreateDisinfection)
	r.DELETE("/disinfection/:id", controller.DeleteDisinfection)
	r.PATCH("/disinfection", controller.UpdateDisinfection)
	r.GET("/disinfactants", controller.ListDisinfectants)

	// ---------------------------------- ระบบบันทึกเหตุฉุกเฉิน -------------------------------
	r.GET("/Emercases", controller.CreateEmercase)
	r.GET("/Emercase/:id", controller.GetEmercase)
	r.POST("/Emercase", controller.CreateEmercase)
	r.DELETE("/Emercase/:id", controller.DeleteEmercase)
	r.PATCH("/Emercase", controller.UpdateEmercase)
	// ---------------------------------- ระบบบันทึกเหตุฉุกเฉิน -------------------------------

	r.POST("/signin", controller.Signin)

	// ---------------------------------- ระบบใช้ยารถพยาบาล -------------------------------

	// List ambulanceUses
	r.GET("/ambulanceUses", controller.ListAmbulanceUse)
	// Get by id
	r.GET("/ambulanceUse/:id", controller.GetAmbulanceUse)
	// Get by eid
	r.GET("/ambulanceUses/:eid", controller.GetAmbulanceUseByEmployee)
	// Create
	r.POST("/ambulanceUse", controller.CreateAmbulanceUse)
	// DELETE
	r.DELETE("/ambulanceUse/:id", controller.DeleteAmbulanceUse)
	// UPDATE
	r.PATCH("/ambulanceUse", controller.UpdateAmbulanceUse)

	// List medicine
	r.GET("/medicines", controller.ListMedicines)

	// ---------------------------------- ระบบใชยาบนรถพยาบาล -------------------------------

	// --------------------------------- ระบบที่จอดรถพยาบาล -----------------------------
	// List carDepots
	r.GET("/carDepots", controller.ListCarDepots)
	// Get by id
	r.GET("/carDepots/:id", controller.GetCarDepot)
	// Get by empid
	r.GET("/carDepot/:empid", controller.GetCarDepotByEmployee)
	// Create
	r.POST("/carDepot", controller.CreateCarDepot)
	// DELETE
	r.DELETE("/carDepot/:id", controller.DeleteCarDepot)
	// UPDATE
	r.PATCH("/carDepot", controller.UpdateCardepot)

	// List park
	r.GET("/parks", controller.ListParks)

	// --------------------------------- ระบบที่จอดรถพยาบาล -----------------------------

	// --------------------------------- ระบบเบิกยาเข้าสู่รถพยาบาล -----------------------------
	// --------------------------------- Medicine Controller ------------------------------
	// List Medicine in line 176

	// Get Medicine by id
	r.GET("/medicine/:id", controller.GetMedicine)
	// Create Medicine
	r.POST("/medicine", controller.CreateMedicine)
	// Update Medicine
	r.PATCH("/medicine", controller.UpdateMedicine)
	// Delete Medicine
	r.DELETE("/medicine/:id", controller.DeleteMedicine)

	// --------------------------------- Ambulance Store Controller ------------------------------
	// List ambulance Store
	r.GET("/ambulanceStores", controller.ListAmbulanceStore)
	// Get Ambulance Store
	r.GET("/ambulanceStore/:id", controller.GetAmbulanceStore)
	// Create Ambulance Store
	r.POST("/ambulanceStore", controller.CreateAmbulanceStore)
	// Update Ambulance Store
	r.PATCH("/ambulanceStore", controller.UpdateAmbulanceStore)

	// --------------------------------- ระบบบันทึกข้อมูลพนักงาน -----------------------------
	//Run server using gin gonic
	r.Run()
}
