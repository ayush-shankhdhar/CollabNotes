"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Share2, Copy, Check, X } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ShareDialog({ noteId }) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("editor")
  const [copied, setCopied] = useState(false)
  const [isPublic, setIsPublic] = useState(false)

  // TODO: Load collaborators from Supabase
  const [collaborators, setCollaborators] = useState([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "editor",
    },
  ])

  const handleInvite = () => {
    // TODO: Add collaborator via Supabase
    console.log("Inviting:", email, "as", role)
    setEmail("")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/app/notes/${noteId}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRemoveCollaborator = (id) => {
    setCollaborators(collaborators.filter((c) => c.id !== id))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this note</DialogTitle>
          <DialogDescription>Invite people to collaborate on this note</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Invite by email */}
          <div className="space-y-2">
            <Label htmlFor="email">Invite by email</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Select value={role} onValueChange={(v) => setRole(v)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleInvite}>Invite</Button>
            </div>
          </div>

          {/* Current collaborators */}
          <div className="space-y-2">
            <Label>People with access</Label>
            <div className="space-y-2">
              {collaborators.map((collaborator) => (
                <div key={collaborator.id} className="flex items-center justify-between p-2 rounded-lg bg-muted">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {collaborator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{collaborator.name}</div>
                      <div className="text-xs text-muted-foreground">{collaborator.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={collaborator.role} onValueChange={(v) => console.log("Change role:", v)}>
                      <SelectTrigger className="w-24 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Viewer</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveCollaborator(collaborator.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Copy link */}
          <div className="space-y-2">
            <Label>Share link</Label>
            <div className="flex gap-2">
              <Input value={`${window.location.origin}/app/notes/${noteId}`} readOnly />
              <Button onClick={handleCopyLink} variant="outline">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
