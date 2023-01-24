package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("Ambulance.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema

	database.AutoMigrate(
		// signin & signup
		&User{},
		&Role{},

		&Education{},
		&Employee{},
		&WorkingArea{},
		&Status{},

		// ระบบจัดซื้อรถพยาบาล
		&Company{},
		&TypeAbl{},
		&Ambulance{},

		//ระบบเเจ้งเหตุ
		&Emergency{},
		&Gender{},
		&Case{},

		//บันทึกเวลาใช้รถขาออกของ พนง ขับรถ
		&RecordTimeOUT{},

		//ตรวจเช็คสภาพรถ
		&AmbulancePart{},
		&StatusCheck{},
		&VehicleInspection{},

		//ฆ่าเชื้อรถพยาบาล
		&Disinfactant{},
		&Disinfection{},
	)

	db = database

	// ทำการเพิ่ม Dummy Role ผู้ดูแลระบบ
	admin := Role{
		Name: "admin",
	}

	db.Model(&Role{}).Create(&admin)

	// ทำการเพิ่ม Dummy user ผู้ดูแลระบบ
	pw, err := bcrypt.GenerateFromPassword([]byte("123456"), bcrypt.DefaultCost)
	if err != nil {
		return
	}
	userAdmin := User{
		Name:     "Admin",
		Password: string(pw),
		Role:     admin,
	}
	db.Model(&User{}).Create(&userAdmin)

	voc := Education{
		Path:  "สายอาชีพ",
		Level: "ปวช",
	}

	dip := Education{
		Path:  "สายอาชีพ",
		Level: "ปวส",
	}

	bacDeg := Education{
		Path:  "ปริญญา",
		Level: "ปริญญาตรี",
	}

	db.Model(&Education{}).Create(&voc)
	db.Model(&Education{}).Create(&dip)
	db.Model(&Education{}).Create(&bacDeg)

	ready := Status{
		Status: "Ready",
	}
	working := Status{
		Status: "Working",
	}
	rest := Status{
		Status: "Rest",
	}
	offline := Status{
		Status: "Offline",
	}
	db.Model(&Status{}).Create(&ready)
	db.Model(&Status{}).Create(&working)
	db.Model(&Status{}).Create(&rest)
	db.Model(&Status{}).Create(&offline)

	// ระบบจัดซื้อรถพยาบาล ---------------------------------------------
	var company = []Company{
		{Name: "A_Company"},
		{Name: "B_Company"},
		{Name: "C_Company"},
	}
	db.CreateInBatches(company, 3)

	var typeAbl = []TypeAbl{
		{Name: "Isolation Ambulance"},
		{Name: "First Responder Ambulance"},
		{Name: "Advanced Life Support Ambulance"},
		{Name: "Basic Life Support Ambulance"},
		{Name: "Bariatric Ambulance"},
	}
	db.CreateInBatches(typeAbl, 5)
	// ระบบจัดซื้อรถพยาบาล ---------------------------------------------

	// ระบบเเจ้งเหตุ ----------------------------------------------------
	var emergency = []Emergency{
		{Name: "อุบัติหตุทั้วไป"},
		{Name: "เพลิงไหม้"},
		{Name: "สารเคมีรั่วไหล่"},
	}
	db.CreateInBatches(emergency, 3)

	var gender = []Gender{
		{Name: "ชาย"},
		{Name: "หญิง"},
	}
	db.CreateInBatches(gender, 2)
	// ระบบเเจ้งเหตุ ----------------------------------------------------

	//Dummy
	emp := Employee{
		Name: "BB",
	}
	db.Model(&Employee{}).Create((&emp))

	case1 := Case{
		Emergency: emergency[2],
	}
	case2 := Case{
		Location: "ปต2",
	}
	db.Model(&Case{}).Create((&case2))

	case3 := Case{
		Location: "ปต3",
	}
	db.Model(&Case{}).Create((&case3))

	case4 := Case{
		Location: "ปต4",
	}
	db.Model(&Case{}).Create((&case4))
	ambulance1 := Ambulance{
		Clp:      "บบ 36771",
		CarBrand: "TOYOTA 1",
		TypeAbl:  typeAbl[0],
	}
	db.Model(&Ambulance{}).Create(&ambulance1)

	ambulance2 := Ambulance{
		Clp:      "บบ 36772",
		CarBrand: "TOYOTA 2",
		TypeAbl:  typeAbl[1],
	}
	db.Model(&Ambulance{}).Create(&ambulance2)

	ambulance3 := Ambulance{
		Clp:      "บบ 36773",
		CarBrand: "TOYOTA 3",
		TypeAbl:  typeAbl[2],
	}
	db.Model(&Ambulance{}).Create(&ambulance3)

	ambulance4 := Ambulance{
		Clp:      "บบ 36774",
		CarBrand: "TOYOTA 4",
		TypeAbl:  typeAbl[3],
	}
	db.Model(&Ambulance{}).Create(&ambulance4)

	ambulance5 := Ambulance{
		Clp:      "บบ 36775",
		CarBrand: "TOYOTA 5",
		TypeAbl:  typeAbl[4],
	}
	db.Model(&Ambulance{}).Create(&ambulance5)

	recordtimeout_1 := RecordTimeOUT{
		Annotation:            "ฝนตกหนัก ถนนลื่น",
		OdoMeter:              2000,
		RecordTimeOutDatetime: time.Now(),
		Employee:              emp,
		Case:                  case1,
		Ambulance:             ambulance1,
	}
	db.Model(&RecordTimeOUT{}).Create(&recordtimeout_1)

	recordtimeout_2 := RecordTimeOUT{
		Annotation:            "ถนนลื่น",
		OdoMeter:              4568,
		RecordTimeOutDatetime: time.Now(),
		Employee:              emp,
		Case:                  case1,
		Ambulance:             ambulance4,
	}
	db.Model(&RecordTimeOUT{}).Create(&recordtimeout_2)

	//ตรวจเช็คสภาพรถ
	statuscheck := []StatusCheck{
		{StatusName: "ผ่าน"},
		{StatusName: "ไม่ผ่าน"},
	}
	db.Model(&StatusCheck{}).Create(&statuscheck)

	ambulancepart := []AmbulancePart{
		{PartName: "เช็คแบตเตอรี่"},
		{PartName: "เช็คน้ำมันเครื่อง"},
		{PartName: "เช็คยางรถยนต์"},
		{PartName: "เช็คระบบหล่อเย็น"},
		{PartName: "เช็คน้ำมันเบรกและระบบเบรก"},
		{PartName: "เช็คไฟหน้ารถ"},
		{PartName: "เช็คที่ปัดน้ำฝน"},
		{PartName: "เช็คช่วงล่างและระบบกันสะเทือน"},
		{PartName: "อื่น ๆ"},
	}
	db.Model(&AmbulancePart{}).Create(&ambulancepart)

	vehicleinspection_1 := VehicleInspection{
		Fail:                      "เบรกแตก",
		OdoMeter:                  2000,
		VehicleInspectionDatetime: time.Now(),
		Employee:                  emp,
		AmbulancePart:             ambulancepart[4],
		Ambulance:                 ambulance1,
		StatusCheck:               statuscheck[1],
	}
	db.Model(&VehicleInspection{}).Create(&vehicleinspection_1)

	vehicleinspection_2 := VehicleInspection{
		Fail:                      "ที่ปัดน้ำฝนพัง",
		OdoMeter:                  5640,
		VehicleInspectionDatetime: time.Now(),
		Employee:                  emp,
		AmbulancePart:             ambulancepart[6],
		Ambulance:                 ambulance1,
		StatusCheck:               statuscheck[1],
	}
	db.Model(&VehicleInspection{}).Create(&vehicleinspection_2)

	//ฆ่าเชื้อรถพยาบาล
	disinfectant := []Disinfactant{
		{Type: "Ethyl alcohol 70%"},
		{Type: "Sodium hypochlorite"},
		{Type: "Dettol Antiseptic Disinfectant"},
	}
	db.Model(&Disinfactant{}).Create(&disinfectant)

	disinfection_1 := Disinfection{
		WorkTime: time.Now(),
		AmountDisinfectant: 500,
		Note: "-",
		Employee: emp,
		Ambulance: ambulance1,
		Disinfactant: disinfectant[1],
	}
	db.Model(&Disinfection{}).Create(&disinfection_1)
}
