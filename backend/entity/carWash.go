package entity

import (
	"time"

	"gorm.io/gorm"
)

type StatusAm struct {
	gorm.Model
	Status string
	//For Link Foreign key

	CarWashs []CarWash `gorm:"foreignKey:CarWashID"`
}

type CarWash struct {
	gorm.Model
	ComName    string //ช่ือบริษัท
	ComTel     string //เบอร์โทรบริษัท
	ReceiptNum string //เลขใบเสร็จ
	SerFees    int    //ค่าบริการ
	Date       time.Time

	// Save Park ID in FK..
	StatusAmID *uint
	// to eaiser for add FK
	StatusAm StatusAm

	// Save Ambulance ID in FK..
	AmbulanceID *uint
	// to eaiser for add FK
	Ambulance Ambulance

	// Save Employee ID in FK
	EmployeeID *uint
	// to eaiser for add FK
	Employee Employee
}
