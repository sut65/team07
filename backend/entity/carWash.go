package entity

import (
	"time"
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type StatusAm struct {
	gorm.Model
	Status string
	//For Link Foreign key

	CarWashs []CarWash `gorm:"foreignKey:StatusAmID"`
}

type CarWash struct {
	gorm.Model
	ComName    string `valid:"required~ Company Name can not blank"`//ช่ือบริษัท
	ComTel     string `valid:"required~ Company Tel can not blank"`//เบอร์โทรบริษัท
	ReceiptNum string `valid:"length(9|12)~ Receipt Number is not in length 9 charecter,required~ Receipt Number is not in length 9 charecter"`//เลขใบเสร็จ
	SerFees    int    //ค่าบริการ
	Date       time.Time `valid:"DatecarWashNotPast~ Date must not be in the past,DatecarWashNotFuture~ Date must not be in the future"`
	// Save Park ID in FK..
	StatusAmID *uint
	// to eaiser for add FK
	StatusAm StatusAm `gorm:"references:id" valid:"-"`

	// Save Ambulance ID in FK..
	AmbulanceID *uint
	// to eaiser for add FK
	Ambulance Ambulance `gorm:"references:id" valid:"-"`

	// Save Employee ID in FK
	EmployeeID *uint
	// to eaiser for add FK
	Employee Employee `gorm:"references:id" valid:"-"`
}

// ฟังก์ชันที่จะใช่ในการ validation EntryTime
func init() {
	govalidator.CustomTypeTagMap.Set("DatecarWashNotPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now().Add(time.Minute * -20)
		return t.After(now) || t.Equal(now)
		//return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("DatecarWashNotFuture", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now().Add(time.Minute * 20)
		return t.Before(now) || t.Equal(now)
	})
}

