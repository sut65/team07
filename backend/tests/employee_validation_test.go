package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team07/entity"
)

func TestAgeIsNotNegtive(t *testing.T) {
	g := NewGomegaWithT(t)

	ages := []int{
		-3,
		200,
		131,
		1,
	}

	for _, age := range ages {

		emp := entity.Employee{
			Name:    "Tanachod",
			Surname: "Sakthumjaroen",
			Age:     age, // ผิด
			Date:    time.Now(),
		}

		ok, err := govalidator.ValidateStruct(emp)

		g.Expect(ok).ToNot(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Age is not in range 10 to 99"))
	}

}
