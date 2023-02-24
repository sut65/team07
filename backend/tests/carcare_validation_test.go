package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team07/entity"
)

func TestBillNotZero(t *testing.T) {
	g := NewGomegaWithT(t)

	carcare := entity.Carcare{
		Bill:       0, // ผิด
		Note:       "ตาย",
		SendDate:   time.Now(),
		ReciveDate: time.Now(),
		SaveDate:   time.Now(),
	}

	ok, err := govalidator.ValidateStruct(carcare)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("ราคาต้องไม่เป็น 0"))
}

func TestBillNotNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	carcare := entity.Carcare{
		Bill:       -1, // ผิด
		Note:       "ตาย",
		SendDate:   time.Now(),
		ReciveDate: time.Now(),
		SaveDate:   time.Now(),
	}

	ok, err := govalidator.ValidateStruct(carcare)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("ราคาต้องไม่ติดลบ"))
}

func TestNoteNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	carcare := entity.Carcare{
		Bill:       10,
		Note:       "", // ผิด
		SendDate:   time.Now(),
		ReciveDate: time.Now(),
		SaveDate:   time.Now(),
	}

	ok, err := govalidator.ValidateStruct(carcare)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("โปรดระบุบเสนอเเนะ"))
}

func TestSavedateNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	carcare := entity.Carcare{
		Bill:       10,
		Note:       "tor", 
		SendDate:   time.Now(),
		ReciveDate: time.Now(),
		SaveDate:   time.Now().Add(time.Minute * -30), // ผิด
	}

	ok, err := govalidator.ValidateStruct(carcare)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("ห้ามวันที่เป็นอดีต"))
}

func TestSavedateNotFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	carcare := entity.Carcare{
		Bill:       10,
		Note:       "tor", 
		SendDate:   time.Now(),
		ReciveDate: time.Now(),
		SaveDate:   time.Now().Add(time.Minute * 30), // ผิด
	}

	ok, err := govalidator.ValidateStruct(carcare)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("ห้ามวันที่เป็นอนาคต"))
}

func TestSenddateNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	carcare := entity.Carcare{
		Bill:       10,
		Note:       "tor", 
		SendDate:   time.Now().Add(time.Minute * -30), // ผิด
		ReciveDate: time.Now(),
		SaveDate:   time.Now(),
	}

	ok, err := govalidator.ValidateStruct(carcare)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Send Date not Past"))
}

func TestRecivedateNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	carcare := entity.Carcare{
		Bill:       10,
		Note:       "tor", 
		SendDate:   time.Now(),
		ReciveDate: time.Now().Add(time.Minute * -30), // ผิด
		SaveDate:   time.Now(),
	}

	ok, err := govalidator.ValidateStruct(carcare)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Recive Date not Past"))
}