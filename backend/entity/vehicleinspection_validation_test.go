package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestFailcannotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	veh := VehicleInspection{
		Fail:                      "", // ผิด
		OdoMeter:                  5555,
		VehicleInspectionDatetime: time.Now().Add(24 * time.Hour),
	}
	ok, err := govalidator.ValidateStruct(veh)

	g.Expect(ok).ToNot(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

	g.Expect(err.Error()).To(Equal("Fail cannot be blank")) //ส่ง error msg

}

func TestOdoMeterNot0(t *testing.T) {
	g := NewGomegaWithT(t)

	odo := []uint{
		0,
		100000,
		999999, 1000000,
	}
	for _, o := range odo {
		veh := VehicleInspection{
			Fail:                      "ฝนตก",
			OdoMeter:                  o, // ผิด
			VehicleInspectionDatetime: time.Now().Add(24 * time.Hour),
		}

		ok, err := govalidator.ValidateStruct(veh)

		g.Expect(ok).ToNot(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

		g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

		g.Expect(err.Error()).To(Equal("OdoMeter: non zero value required")) //ส่ง error msg

	}
}

func TestDayNoPast(t *testing.T) {
	g := NewGomegaWithT(t)

	veh := VehicleInspection{
		Fail:                      "ฝนตก",
		OdoMeter:                  1000,
		VehicleInspectionDatetime: time.Now().Add(time.Hour * -24), // ผิด
	}
	ok, err := govalidator.ValidateStruct(veh)

	g.Expect(ok).ToNot(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

	g.Expect(err.Error()).To(Equal("Day must be in the not past")) //ส่ง error msg

}

// check correct
func TestCorrectVeh(t *testing.T) {
	g := NewGomegaWithT(t)

	veh := VehicleInspection{
		Fail:                      "ยางรั่ว",
		OdoMeter:                  8888,
		VehicleInspectionDatetime: time.Now().Add(time.Hour * 24),
	}
	ok, err := govalidator.ValidateStruct(veh)
	g.Expect(ok).To(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).To(BeNil()) //เช็คว่ามันว่างไหม

}
