package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type RecordTimeOUT struct {
	gorm.Model

	Annotation            string    `valid:"required~Annotation cannot be blank"`
	OdoMeter              uint      `valid:"required~OdoMeter: non zero value required, range(1|99999)~OdoMeter: non zero value required"`
	RecordTimeOutDatetime time.Time `valid:"NotPast~Day must be in the not past"`
	//`valid:"notpast~RecordTimeOutDatetime must be in the not past`

	EmployeeID *uint
	Employee   Employee

	AmbulanceID *uint
	Ambulance   Ambulance

	CaseID *uint
	Case   Case

	RecordTimeIn []RecordTimeIn `gorm:"foreignKey:RecordTimeOUTID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("NotPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(time.Minute*-2)) || t.Equal(time.Now())
	})

	// govalidator.CustomTypeTagMap.Set("positiveTotal", func(i interface{}, context interface{}) bool {
	// 	total := i.(uint)
	// 	if total <= 0 {
	// 		return false
	// 	} else {
	// 		return true
	// 	}
	// })
}
