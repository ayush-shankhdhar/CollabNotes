"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, MoreVertical, FileText } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function NotebookView({ notebookId }) {
  // TODO: Load notebook and notes from Supabase
  const notebook = {
    id: notebookId,
    title: "Work Notebook",
    description: "All my work-related notes",
  }

  const notes = [
    { id: "1", title: "Project Planning", updatedAt: "2 hours ago", preview: "Initial project scope and timeline..." },
    { id: "2", title: "Meeting Notes", updatedAt: "Yesterday", preview: "Discussed Q1 goals and objectives..." },
    { id: "3", title: "Ideas", updatedAt: "2 days ago", preview: "Brainstorming session for new features..." },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Notebook Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-4xl font-bold mb-2">{notebook.title}</h1>
            <p className="text-muted-foreground">{notebook.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit notebook</DropdownMenuItem>
              <DropdownMenuItem>Share notebook</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete notebook</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{notes.length} notes</span>
        </div>
      </div>

      {/* Create Note Button */}
      <Link href="/app/notes/new">
        <Button className="mb-6">
          <Plus className="h-4 w-4 mr-2" />
          New Note in this Notebook
        </Button>
      </Link>

      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Link key={note.id} href={`/app/notes/${note.id}`}>
            <Card className="p-4 hover:border-primary/50 transition-colors cursor-pointer h-full">
              <div className="flex items-start gap-3 mb-3">
                <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 truncate">{note.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{note.preview}</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">{note.updatedAt}</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
