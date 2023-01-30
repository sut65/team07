package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

// add Entity
type RecordTimeIn struct {
	gorm.Model

	TimeIn	time.Time	`valid:"Past~Date must not be in the past"`
	Odo		int			//`valid:"required~The value must be in the range 1-99999, range(1|99999)~The value must be in the range 1-99999"`
	Note	string		//`valid:"required~Note cannot be blank"`

	EmployeeID *uint
	Employee Employee			`gorm:"references:id" valid:"-"`

	AmbulanceID *uint
	Ambulance Ambulance			`gorm:"references:id" valid:"-"`

	RecordTimeOUTID *uint
	RecordTimeOUT RecordTimeOUT  `gorm:"references:id" valid:"-"`
}

//ฟังก์ชันที่จะใช่ในการ validation EntryTime
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