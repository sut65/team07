package entity

import (
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
	)

	db = database

	// ทำการเพิ่ม Dummy Role ผู้ดูแลระบบ
	admin := Role{
		Name: "admin",
	}

	db.Model(&Role{}).Create(&admin)

	// ทำการเพิ่ม Dummy user ผู้ดูแลระบบ

	userAdmin := User{
		Name:     "Admin",
		Password: "123456",
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

}
