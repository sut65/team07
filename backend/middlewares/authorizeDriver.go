package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func CheckDriver() gin.HandlerFunc {
	return func(c *gin.Context) {
		role := c.GetString("role_name")

		if role != "Driver" {
			c.JSON(http.StatusBadGateway, gin.H{
				"error": "you is not Driver",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}