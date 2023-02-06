package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Medicine struct {
	gorm.Model
	MedicineName    string
	MedicineWarning string
	MedicineType    string
	MeasureUnit     string

	// Link a relation
	AmbulanceStores []AmbulanceStore `gorm:"foreignKey:MedicineID"`
	AmbulanceUses   []AmbulanceUse   `gorm:"foreignKey:MedicineID"`
}

type AmbulanceStore struct {
	gorm.Model
	Amount int `valid:"AmbulanceStoreAmountNoNegitive~Amount is not less equal than 0"`
	Date   time.Time

	// For store ForeignKey
	MedicineID *uint
	// For easy to use
	Medicine Medicine `gorm:"references:id" valid:"-"`

	// For store ForeignKey
	AmbulanceID *uint
	// For easy to use
	Ambulance Ambulance `gorm:"references:id" valid:"-"`

	// For store ForeignKey
	EmployeeID *uint
	// For easy to use
	Employee Employee `gorm:"references:id" valid:"-"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("AmbulanceStoreAmountNoNegitive", func(i interface{}, context interface{}) bool {
		amount := i.(int)
		return amount >= 0
	})
}
