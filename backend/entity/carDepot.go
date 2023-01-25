package entity

import (
	"time"

	"gorm.io/gorm"
)

type Park struct {
	gorm.Model
	Name    string
	Surname string

	//For Link Foreign key
	CarDepots []CarDepot `gorm:"foreignKey:CompanyID"`
}

type CarDepot struct {
	gorm.Model
	EmpCode string //รหัสพนักงาน
	PNum    int    //เลขช่องรถ
	Date    time.Time

	// Save Park ID in FK..
	ParkID *uint
	// to eaiser for add FK
	Park Park

	// Save Ambulance ID in FK..
	AmbulanceID *uint
	// to eaiser for add FK
	Ambulance Ambulance

	// Save Employee ID in FK
	EmployeeID *uint
	// to eaiser for add FK
	Employee Employee
}
