package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func CheckNurse() gin.HandlerFunc {
	return func(c *gin.Context) {
		role := c.GetString("role_name")

		if role != "Nurse" {
			c.JSON(http.StatusBadGateway, gin.H{
				"error": "you is not Nurse",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}
