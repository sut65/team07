package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Company struct {
	gorm.Model
	Name string

	//For Link Foreign key
	Ambulances []Ambulance `gorm:"foreignKey:CompanyID"`
}

type TypeAbl struct {
	gorm.Model
	Name string

	//For Link Foreign key
	Ambulances []Ambulance `gorm:"foreignKey:TypeAblID"`
}

type Ambulance struct {
	gorm.Model
	Clp      string `gorm:"uniqueIndex" valid:"required~โปรดกรอกเลขทะเบียนรถ,matches(^[A-Z]{2}\\d{4}$)~โปรดกรอกเลขทะเบียนรถให้ถูกต้อง"` // Car License Plate
	Date     time.Time `valid:"AmbulanceDateNotPast~วันที่ไม่ควรเป็นอดีต,AmbulanceDateNotFuture~วันที่ไม่ควรเป็นอนาคต"`
	CarBrand string `valid:"required~โปรดกรอกยี่ห้อรถ"`

	// Save Company area ID in FK
	CompanyID *uint
	// to eaiser for add FK
	Company Company

	// Save TypeAbl area ID in FK
	TypeAblID *uint
	// to eaiser for add FK
	TypeAbl TypeAbl

	// Save Employee ID in FK
	EmployeeID *uint
	// to eaiser for add FK
	Employee Employee `gorm:"references:id" valid:"-"`

	RecordTimeOUT   []RecordTimeOUT  `gorm:"foreignKey:AmbulanceID"`
	RecordTimeIn    []RecordTimeIn   `gorm:"foreignKey:AmbulanceID"`
	Disinfection    []Disinfection   `gorm:"foreignKey:AmbulanceID"`
	AmbulanceStores []AmbulanceStore `gorm:"foreignKey:AmbulanceID"`
	AmbulanceUses   []AmbulanceUse   `gorm:"foreignKey:AmbulanceID"`
	CarDepot        []CarDepot       `gorm:"foreignKey:AmbulanceID"`
	CarWash         []CarWash        `gorm:"foreignKey:AmbulanceID"`
}

func init() {
    govalidator.CustomTypeTagMap.Set("AmbulanceDateNotPast", func(i interface{}, context interface{}) bool {
        t := i.(time.Time)
		now := time.Now().Add(time.Minute * -5)
		return t.Equal(now) || t.After(now)
    })

    govalidator.CustomTypeTagMap.Set("AmbulanceDateNotFuture", func(i interface{}, context interface{}) bool {
        t := i.(time.Time)
		now := time.Now().Add(time.Minute * 5)
        return t.Before(now) || t.Equal(now)
    })

}
