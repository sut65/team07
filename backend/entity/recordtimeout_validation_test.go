package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestAnnotationcannotbeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	rec := RecordTimeOUT{
		Annotation:            "", // ผิด
		OdoMeter:              100,
		RecordTimeOutDatetime: time.Now().Add(24 * time.Hour),
	}
	ok, err := govalidator.ValidateStruct(rec)

	g.Expect(ok).ToNot(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

	g.Expect(err.Error()).To(Equal("Annotation cannot be blank")) //ส่ง error msg

}

func TestOdoMeterNotZero(t *testing.T) {
	g := NewGomegaWithT(t)
	odo := []uint{
		0,
		100000,
		999999, 1000000,
	}
	for _, o := range odo {
		rec := RecordTimeOUT{
			Annotation:            "ฝนตก",
			OdoMeter:              o, // ผิด
			RecordTimeOutDatetime: time.Now().Add(24 * time.Hour),
		}

		ok, err := govalidator.ValidateStruct(rec)

		g.Expect(ok).ToNot(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

		g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

		g.Expect(err.Error()).To(Equal("OdoMeter: non zero value required")) //ส่ง error msg
	}

}

func TestDayNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	rec := RecordTimeOUT{
		Annotation:            "ฝนตก",
		OdoMeter:              1000, // ผิด
		RecordTimeOutDatetime: time.Now().Add(time.Hour * -24),
	}
	ok, err := govalidator.ValidateStruct(rec)

	g.Expect(ok).ToNot(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

	g.Expect(err.Error()).To(Equal("Day must be in the not past")) //ส่ง error msg

}

func TestCorrectRec(t *testing.T) {
	g := NewGomegaWithT(t)

	rec := RecordTimeOUT{
		Annotation:            "ต4 ทำถนน ทำให้จราจรติดขัด",
		OdoMeter:              8888,
		RecordTimeOutDatetime: time.Now().Add(time.Hour * 24),
	}
	ok, err := govalidator.ValidateStruct(rec)
	g.Expect(ok).To(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).To(BeNil()) //เช็คว่ามันว่างไหม

}

//Run Test -> go test ./...
