package entity

import (
	"time"

	"gorm.io/gorm"
)

type Company struct {
	gorm.Model
	Name string

	//For Link Foreign key
	Ambulances []Ambulance `gorm:"foreignKey:CompanyID"`
}

type TypeAbl struct {
	gorm.Model
	Name string

	//For Link Foreign key
	Ambulances []Ambulance `gorm:"foreignKey:TypeAblID"`
}

type Ambulance struct {
	gorm.Model
	Clp      string // Car License Plate
	Date     time.Time
	CarBrand string

	// Save Company area ID in FK
	CompanyID *uint
	// to eaiser for add FK
	Company Company

	// Save TypeAbl area ID in FK
	TypeAblID *uint
	// to eaiser for add FK
	TypeAbl TypeAbl

	// Save Employee ID in FK
	EmployeeID *uint
	// to eaiser for add FK
	Employee Employee

	RecordTimeOUT []RecordTimeOUT `gorm:"foreignKey:AmbulanceID"`
	RecordTimeIn []RecordTimeIn `gorm:"foreignKey:AmbulanceID"`
	Disinfection []Disinfection `gorm:"foreignKey:AmbulanceID"`
}
