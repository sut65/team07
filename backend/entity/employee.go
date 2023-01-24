package entity

import (
	"time"

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
	Name    string
	Surname string
	Age     int
	Date    time.Time

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
	Ambulances    []Ambulance     `gorm:"foreignKey:EmployeeID"`
	RecordTimeOUT []RecordTimeOUT `gorm:"foreignKey:EmployeeID"`
	RecordTimeIn  []RecordTimeIn  `gorm:"foreignKey:EmployeeID"`	
	Disinfection  []Disinfection  `gorm:"foreignKey:EmployeeID"`
}
