package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// WorkTime	time.Time
// 	AmountDisinfectant		int
// 	Note	string

func TestAllCorrectDisinfection(t *testing.T) {
	g := NewGomegaWithT(t)

	disin := Disinfection{
		Note: "no", 
		AmountDisinfectant: 100,
		WorkTime: time.Now().Add(24 * time.Hour),
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(disin)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())

}

func TestNoteDisinfectionNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	disin := Disinfection{
		Note: "", //ผิด
		AmountDisinfectant: 100,
		WorkTime: time.Now().Add(24 * time.Hour),
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(disin)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Note cannot be blank"))
}

func TestAmountDisintantNotZero(t *testing.T) {
	g := NewGomegaWithT(t)

	fixture := []int{
		0, 10000,
	}

	for _, amount := range fixture {
		disin := Disinfection{
			Note: "ยางรั่ว", 
			AmountDisinfectant: amount, //ผิด
			WorkTime: time.Now().Add(24 * time.Hour),
		}

		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(disin)

		//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("The value must be in the range 1-9999"))
	}
}

func TestDateNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	disin := Disinfection{
		Note: "ยางรั่ว", 
		AmountDisinfectant: 100, //ผิด
		WorkTime: time.Now().Add(-24 * time.Hour),
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(disin)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Date must not be in the past"))
}

