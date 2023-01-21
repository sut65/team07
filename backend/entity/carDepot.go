package entity

import (
	"time"

	"gorm.io/gorm"
)

type Park struct {
	gorm.Model
	Name    string
	Surname string

	//For Link Foreign key
	CarDepots []CarDepot `gorm:"foreignKey:CompanyID"`
}

type CarDepot struct {
	gorm.Model
	EmpCode string //รหัสพนักงาน
	PNum    int    //เลขช่องรถ
	Date    time.Time

	//For Link Foreign key
	Ambulances []Ambulance `gorm:"foreignKey:CarDepotID"`
	Employees  []Employee  `gorm:"foreignKey:CarDepotID"`

	// Save Company area ID in FK
	ParkID *uint
	// to eaiser for add FK
	Park Park
}
