package entity

import (
	"time"

	"gorm.io/gorm"
)

// add Entity
type RecordTimeIn struct {
	gorm.Model

	TimeIn	time.Time
	Odo		int
	Note	string

	EmployeeID *uint
	Employee Employee

	AmbulanceID *uint
	Ambulance Ambulance

	RecordTimeOUTID *uint
	RecordTimeOUT RecordTimeOUT
}