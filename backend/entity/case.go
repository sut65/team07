package entity

import (
	"time"

	"gorm.io/gorm"
)

type Emergency struct {
	gorm.Model
	Name string

	//For Link Foreign key
	Case []Case `gorm:"foreignKey:EmergencyID"`
}

type Gender struct {
	gorm.Model
	Name string

	//For Link Foreign key
	Case []Case `gorm:"foreignKey:GenderID"`
}

type Case struct {
	gorm.Model
	Location string
	Patient  string
	Age      int
	Status   string
	Datetime time.Time

	// Save Emergency area ID in FK
	EmergencyID *uint
	// to eaiser for add FK
	Emergency Emergency

	// Save Gender area ID in FK
	GenderID *uint
	// to eaiser for add FK
	Gender Gender

	RecordTimeOUT []RecordTimeOUT `gorm:"foreignKey:CaseID"`
}
