package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func CheckDisinfectionStaff() gin.HandlerFunc {
	return func(c *gin.Context) {
		role := c.GetString("role_name")

		if role != "DisinfectionStaff" {
			c.JSON(http.StatusBadGateway, gin.H{
				"error": "you is not Disinfection Staff",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}