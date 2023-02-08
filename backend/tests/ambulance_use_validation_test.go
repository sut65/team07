package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team07/entity"
)

func TestAmounMustBeGreaterThanZero(t *testing.T) {
	g := NewGomegaWithT(t)

	ablu := entity.AmbulanceUse {
		Amount: -11,
		Date: time.Now(),
	}

	ok, err := govalidator.ValidateStruct(ablu)

	g.Expect(ok).ToNot(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

	g.Expect(err.Error()).To(Equal("จำนวนไม่ควรมีค่าเป็นลบ"))
}

func TestAmbulanceUseDateNotBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	ablu := entity.AmbulanceUse {
		Amount: 10,
		Date: time.Now().Add(time.Hour * -24),
	}

	ok, err := govalidator.ValidateStruct(ablu)

	g.Expect(ok).ToNot(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

	g.Expect(err.Error()).To(Equal("วันที่ไม่ควรเป็นอดีต"))
}

func TestAmbulanceUseDateNotBeFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	ablu := entity.AmbulanceUse {
		Amount: 12,
		Date: time.Now().Add(time.Hour * 24),
	}

	ok, err := govalidator.ValidateStruct(ablu)

	g.Expect(ok).ToNot(BeTrue()) //เช็คว่ามันเป็นค่าจริงไหม

	g.Expect(err).ToNot(BeNil()) //เช็คว่ามันว่างไหม

	g.Expect(err.Error()).To(Equal("วันที่ไม่ควรเป็นอนาคต"))
}