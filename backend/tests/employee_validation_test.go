package tests

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team07/entity"
)

func TestEmployeeAgeIsNotNegtive(t *testing.T) {
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

func TestEmployeeDateNotBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	emp := entity.Employee{
		Name:    "Tanachod",
		Surname: "Sakthumjaroen",
		Age:     25,
		Date:    time.Now().Add(time.Minute * -25), // ผิด
	}

	ok, err := govalidator.ValidateStruct(emp)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Date must not be in the past"))
}

func TestEmployeeDateNotBeFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	emp := entity.Employee{
		Name:    "Tanachod",
		Surname: "Sakthumjaroen",
		Age:     25,
		Date:    time.Now().Add(time.Minute * 25), // ผิด
	}

	ok, err := govalidator.ValidateStruct(emp)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Date must not be in the future"))
}

func TestEmployeeNameNotBeNull(t *testing.T) {
	g := NewGomegaWithT(t)

	emp := entity.Employee{
		Name:    "", // ผิด
		Surname: "Sakthumjaroen",
		Age:     25,
		Date:    time.Now(),
	}

	ok, err := govalidator.ValidateStruct(emp)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Name is not null"))
}

func TestEmployeeSurnameNotBeNull(t *testing.T) {
	g := NewGomegaWithT(t)

	emp := entity.Employee{
		Name:    "Tanachod",
		Surname: "", // ผิด
		Age:     25,
		Date:    time.Now(),
	}

	ok, err := govalidator.ValidateStruct(emp)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Surname is not null"))
}
