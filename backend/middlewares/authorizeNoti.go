package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func CheckNoti() gin.HandlerFunc {
	return func(c *gin.Context) {
		role := c.GetString("role_name")

		if role != "NotificationStaff" {
			c.JSON(http.StatusBadGateway, gin.H{
				"error": "you is not NotificationStaff",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}
