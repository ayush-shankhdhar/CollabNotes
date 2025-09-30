"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Share2, MessageSquare, Edit } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

export function ActivityFeed() {
  // TODO: Load activities from Supabase
  const activities: Activity[] = [
    {
      id: "1",
      type: "updated",
      user: { id: "1", name: "John Doe" },
      target: { type: "note", id: "1", title: "Project Planning" },
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: "2",
      type: "commented",
      user: { id: "2", name: "Alice Johnson" },
      target: { type: "note", id: "2", title: "Meeting Notes" },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      metadata: { comment: "Great summary of the meeting!" },
    },
    {
      id: "3",
      type: "shared",
      user: { id: "1", name: "John Doe" },
      target: { type: "note", id: "3", title: "Q1 Goals" },
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      metadata: { sharedWith: "Bob Smith" },
    },
    {
      id: "4",
      type: "created",
      user: { id: "3", name: "Bob Smith" },
      target: { type: "notebook", id: "1", title: "Personal Projects" },
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ]

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "created":
        return <FileText className="h-4 w-4" />
      case "updated":
        return <Edit className="h-4 w-4" />
      case "shared":
        return <Share2 className="h-4 w-4" />
      case "commented":
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getActivityText = (activity: Activity) => {
    const targetLink = (
      <Link
        href={
          activity.target.type === "note" ? `/app/notes/${activity.target.id}` : `/app/notebooks/${activity.target.id}`
        }
        className="font-medium text-primary hover:underline"
      >
        {activity.target.title}
      </Link>
    )

    switch (activity.type) {
      case "created":
        return (
          <>
            created {activity.target.type === "note" ? "note" : "notebook"} {targetLink}
          </>
        )
      case "updated":
        return (
          <>
            updated {activity.target.type === "note" ? "note" : "notebook"} {targetLink}
          </>
        )
      case "shared":
        return (
          <>
            shared {targetLink}
            {activity.metadata?.sharedWith && <> with {activity.metadata.sharedWith}</>}
          </>
        )
      case "commented":
        return (
          <>
            commented on {targetLink}
            {activity.metadata?.comment && (
              <div className="mt-1 text-sm text-muted-foreground italic">"{activity.metadata.comment}"</div>
            )}
          </>
        )
    }
  }

  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">Recent Activity</h2>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="text-xs">
                  {activity.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  <div className="mt-1 text-primary">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user.name}</span> {getActivityText(activity)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
