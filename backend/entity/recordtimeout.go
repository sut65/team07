package entity

import (
	"time"

	"gorm.io/gorm"
)

type RecordTimeOUT struct {
	gorm.Model

	Annotation            string    `json:"annotation"`
	OdoMeter              uint      `json:"odo_meter"`
	RecordTimeOutDatetime time.Time `json:"record_time_out_datetime"`

	EmployeeID *uint
	Employee   Employee

	AmbulanceID *uint
	Ambulance   Ambulance

	CaseID *uint
	Case   Case

	RecordTimeIn []RecordTimeIn `gorm:"foreignKey:RecordTimeOUTID"`
}
