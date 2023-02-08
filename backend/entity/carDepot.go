package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Park struct {
	gorm.Model
	Name     string
	Capacity int

	//For Link Foreign key
	CarDepots []CarDepot `gorm:"foreignKey:ParkID"`
}

type CarDepot struct {
	gorm.Model
	EmpCode string    `valid:"length(4|6)~Employee code is not in length 4-6 charecter,required~ Employee code can not blank"` //รหัสพนักงาน//
	PNum    int       `valid:"range(1|200)~Park number is not in range 1 to 200,required~ Park number can not blank"`                           //เลขช่องรถ
	Date    time.Time `valid:"Past~Date must not be in the past"`

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

// ฟังก์ชันที่จะใช่ในการ validation EntryTime
func init() {
	govalidator.CustomTypeTagMap.Set("Past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(time.Minute*-2)) || t.Equal(time.Now())
		//return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("Future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now()
		return now.Before(time.Time(t))
	})
}
