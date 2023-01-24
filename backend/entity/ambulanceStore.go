package entity

import (
	"time"

	"gorm.io/gorm"
)

type Medicine struct {
	gorm.Model
	MedicineName    string
	MedicineWarning string
	MedicineType    string
	MeasureUnit     string

	// Link a relation
	AmbulanceStores []AmbulanceStore `gorm:"foreignKey:MedicineID"`
	AmbulanceUses   []AmbulanceUse   `gorm:"foreignKey:MedicineID"`
}

type AmbulanceStore struct {
	gorm.Model
	Amount int
	Date   time.Time

	// For store ForeignKey
	MedicineID *uint
	// For easy to use
	Medicine Medicine

	// For store ForeignKey
	AmbulanceID *uint
	// For easy to use
	Ambulance Ambulance

	// For store ForeignKey
	EmployeeID *uint
	// For easy to use
	Employee Employee
}
