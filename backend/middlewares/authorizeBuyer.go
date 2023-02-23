package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func CheckCarBuyer() gin.HandlerFunc {
	return func(c *gin.Context) {
		role := c.GetString("role_name")

		if role != "CarBuyer" {
			c.JSON(http.StatusBadGateway, gin.H{
				"error": "you is not Car Buyer",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}
