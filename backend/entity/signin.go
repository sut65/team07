package entity

// in structure will be have UserId Username Password Role
import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string `gorm:"uniqueIndex"`
	Password string

	//to collect RoleID from -------- 1
	RoleID *uint
	//easier to reference for edit or add from User table
	Role Role

	Employee []Employee `gorm:"foreignKey:UserID"`
}

type Role struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`

	//link foreign Key to User table -------- 1
	Users []User `gorm:"foreignKey:RoleID"`
}
