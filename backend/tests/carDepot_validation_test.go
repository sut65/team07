package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team07/entity"
)

func TestPNumIsNotNegtive(t *testing.T) {
	g := NewGomegaWithT(t)

	cd := entity.CarDepot{
		EmpCode: "DV01",
		PNum:    -1, // ผิด
		Date:    time.Now(),
	}

	ok, err := govalidator.ValidateStruct(cd)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Park number is not in range 1 to 200"))

}

// func TestPNumNotBlank(t *testing.T) {
// 	g := NewGomegaWithT(t)
// 	nump = null
// 	cd := entity.CarDepot{
// 		EmpCode: "DV01",
// 		PNum:    nump  , // ผิด
// 		Date:    time.Now(),
// 	}

// 	ok, err := govalidator.ValidateStruct(cd)

// 	g.Expect(ok).ToNot(BeTrue())

// 	g.Expect(err).ToNot(BeNil())

// 	g.Expect(err.Error()).To(Equal("Park number can not blank"))

// }

func TestEmpCodeValid(t *testing.T) {
	g := NewGomegaWithT(t)

	cd := entity.CarDepot{
		EmpCode: "123", // ผิด
		PNum:    1,
		Date:    time.Now(),
	}

	ok, err := govalidator.ValidateStruct(cd)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Employee code is not in length 4-6 charecter"))

}

func TestEmpCodeNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	cd := entity.CarDepot{
		EmpCode: " ", // ผิด
		PNum:    2,
		Date:    time.Now(),
	}

	ok, err := govalidator.ValidateStruct(cd)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Employee code can not blank"))

}

func TestDateNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	cd := entity.CarDepot{
		EmpCode: "DV01",
		PNum:    10,
		Date:    time.Now().Add(-24 * time.Hour), // ผิด
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(cd)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Date must not be in the past"))
}
