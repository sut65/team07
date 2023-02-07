package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type AmbulanceUse struct {
	gorm.Model
	Amount int       `valid:"AmbulanceUseAmountNoNegitive~จำนวนไม่ควรมีค่าเป็นลบ"`
	Date   time.Time `valid:"AmbulanceUseDateNotPast~วันที่ไม่ควรเป็นอดีต,AmbulanceUseDateNotFuture~วันที่ไม่ควรเป็นอนาคต"`

	// Save Company area ID in FK
	EmployeeID *uint
	// to eaiser for add FK
	Employee Employee `gorm:"references:id" valid:"-"`

	// Save Company area ID in FK
	MedicineID *uint
	// to eaiser for add FK
	Medicine Medicine

	// Save Company area ID in FK
	AmbulanceID *uint
	// to eaiser for add FK
	Ambulance Ambulance `gorm:"references:id" valid:"-"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("AmbulanceUseDateNotPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now().Add(time.Minute * -10)
		return t.Equal(now) || t.After(now)
	})

	govalidator.CustomTypeTagMap.Set("AmbulanceUseDateNotFuture", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now().Add(time.Minute * 10)
		return t.Before(now) || t.Equal(now)
	})

	govalidator.CustomTypeTagMap.Set("AmbulanceUseAmountNoNegitive", func(i interface{}, context interface{}) bool {
		amount := i.(int)
		return amount >= 0
	})

}
