package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team07/entity"
)

func TestLocationNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	emercase := entity.Case{
		Location: "", // ผิด
		Patient: "TOR",
		Age: 10, 
		Status: "ตาย",
		Datetime:   time.Now(),
	}

	ok, err := govalidator.ValidateStruct(emercase)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("โปรดระบุบสถานที"))
}

func TestPatientNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	emercase := entity.Case{
		Location: "Home", 
		Patient: "", // ผิด
		Age: 10, 
		Status: "ตาย",
		Datetime:   time.Now(),
	}

	ok, err := govalidator.ValidateStruct(emercase)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("โปรดระบุบชื่อผู้ป่วย"))
}

func TestPatientNotNumber(t *testing.T) {
	g := NewGomegaWithT(t)

	emercase := entity.Case{
		Location: "Home", 
		Patient: "As123", // ผิด
		Age: 10, 
		Status: "ตาย",
		Datetime:   time.Now(),
	}

	ok, err := govalidator.ValidateStruct(emercase)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("ชื่อผู้ป่วยห้ามมีตัวเลข"))
}

func TestAgeIsNotNegitive(t *testing.T) {
	g := NewGomegaWithT(t)

	emercase := entity.Case{
		Location: "Home",
		Patient: "TOR",
		Age: -20, // ผิด
		Status: "ตาย",
		Datetime:   time.Now(),
	}

	ok, err := govalidator.ValidateStruct(emercase)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Age is not in range 0 to 100"))
}

func TestPatientStatusNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	emercase := entity.Case{
		Location: "Home", 
		Patient: "TOR", // ผิด
		Age: 10, 
		Status: "",
		Datetime:   time.Now(),
	}

	ok, err := govalidator.ValidateStruct(emercase)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("โปรดระบุบอาการของผู้ป่วยเท่าที่ทราบ"))
}

func TestCaseDateNotBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	emercase := entity.Case{
		Location: "Home",
		Patient: "TOR",
		Age: 10,
		Status: "ตาย",
		Datetime:   time.Now().Add(time.Minute * -30), // ผิด
	}

	ok, err := govalidator.ValidateStruct(emercase)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("ห้ามวันที่เป็นอดีต"))
}

func TestCaseDateNotBeFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	emercase := entity.Case{
		Location: "Home",
		Patient: "TOR",
		Age: 10,
		Status: "ตาย",
		Datetime:   time.Now().Add(time.Minute * 30), // ผิด
	}

	ok, err := govalidator.ValidateStruct(emercase)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("ห้ามวันที่เป็นอนาคต"))
}
