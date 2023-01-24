package entity

import (
	"time"

	"gorm.io/gorm"
)

type Disinfactant struct{
	gorm.Model
	Type 	string

	Disinfection []Disinfection `gorm:"foreignKey:DisinfactantID"`
}

type Disinfection struct {
	gorm.Model
	WorkTime	time.Time
	AmountDisinfectant		int
	Note	string

	EmployeeID *uint
	Employee Employee

	AmbulanceID *uint
	Ambulance Ambulance

	DisinfactantID *uint
	Disinfactant Disinfactant
}