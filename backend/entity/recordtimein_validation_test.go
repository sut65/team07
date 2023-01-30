package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// TimeIn	time.Time
// 	Odo		int
// 	Note	string


func TestAllCorrectRecordTimeIN(t *testing.T) {
	g := NewGomegaWithT(t)

	recIN := RecordTimeIn{
		Note: "no", 
		Odo: 100,
		TimeIn: time.Now().Add(24 * time.Hour),
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(recIN)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())

}

func TestNoteNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	recIN := RecordTimeIn{
		Note: "", //ผิด
		Odo: 100,
		TimeIn: time.Now().Add(24 * time.Hour),
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(recIN)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Note cannot be blank"))
}

func TestOdoNotZero(t *testing.T) {
	g := NewGomegaWithT(t)

	fixture := []int{
		0, 100000,
	}

	for _, odo := range fixture {
		recIN := RecordTimeIn{
			Note: "ยางรั่ว", 
			Odo: odo, //ผิด
			TimeIn: time.Now().Add(24 * time.Hour),
		}

		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(recIN)

		//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("The value must be in the range 1-99999"))

	}
}

func TestDateRecordTimeINNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	recIN := RecordTimeIn{
		Note: "ยางรั่ว", 
		Odo: 100,
		TimeIn: time.Now().Add(-24 * time.Hour), //ผิด
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(recIN)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Date must not be in the past"))
}