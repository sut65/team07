package entity

import (
	"time"

	"gorm.io/gorm"
)


type AmbulanceUse struct {
	gorm.Model
	Amount string
	Date time.Time

	// Save Company area ID in FK
	EmployeeID *uint
	// to eaiser for add FK
	Employee Employee

	// Save Company area ID in FK
	MedicineID *uint
	// to eaiser for add FK
	Medicine Medicine

	// Save Company area ID in FK
	AmbulanceID *uint
	// to eaiser for add FK
	Ambulance Ambulance

}
