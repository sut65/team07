package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Emergency struct {
	gorm.Model
	Name string

	//For Link Foreign key
	Cases []Case `gorm:"foreignKey:EmergencyID"`
}

type Gender struct {
	gorm.Model
	Name string

	//For Link Foreign key
	Cases []Case `gorm:"foreignKey:GenderID"`
}

type Case struct {
	gorm.Model
	Location string 		`valid:"required~โปรดระบุบสถานที"`
	Patient  string			`valid:"required~โปรดระบุบชื่อผู้ป่วย"`
	Age      int			`valid:"range(1|100)~Age is not in range 0 to 100"`
	Status   string			`valid:"required~โปรดระบุบอาการของผู้ป่วยเท่าที่ทราบ"`
	Datetime time.Time		`valid:"CaseDateNotPast~ห้ามวันที่เป็นอดีตหรืออนาคต,CaseDateNotFuture~ห้ามวันที่เป็นอดีตหรืออนาคต"`

	// Save Emergency area ID in FK
	EmergencyID *uint
	// to eaiser for add FK
	Emergency Emergency

	// Save Gender area ID in FK
	GenderID *uint
	// to eaiser for add FK
	Gender Gender

	// Save Employee ID in FK
	EmployeeID *uint
	// to eaiser for add FK
	Employee Employee

	RecordTimeOUT []RecordTimeOUT `gorm:"foreignKey:CaseID"`
}

func init() {
    govalidator.CustomTypeTagMap.Set("CaseDateNotPast", func(i interface{}, context interface{}) bool {
        t := i.(time.Time)
		now := time.Now().Add(time.Minute * -10)
		return t.Equal(now) || t.After(now)
    })

    govalidator.CustomTypeTagMap.Set("CaseDateNotFuture", func(i interface{}, context interface{}) bool {
        t := i.(time.Time)
		now := time.Now().Add(time.Minute * 10)
        return t.Before(now) || t.Equal(now)
    })

}