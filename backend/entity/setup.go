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

}
