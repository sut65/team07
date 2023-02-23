package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut65/team07/controller"
	"github.com/sut65/team07/entity"
	"github.com/sut65/team07/middlewares"
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

	// --------------------------- Auth System --------------------------

	r.GET("/roles", controller.ListRole)
	r.GET("/users", controller.ListUser)
	r.GET("/valid", controller.Validation)
	r.GET("/employeeId/:id", controller.GetEmployeeByUID)

	// -------------------------- Auth System ----------------------------

	// --------------------------------- ระบบบันทึกข้อมูลพนักงาน -----------------------------

	// ----------------- Working Area ----------------------------
	// List
	r.GET("/workingareas", controller.ListWorkingArea)
	// Get by id
	r.GET("/workingarea/:id", controller.GetWorkingArea)

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

	// ----------------- Ambulance ทีคนอื่นใช้ด้วย ----------------------
	// List ambulances
	r.GET("/ambulances", controller.ListAmbulances)
	// Get by id
	r.GET("/ambulances/:id", controller.GetAmbulance)

	// Path ทุกคนใช้ร่วมกันทั้งหมด

	{
		/*
		* ระบบ Login ทุกคนต้องเข้าใช้ได้
		 */

		r.POST("/signin", controller.Signin)

	}

	// ตำแหน่ง Admin จัดการโดย เพชร
	adminApi := r.Group("/admin")
	{
		protected := adminApi.Use(middlewares.Authorizes())

		// Admin Checking
		protected.Use(middlewares.CheckAdmin())
		{

			protected.POST("/role", controller.CreateRole)
			protected.POST("/signup", controller.Signup)

			{
				/* Working Area With admin edit */
				// Create
				r.POST("/workingarea", controller.CreateWorkingArea)
				// UPDATE
				r.PATCH("/workingarea", controller.UpdateWorkingArea)
				// Delete
				r.DELETE("/workingarea/:id", controller.DeleteWorkingArea)
			}

			// Create
			protected.POST("/employee", controller.CreateEmployee)
			// UPDATE
			protected.PATCH("/employee", controller.UpdateEmployee)
			// DELETE
			protected.DELETE("/employee/:id", controller.DeleteEmployee)
			// ----------------- Employee ----------------------------
		}
	}

	// ตำแหน่ง Driver จัดการโดย พี่ปาล์ม พี่แบม เอ
	DriverApi := r.Group("/driver")
	{
		protected := DriverApi.Use(middlewares.Authorizes())

		// Admin Checking
		protected.Use(middlewares.CheckDriver())
		{
			protected.GET("/recordtimeins", controller.ListRecordTimeIns)
			protected.GET("/recordtimein/:id", controller.GetRecordTimeInByEmployee)
			protected.GET("/recordtimeins/:id", controller.GetRecordTimeIn)
			protected.POST("/recordtimein", controller.CreateRecordTimeIn)
			protected.DELETE("/recordtimein/:id", controller.DeleteRecordTimeIn)
			protected.PATCH("/recordtimein", controller.UpdateRecordTimeIn)
		}
	}

	// ตำแหน่ง คนฆ่าเชื้อ จัดการโดย พี่ปาล์ม
	DisinfectionStaffApi := r.Group("/disinfectionStaff")
	{
		protected := DisinfectionStaffApi.Use(middlewares.Authorizes())

		// Admin Checking
		protected.Use(middlewares.CheckDisinfectionStaff())
		{
			protected.GET("/disinfections", controller.ListDisinfactions)
			protected.GET("/disinfection/:id", controller.GetDisinfection)
			protected.POST("/disinfection", controller.CreateDisinfection)
			protected.DELETE("/disinfection/:id", controller.DeleteDisinfection)
			protected.PATCH("/disinfection", controller.UpdateDisinfection)
			protected.GET("/disinfactants", controller.ListDisinfectants)
		}
	}

	// ตำแหน่ง Nurse จัดการโดย เพชร นก

	NurseApi := r.Group("/nurse")
	{
		protected := NurseApi.Use(middlewares.Authorizes())
		protected.Use(middlewares.CheckNurse())
		{
			// --------------------------------- ระบบเบิกยาเข้าสู่รถพยาบาล -----------------------------
			// --------------------------------- Medicine Controller ------------------------------
			// List Medicine in line 176

			// Get Medicine by id
			protected.GET("/medicine/:id", controller.GetMedicine)
			// Create Medicine
			protected.POST("/medicine", controller.CreateMedicine)
			// Update Medicine
			protected.PATCH("/medicine", controller.UpdateMedicine)
			// Delete Medicine
			protected.DELETE("/medicine/:id", controller.DeleteMedicine)

			// --------------------------------- Ambulance Store Controller ------------------------------
			// List ambulance Store
			protected.GET("/ambulanceStores", controller.ListAmbulanceStore)
			// Get Ambulance Store
			protected.GET("/ambulanceStore/:id", controller.GetAmbulanceStore)
			// Create Ambulance Store
			protected.POST("/ambulanceStore", controller.CreateAmbulanceStore)
			// Update Ambulance Store
			protected.PATCH("/ambulanceStore", controller.UpdateAmbulanceStore)
			// Delete Ambulance Store
			protected.DELETE("/ambulanceStore/:id", controller.DeleteAmbulanceStore)

			// --------------------------------- ระบบเบิกยาเข้าสู่รถพยาบาล -----------------------------
		}
	}

	// ตำแหน่ง Notification Staff จัดการโดย พี่ต่อ

	NotiApi := r.Group("/staff")
	{
		protected := NotiApi.Use(middlewares.Authorizes())
		protected.Use(middlewares.CheckNoti())
		{

		}
	}

	// ตำแหน่ง Car manager จัดการโดย พี่แบม พี่ต่อ

	CarManagerApi := r.Group("/car-manager")
	{
		protected := CarManagerApi.Use(middlewares.Authorizes())
		protected.Use(middlewares.CheckCarBuyer())
		{

		}
	}

	// ตำแหน่ง Car Buyer จัดการโดย นก

	buyerApi := r.Group("/car-buyer")
	{
		protected := buyerApi.Use(middlewares.Authorizes())
		protected.Use(middlewares.CheckCarBuyer())
		{

		}
	}

	// --------------------------------- ระบบบันทึกข้อมูลพนักงาน -----------------------------

	// ---------------------------------- ระบบจัดซื้อรถพยาบาล -------------------------------

	// List ambulances อันที่ปิดไปอยู่ข้างบนแล้วนะ
	// r.GET("/ambulances", controller.ListAmbulances)
	// // Get by id
	// r.GET("/ambulances/:id", controller.GetAmbulance)

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

	// // ---------------------------------- ระบบบันทึกการใช้รถขาออกเข้าของพนักงาน -------------------------------
	r.GET("/recordtimeouts", controller.ListRecordTimeOuts)
	r.GET("/recordtimeout/:id", controller.GetRecordTimeOut)
	r.POST("/recordtimeout", controller.CreateRecordTimeOut)
	r.DELETE("/recordtimeout/:id", controller.DeleteRecordTimeOut)
	r.PATCH("/recordtimeout", controller.UpdateRecordTimeOut)
	r.GET("/typeabl/:type_id", controller.GetAmbulanceByTypeAblID)
	r.GET("/abl/:abl_id", controller.GetAmbulanceByAblID)
	r.GET("/cases", controller.GetCase)
	r.GET("/cases/:case_id", controller.GetCaseByID)

	r.GET("/vehicleinspections", controller.ListVehicleInspections)
	r.GET("/vehicleinspection/:id", controller.GetVehicleInspection)
	r.POST("/vehicleinspection", controller.CreateVehicleInspection)
	r.DELETE("/vehicleinspection/:id", controller.DeleteVehicleInspection)
	r.PATCH("/vehicleinspection", controller.UpdateVehicleInspection)
	r.GET("/checkabl/:type_id", controller.GetAmbulanceByTypeAbl)

	r.GET("/statuschecks", controller.ListStatusChecks)
	r.GET("/statuscheck/:id", controller.GetStatusCheck)
	r.GET("/ambulanceparts", controller.ListAmbulanceParts)
	r.GET("/ambulancepart/:id", controller.GetAmbulancePart)

	// ---------------------------------- ระบบบันทึกเหตุฉุกเฉิน -------------------------------
	r.GET("/emercases", controller.ListEmercase)
	r.GET("/emercase/:id", controller.GetEmercase)
	r.POST("/emercase", controller.CreateEmercase)
	r.DELETE("/emercase/:id", controller.DeleteEmercase)
	r.PATCH("/emercases", controller.UpdateEmercase)

	r.GET("/emergencies", controller.GetEmergency)

	r.GET("/genders", controller.GetGender)
	// ---------------------------------- ระบบบันทึกเหตุฉุกเฉิน -------------------------------

	// ---------------------------------- ระบบเเจ้งซ่อม -------------------------------
	r.GET("/carcares", controller.ListCarcare)
	r.GET("/carcare/:id", controller.GetCarcare)
	r.POST("/carcare", controller.CreateCarcare)
	r.DELETE("/carcare/:id", controller.DeleteCarcare)
	r.PATCH("/carcares", controller.UpdateCarcare)

	r.GET("/carstats", controller.Getcarstat)
	// ---------------------------------- ระบบเเจ้งซ่อม -------------------------------

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
	r.PATCH("/carDepot", controller.UpdateCarDepot)

	// List park
	r.GET("/parks", controller.ListParks)

	// --------------------------------- ระบบที่จอดรถพยาบาล -----------------------------

	// --------------------------------- ระบบล้างรถพยาบาล -----------------------------
	// List carWash
	r.GET("/carWashs", controller.ListCarWashs)
	// Get by id
	r.GET("/carWashs/:id", controller.GetCarWash)
	// Get by empid
	r.GET("/carWash/:empid", controller.GetCarWashByEmployee)
	// Create
	r.POST("/carWash", controller.CreateCarWash)
	// DELETE
	r.DELETE("/carWash/:id", controller.DeleteCarWash)
	// UPDATE
	r.PATCH("/carWash", controller.UpdateCarWash)

	// List statusAms
	r.GET("/statusAms", controller.ListStatusAms)

	// --------------------------------- ระบบล้างรถพยาบาล -----------------------------

	// --------------------------------- ระบบบันทึกข้อมูลพนักงาน -----------------------------
	//Run server using gin gonic
	r.Run()
}
