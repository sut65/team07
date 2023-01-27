package entity

import (
	"time"

	"gorm.io/gorm"
)

type CarStatus struct {
	gorm.Model
	Name string

	//For Link Foreign key
	Oder []Oder `gorm:"foreignKey:CarStatusID"`
}

type Oder struct {
	gorm.Model
	SendDate  time.Time
	ResiveDte time.Time
	Bill      int
	Note      string
	SaveDate  time.Time

	// Save CarStatus area ID in FK
	CarStatusID *uint
	// to eaiser for add FK
	CarStatus CarStatus

	// Save Employee ID in FK
	EmployeeID *uint
	// to eaiser for add FK
	Employee Employee

	// Save VehicleInspection ID in FK
	VehicleInspectionID *uint
	// to eaiser for add FK
	VehicleInspection VehicleInspection

	RecordTimeOUT []RecordTimeOUT `gorm:"foreignKey:CaseID"`
}
