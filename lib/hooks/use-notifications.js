"use client"

import { useEffect, useState } from "react"

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>("default")

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications")
      return false
    }

    const result = await Notification.requestPermission()
    setPermission(result)
    return result === "granted"
  }

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (permission !== "granted") {
      console.log("Notification permission not granted")
      return
    }

    new Notification(title, {
      icon: "/icon.png",
      badge: "/badge.png",
      ...options,
    })
  }

  return {
    permission,
    requestPermission,
    sendNotification,
  }
}
