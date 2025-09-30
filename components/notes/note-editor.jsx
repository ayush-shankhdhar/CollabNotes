"use client"
import { useState, useEffect } from "react"
import { EditorContent } from "./editor-content"
import { EditorToolbar } from "./editor-toolbar"
import { Input } from "@/components/ui/input"
import { CollaborationCursors } from "./collaboration-cursors"

export function NoteEditor({ noteId }) {
  const [title, setTitle] = useState("Untitled")
  const [content, setContent] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  // TODO: Load note from Supabase using useRealtimeNote hook
  useEffect(() => {
    if (noteId !== "new") {
      // Load existing note
      setTitle("Sample Note")
      setContent("<p>Start writing your note here...</p>")
    }
  }, [noteId])

  // TODO: Auto-save functionality with debouncing
  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    setTimeout(() => {
      setIsSaving(false)
    }, 500)
  }

  return (
    <div className="h-full flex flex-col relative">
      {noteId !== "new" && <CollaborationCursors noteId={noteId} />}

      {/* Note Title */}
      <div className="border-b border-border p-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          className="text-3xl font-bold border-none bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
          <span>{isSaving ? "Saving..." : "Saved"}</span>
          <span>•</span>
          <span>Last edited 2 minutes ago</span>
        </div>
      </div>

      {/* Editor Toolbar */}
      <EditorToolbar />

      {/* Editor Content */}
      <div className="flex-1 overflow-auto">
        <EditorContent content={content} onChange={setContent} onSave={handleSave} />
      </div>
    </div>
  )
}
