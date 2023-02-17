package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team07/entity"
)

func TestComNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	cd := entity.CarWash{
		ComName:    "", //ผิด
		ComTel:     "043456790",
		ReceiptNum: "123456789",
		SerFees:    250,
		Date:       time.Now(),
	}

	ok, err := govalidator.ValidateStruct(cd)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal(" Company Name can not blank"))

}

func TestComTelNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	cd := entity.CarWash{
		ComName:    "washiw company",
		ComTel:     "", //ผิด
		ReceiptNum: "123456789",
		SerFees:    250,
		Date:       time.Now(),
	}

	ok, err := govalidator.ValidateStruct(cd)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal(" Company Tel can not blank"))

}

func TestReceiptNum9char(t *testing.T) {
	g := NewGomegaWithT(t)

	cd := entity.CarWash{
		ComName:    "washiw company",
		ComTel:     "098765432",
		ReceiptNum: "1234", //ผิด
		SerFees:    250,
		Date:       time.Now(),
	}

	ok, err := govalidator.ValidateStruct(cd)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal(" Receipt Number is not in length 9 charecter"))

}

func TestReceiptNumNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	cd := entity.CarWash{
		ComName:    "washiw company",
		ComTel:     "098765432",
		ReceiptNum: " ", //ผิด
		SerFees:    250,
		Date:       time.Now(),
	}

	ok, err := govalidator.ValidateStruct(cd)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal(" Receipt Number is not in length 9 charecter"))

}

func TestDatewashNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	cd := entity.CarWash{
		ComName:    "washiw company",
		ComTel:     "098765432",
		ReceiptNum: "123456789",
		SerFees:    250,
		Date:       time.Now().Add(time.Minute * -25), // ผิด
	}

	ok, err := govalidator.ValidateStruct(cd)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal(" Date must not be in the past"))

}

func TestDatewashNotFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	cd := entity.CarWash{
		ComName:    "washiw company",
		ComTel:     "098765432",
		ReceiptNum: "123456789",
		SerFees:    250,
		Date:       time.Now().Add(time.Minute * 25), // ผิด
	}

	ok, err := govalidator.ValidateStruct(cd)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal(" Date must not be in the future"))

}
