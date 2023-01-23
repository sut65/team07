package entity

import (
	"golang.org/x/crypto/bcrypt"
	"time"

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

		//ระบบบันทึกเวลาใช้รถขาออกของพนักงานขับรถ
		&RecordTimeOUT{},
		//ระบบบันทึกการใช้รถขาเข้าของพนักงานขับรถ
		&RecordTimeIn{},
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

	// //ระบบบันทึกการใช้รถขาเข้าของพนักงานขับรถ ----------------------------------------------------
	emp1 := Employee{
		Name: "BB",
	}
	db.Model(&Employee{}).Create(&emp1)

	case1 := Case{
		Location: "ปค4",
	}
	db.Model(&Case{}).Create(&case1)

	ambulance1 := Ambulance{
		CarBrand: "BB",
	}
	db.Model(&Ambulance{}).Create(&ambulance1)

	recordtimeout_1 := RecordTimeOUT{
		Annotation: "ฝนตกหนัก",
		OdoMeter: 2000,
		Employee: emp1,
		Case: case1,
		Ambulance: ambulance1,
	}
	db.Model(&RecordTimeOUT{}).Create(&recordtimeout_1)

	recordtimeIN_1 := RecordTimeIn{
		TimeIn: time.Now(),
		Odo: 123,
		Note: "-",
		Employee: emp1,
		RecordTimeOUT: recordtimeout_1,
		Ambulance: ambulance1,
	}
	db.Model(&RecordTimeIn{}).Create(&recordtimeIN_1)
	// //ระบบบันทึกการใช้รถขาเข้าของพนักงานขับรถ ----------------------------------------------------
}
