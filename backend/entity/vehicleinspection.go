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
	Employee   Employee `gorm:"references:id" valid:"-"`

	AmbulanceID *uint
	Ambulance   Ambulance `gorm:"references:id" valid:"-"`

	StatusCheckID *uint
	StatusCheck   StatusCheck

	AmbulancePartID *uint
	AmbulancePart   AmbulancePart

	Oders []Carcare `gorm:"foreignKey:VehicleInspectionID"`
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
