"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function TagsView() {
  const [tags, setTags] = useState([
    { id: "1", name: "Important", color: "#ef4444", noteCount: 5 },
    { id: "2", name: "Work", color: "#3b82f6", noteCount: 12 },
    { id: "3", name: "Personal", color: "#10b981", noteCount: 8 },
    { id: "4", name: "Ideas", color: "#f59e0b", noteCount: 15 },
  ])

  const [selectedTag, setSelectedTag] = useState(tags[0])
  const [newTagName, setNewTagName] = useState("")
  const [newTagColor, setNewTagColor] = useState("#6366f1")

  const handleCreateTag = () => {
    // TODO: Create tag in Supabase
    const newTag = {
      id: Date.now().toString(),
      name: newTagName,
      color: newTagColor,
      noteCount: 0,
    }
    setTags([...tags, newTag])
    setNewTagName("")
  }

  const handleDeleteTag = (tagId) => {
    setTags(tags.filter((t) => t.id !== tagId))
    if (selectedTag?.id === tagId) {
      setSelectedTag(tags[0] || null)
    }
  }

  // Mock notes for selected tag
  const notesWithTag = [
    { id: "1", title: "Q1 Planning", updatedAt: "2 hours ago" },
    { id: "2", title: "Team Meeting", updatedAt: "Yesterday" },
    { id: "3", title: "Project Roadmap", updatedAt: "2 days ago" },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold">Tags</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Tag
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new tag</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tag-name">Tag name</Label>
                  <Input
                    id="tag-name"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="e.g., Important"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tag-color">Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tag-color"
                      type="color"
                      value={newTagColor}
                      onChange={(e) => setNewTagColor(e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input value={newTagColor} onChange={(e) => setNewTagColor(e.target.value)} />
                  </div>
                </div>
                <Button onClick={handleCreateTag} className="w-full">
                  Create Tag
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">Organize your notes with tags</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tags List */}
        <Card className="p-4 lg:col-span-1">
          <h2 className="font-semibold mb-4">All Tags ({tags.length})</h2>
          <div className="space-y-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag)}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                  selectedTag?.id === tag.id ? "bg-accent" : "hover:bg-accent/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.color }} />
                  <span className="font-medium">{tag.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{tag.noteCount}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteTag(tag.id)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Notes with Selected Tag */}
        <div className="lg:col-span-2">
          {selectedTag ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <Badge style={{ backgroundColor: selectedTag.color }} className="text-white">
                  {selectedTag.name}
                </Badge>
                <span className="text-muted-foreground">{selectedTag.noteCount} notes</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {notesWithTag.map((note) => (
                  <Link key={note.id} href={`/app/notes/${note.id}`}>
                    <Card className="p-4 hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold mb-1 truncate">{note.title}</h3>
                          <p className="text-xs text-muted-foreground">{note.updatedAt}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground py-12">Select a tag to view notes</div>
          )}
        </div>
      </div>
    </div>
  )
}
