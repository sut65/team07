package entity

import (
	"time"

	"gorm.io/gorm"
)

type RecordTimeIn struct {
	gorm.Model

	TimeIn	time.Time
	Odo		int
	Note	string

	// Save Employee ID in FK
	EmployeeID *uint
	// to eaiser for add FK
	Employee Employee

	// Save Employee ID in FK
	AmbulanceID *uint
	// to eaiser for add FK
	Ambulance Ambulance

	// Save Employee ID in FK
	RecordTimeOUTID *uint
	// to eaiser for add FK
	RecordTimeOUT RecordTimeOUT
}