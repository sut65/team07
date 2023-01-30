package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Disinfactant struct{
	gorm.Model
	Type 	string

	Disinfection []Disinfection `gorm:"foreignKey:DisinfactantID"`
}

type Disinfection struct {
	gorm.Model
	WorkTime	time.Time			`valid:"Past~Date must not be in the past"`
	AmountDisinfectant		int		//`valid:"required~The value must be in the range 1-9999, range(1|9999)~The value must be in the range 1-9999"`
	Note	string 					//`valid:"required~Note cannot be blank"`

	EmployeeID *uint
	Employee Employee				`gorm:"references:id" valid:"-"`

	AmbulanceID *uint
	Ambulance Ambulance				`gorm:"references:id" valid:"-"`

	DisinfactantID *uint
	Disinfactant Disinfactant		`gorm:"references:id" valid:"-"`
}

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