package entity

import (
	"time"

	"gorm.io/gorm"
)

type RecordTimeOUT struct {
	gorm.Model

	Annotation            string
	OdoMeter              uint
	RecordTimeOutDatetime time.Time

	EmployeeID *uint
	Employee   Employee

	AmbulanceID *uint
	Ambulance   Ambulance

	CaseID *uint
	Case   Case

	RecordTimeIn []RecordTimeIn `gorm:"foreignKey:RecordTimeOUTID"`
}
