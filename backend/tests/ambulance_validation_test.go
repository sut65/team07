package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team07/entity"
)

func TestCarBrandNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	abl := entity.Ambulance {
		Clp: "AB1234",
		Date: time.Now(),
		CarBrand: "",
	}

	ok, err := govalidator.ValidateStruct(abl)

	g.Expect(ok).ToNot(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

	g.Expect(err.Error()).To(Equal("โปรดกรอกยี่ห้อรถ"))
}

func TestClpNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	abl := entity.Ambulance {
		Clp: "",
		Date: time.Now(),
		CarBrand: "Toyota",
	}

	ok, err := govalidator.ValidateStruct(abl)

	g.Expect(ok).ToNot(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

	g.Expect(err.Error()).To(Equal("โปรดกรอกเลขทะเบียนรถ"))
}

func TestClpMustBeValid(t *testing.T) {
	g := NewGomegaWithT(t)

	abl := entity.Ambulance {
		Clp: "AB234",
		Date: time.Now(),
		CarBrand: "Toyota",
	}

	ok, err := govalidator.ValidateStruct(abl)

	g.Expect(ok).ToNot(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

	g.Expect(err.Error()).To(Equal("โปรดกรอกเลขทะเบียนรถให้ถูกต้อง"))
}

func TestAmbulanceDateNotBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	abl := entity.Ambulance {
		Clp: "AB1234",
		Date: time.Now().Add(time.Hour * -24),
		CarBrand: "Toyota",
	}

	ok, err := govalidator.ValidateStruct(abl)

	g.Expect(ok).ToNot(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

	g.Expect(err.Error()).To(Equal("วันที่ไม่ควรเป็นอดีต"))
}

func TestAmbulanceDateNotBeFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	abl := entity.Ambulance {
		Clp: "AB1234",
		Date: time.Now().Add(time.Hour * 24),
		CarBrand: "Toyota",
	}

	ok, err := govalidator.ValidateStruct(abl)

	g.Expect(ok).ToNot(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

	g.Expect(err.Error()).To(Equal("วันที่ไม่ควรเป็นอนาคต"))
}