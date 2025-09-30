"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ActiveCollaborators({ noteId }) {
  // TODO: Subscribe to Supabase Realtime for active users
  const collaborators = [
    {
      id: "1",
      name: "Alice Johnson",
      color: "#6366f1",
      isTyping: true,
    },
    {
      id: "2",
      name: "Bob Smith",
      color: "#ec4899",
      isTyping: false,
    },
    {
      id: "3",
      name: "Carol White",
      color: "#10b981",
      isTyping: false,
    },
  ]

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        {collaborators.map((collaborator, index) => (
          <Tooltip key={collaborator.id}>
            <TooltipTrigger asChild>
              <div className="relative">
                <Avatar
                  className="h-8 w-8 border-2 transition-all"
                  style={{
                    borderColor: collaborator.isTyping ? collaborator.color : "transparent",
                    marginLeft: index > 0 ? "-8px" : "0",
                  }}
                >
                  <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                  <AvatarFallback style={{ backgroundColor: collaborator.color }} className="text-white text-xs">
                    {collaborator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {collaborator.isTyping && (
                  <div
                    className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background"
                    style={{ backgroundColor: collaborator.color }}
                  />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {collaborator.name}
                {collaborator.isTyping && " is typing..."}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
