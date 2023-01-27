package entity

import (
	"time"

	"gorm.io/gorm"
)

type VehicleInspection struct {
	gorm.Model

	Fail                      string    `valid:"required~Fail cannot be blank"`
	OdoMeter                  uint      `valid:"required~OdoMeter: non zero value required, range(1|99999)~OdoMeter: non zero value required"`
	VehicleInspectionDatetime time.Time `valid:"NotPast~Day must be in the not past"`

	EmployeeID *uint
	Employee   Employee

	AmbulanceID *uint
	Ambulance   Ambulance

	StatusCheckID *uint
	StatusCheck   StatusCheck

	AmbulancePartID *uint
	AmbulancePart   AmbulancePart

	Carcare []Carcare `gorm:"foreignKey:VehicleInspection"`
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
