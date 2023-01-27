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

		//ระบบจัดซื้อรถพยาบาล
		&Company{},
		&TypeAbl{},
		&Ambulance{},

		//ระบบเเจ้งเหตุ
		&Emergency{},
		&Gender{},
		&Case{},

		//ระบบบันทึกเวลาใช้รถขาออกของ พนง ขับรถ
		&RecordTimeOUT{},

		//ระบบที่จอดรถพยาบาล
		&Park{},
		&CarDepot{},

		//ระบบตรวจเช็คสภาพรถ
		&AmbulancePart{},
		&StatusCheck{},
		&VehicleInspection{},

		//ระบบฆ่าเชื้อรถพยาบาล
		&Disinfactant{},
		&Disinfection{},

		//ระบบเบิกยาเข้าสู่รถพยาบาล
		&AmbulanceStore{},
		&Medicine{},

		//ระบบใช้ยาบนรถพยาบาล
		&AmbulanceUse{},

		//ระบบบันทึกเวลาใช้รถขาเข้าของ พนง ขับรถ
		&RecordTimeIn{},
	)

	db = database

	// ทำการเพิ่ม Dummy Role
	admin := Role{
		Name: "admin",
	}
	carManager := Role{
		Name: "Car Manager",
	}
	nurse := Role{
		Name: "Nurse",
	}
	driver := Role{
		Name: "Diver",
	}
	disinfection := Role{
		Name: "Disinfection Staff",
	}
	notificationStaff := Role{
		Name: "Notification Staff",
	}

	db.Model(&Role{}).Create(&admin)
	db.Model(&Role{}).Create(&carManager)
	db.Model(&Role{}).Create(&nurse)
	db.Model(&Role{}).Create(&driver)
	db.Model(&Role{}).Create(&disinfection)
	db.Model(&Role{}).Create(&notificationStaff)

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

	userManager := User{
		Name:     "Manager",
		Password: string(pw),
		Role:     carManager,
	}
	db.Model(&User{}).Create(&userManager)

	userNerse := User{
		Name:     "Nurse",
		Password: string(pw),
		Role:     nurse,
	}
	db.Model(&User{}).Create(&userNerse)

	userDriver := User{
		Name:     "Driver",
		Password: string(pw),
		Role:     driver,
	}
	db.Model(&User{}).Create(&userDriver)

	userDis := User{
		Name:     "Disinfection Staff",
		Password: string(pw),
		Role:     disinfection,
	}
	db.Model(&User{}).Create(&userDis)

	userOther := User{
		Name:     "OtherStaff",
		Password: string(pw),
		Role:     notificationStaff,
	}
	db.Model(&User{}).Create(&userOther)

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

	sut := WorkingArea{
		WorkingArea: "SUT",
	}

	db.Model(&WorkingArea{}).Create(&sut)

	adminEmp := Employee{
		Name:        "Admin",
		Surname:     "Owner",
		Age:         50,
		User:        userAdmin,
		WorkingArea: sut,
		Status:      ready,
		Education:   bacDeg,
		Date:        time.Now(),
	}

	db.Model(&Employee{}).Create(&adminEmp)

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

	// ระบบเเจ้งซ่อม ----------------------------------------------------
	var carStat = []Carstat{
		{Name: "รอดำเนินการ"},
		{Name: "รออะไหล่"},
		{Name: "รอรับรถ"},
	}
	db.CreateInBatches(carStat, 3)
	// ระบบเเจ้งซ่อม ----------------------------------------------------
	// ระบบที่จอดรถพยาบาล ---------------------------------------------
	var park = []Park{
		{Name: "Srinakarin"},
		{Name: "Suranaree"},
	}
	db.CreateInBatches(park, 2)

	// ระบบที่จอดรถพยาบาล ---------------------------------------------

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

	case2 := Case{
		Location:  "ปต2",
		Gender:    gender[1],
		Emergency: emergency[1],
	}
	db.Model(&Case{}).Create((&case2))

	emp := Employee{
		Name:        "Amb",
		Surname:     "Dis",
		Age:         20,
		User:        userDis,
		Status:      working,
		Education:   bacDeg,
		WorkingArea: sut,
	}
	db.Model(&Employee{}).Create(&emp)

	ambulance1 := Ambulance{
		Clp:      "บบ 36771",
		CarBrand: "TOYOTA 1",
		TypeAbl:  typeAbl[0],
		Employee: emp,
	}
	db.Model(&Ambulance{}).Create(&ambulance1)

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

	//ฆ่าเชื้อรถพยาบาล
	disinfectant := []Disinfactant{
		{Type: "Ethyl alcohol 70%"},
		{Type: "Sodium hypochlorite"},
		{Type: "Dettol Antiseptic Disinfectant"},
	}
	db.Model(&Disinfactant{}).Create(&disinfectant)

	disinfection_1 := Disinfection{
		WorkTime:           time.Now(),
		AmountDisinfectant: 500,
		Note:               "-",
		Employee:           emp,
		Ambulance:          ambulance1,
		Disinfactant:       disinfectant[1],
	}
	db.Model(&Disinfection{}).Create(&disinfection_1)

	var medicine = []Medicine{
		{MedicineName: "Paracetamol", MedicineWarning: "ไม่ควรเกิน 500-1000 มก.", MedicineType: "ยาแก้ปวด", MeasureUnit: "เม็ด"},
		{MedicineName: "Alcohol", MedicineWarning: "ห้ามนําเข้าปาก - ตา, ห้ามล้างแผลโดยตรง", MedicineType: "น้ํายาล้างแผล", MeasureUnit: "มล."},
		{MedicineName: "Povidone-iodine (Betadine)", MedicineWarning: "ห้ามนําเข้าปาก", MedicineType: "น้ํายาล้างแผล", MeasureUnit: "มล."},
		{MedicineName: "Mepivacaine", MedicineWarning: "ต้องใช้ยาตามขนาด 5 มก. / กก.", MedicineType: "ยาชา", MeasureUnit: "มก."},
	}
	db.CreateInBatches(medicine, 4)
}
