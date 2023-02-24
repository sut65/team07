package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Carstat struct {
	gorm.Model
	Name string

	//For Link Foreign key
	Carcares []Carcare `gorm:"foreignKey:CarStatID"`
}

type Carcare struct {
	gorm.Model
	SendDate   time.Time	`valid:"SendDateNotPast~Send Date not Past"`
	ReciveDate time.Time	`valid:"ReciveDateNotPast~Recive Date not Past"`
	Bill       int			`valid:"required~ราคาต้องไม่เป็น 0,range(1|10000000)~ราคาต้องไม่ติดลบ"`
	Note       string		`valid:"required~โปรดระบุบเสนอเเนะ"`
	SaveDate   time.Time	`valid:"CarcareDateNotPast~ห้ามวันที่เป็นอดีต,CarcareDateNotFuture~ห้ามวันที่เป็นอนาคต"`

	// Save CarStat area ID in FK
	CarStatID *uint
	// to eaiser for add FK
	CarStat Carstat

	// Save Employee ID in FK
	EmployeeID *uint
	// to eaiser for add FK
	Employee Employee `gorm:"references:id" valid:"-"`


	// Save VehicleInspection ID in FK
	VehicleInspectionID *uint
	// to eaiser for add FK
	VehicleInspection VehicleInspection `gorm:"references:id" valid:"-"`

}

func init() {
	govalidator.CustomTypeTagMap.Set("CarcareDateNotPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now().Add(time.Minute * -10)
		return t.Equal(now) || t.After(now)
	})

	govalidator.CustomTypeTagMap.Set("CarcareDateNotFuture", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now().Add(time.Minute * 10)
		return t.Before(now) || t.Equal(now)
	})

	govalidator.CustomTypeTagMap.Set("SendDateNotPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now().Add(time.Minute * -10)
		return t.Equal(now) || t.After(now)
	})

	govalidator.CustomTypeTagMap.Set("ReciveDateNotPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now().Add(time.Minute * -10)
		return t.Equal(now) || t.After(now)
	})
}