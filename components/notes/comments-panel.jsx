"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Send } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { formatDistanceToNow } from "date-fns"

export function CommentsPanel({ noteId }) {
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState(null)

  // TODO: Load comments from Supabase
  const [comments, setComments] = useState([
    {
      id: "1",
      content: "Great work on this document! I have a few suggestions for the timeline section.",
      user: { id: "1", name: "Alice Johnson" },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      replies: [
        {
          id: "2",
          content: "Thanks! I'll review your suggestions and update accordingly.",
          user: { id: "2", name: "John Doe" },
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: "3",
      content: "Should we add a section about risk management?",
      user: { id: "3", name: "Bob Smith" },
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
    },
  ])

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    // TODO: Add comment to Supabase
    const comment = {
      id: Date.now().toString(),
      content: newComment,
      user: { id: "current", name: "Current User" },
      createdAt: new Date(),
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          Comments ({comments.length})
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-[calc(100vh-8rem)]">
          {/* Comments List */}
          <ScrollArea className="flex-1 mb-4">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-2">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="text-xs">
                        {comment.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 mt-1"
                        onClick={() => setReplyTo(comment.id)}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-11 space-y-2">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar className="h-6 w-6 flex-shrink-0">
                            <AvatarFallback className="text-xs">
                              {reply.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{reply.user.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(reply.createdAt, { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* New Comment Input */}
          <div className="border-t pt-4">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2 min-h-[80px]"
            />
            <Button onClick={handleSubmitComment} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
