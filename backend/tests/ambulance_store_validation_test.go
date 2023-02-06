package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team07/entity"
)

func TestAmountIsNotNegitive(t *testing.T) {
	g := NewGomegaWithT(t)

	ambstore := entity.AmbulanceStore{
		Amount: -20, // ผิด
		Date:   time.Now(),
		Employee: entity.Employee{
			Name:    "Tanachod",
			Surname: "Sakthamjaroen",
		},
		Ambulance: entity.Ambulance{},
	}

	ok, err := govalidator.ValidateStruct(ambstore)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Amount is not less equal than 0"))
}
