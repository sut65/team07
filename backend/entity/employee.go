package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Education struct {
	gorm.Model
	Path  string
	Level string `gorm:"uniqueIndex"`

	//For Link Foreign key
	Employees []Employee `gorm:"foreignKey:EducationID"`
}

type WorkingArea struct {
	gorm.Model
	WorkingArea string `gorm:"uniqueIndex"`
	//For Link Foreign key
	Employees []Employee `gorm:"foreignKey:WorkingAreaID"`
}

type Status struct {
	gorm.Model
	Status string `gorm:"uniqueIndex"`
	//For Link Foreign key
	Employees []Employee `gorm:"foreignKey:StatusID"`
}

type Employee struct {
	gorm.Model
	Name    string    `valid:"required~Name is not null"`
	Surname string    `valid:"required~Surname is not null"`
	Age     int       `valid:"range(10|99)~Age is not in range 10 to 99"`
	Date    time.Time `valid:"DateEmployeeNotPast~Date must not be in the past,DateEmployeeNotFuture~Date must not be in the future"`

	// Save User ID in FK
	UserID *uint `gorm:"uniqueIndex"` //Set 1-1 relational database
	// To eaiser for add FK
	User User

	// Save Working area ID in FK
	WorkingAreaID *uint
	// to eaiser for add FK
	WorkingArea WorkingArea

	// Save Working area ID in FK
	StatusID *uint
	// to eaiser for add FK
	Status Status

	// Save Education ID in FK
	EducationID *uint
	// to eaiser for add FK
	Education Education

	//For Link Foreign key
	Ambulances      []Ambulance      `gorm:"foreignKey:EmployeeID"`
	CarWashs        []CarWash        `gorm:"foreignKey:EmployeeID"`
	CarDepots       []CarDepot       `gorm:"foreignKey:EmployeeID"`
	RecordTimeOUT   []RecordTimeOUT  `gorm:"foreignKey:EmployeeID"`
	RecordTimeIn    []RecordTimeIn   `gorm:"foreignKey:EmployeeID"`
	Disinfection    []Disinfection   `gorm:"foreignKey:EmployeeID"`
	AmbulanceStores []AmbulanceStore `gorm:"foreignKey:EmployeeID"`
	AmbulanceUses   []AmbulanceUse   `gorm:"foreignKey:EmployeeID"`
	Carcares           []Carcare        `gorm:"foreignKey:EmployeeID"`
	Cases           []Case           `gorm:"foreignKey:EmployeeID"`
}

// ฟังก์ชันที่จะใช่ในการ validation EntryTime
func init() {
	govalidator.CustomTypeTagMap.Set("DateEmployeeNotPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now().Add(time.Minute * -20)
		return t.After(now) || t.Equal(now)
		//return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("DateEmployeeNotFuture", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now().Add(time.Minute * 20)
		return t.Before(now) || t.Equal(now)
	})
}
