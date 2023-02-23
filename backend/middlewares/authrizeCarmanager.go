package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func CheckCarManager() gin.HandlerFunc {
	return func(c *gin.Context) {
		role := c.GetString("role_name")

		if role != "CarManager" {
			c.JSON(http.StatusBadGateway, gin.H{
				"error": "you is not Car Manager",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}
