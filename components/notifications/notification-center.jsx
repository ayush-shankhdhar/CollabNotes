"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Check, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

export function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "mention",
      title: "You were mentioned",
      message: "Alice mentioned you in 'Project Planning'",
      link: "/app/notes/1",
      read: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: "2",
      type: "comment",
      title: "New comment",
      message: "Bob commented on 'Meeting Notes'",
      link: "/app/notes/2",
      read: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "3",
      type: "share",
      title: "Note shared with you",
      message: "Carol shared 'Q1 Goals' with you",
      link: "/app/notes/3",
      read: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>

        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-accent transition-colors ${!notification.read ? "bg-accent/50" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      {notification.link ? (
                        <Link href={notification.link} onClick={() => markAsRead(notification.id)}>
                          <h4 className="font-medium text-sm mb-1 hover:text-primary">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        </Link>
                      ) : (
                        <>
                          <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        </>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
