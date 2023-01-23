package entity

import (
	"time"

	"gorm.io/gorm"
)

type VehicleInspection struct {
	gorm.Model

	Fail                      string
	OdoMeter                  uint
	VehicleInspectionDatetime time.Time

	EmployeeID *uint
	Employee   Employee

	AmbulanceID *uint
	Ambulance   Ambulance

	StatusCheckID *uint
	StatusCheck   StatusCheck

	AmbulancePartID *uint
	AmbulancePart   AmbulancePart
}

type AmbulancePart struct {
	gorm.Model

	PartName string

	VehicleInspection []VehicleInspection `gorm:"foreignKey:AmbulancePartID"`
}

type StatusCheck struct {
	gorm.Model

	StatusName string

	VehicleInspection []VehicleInspection `gorm:"foreignKey:StatusCheckID"`
}
