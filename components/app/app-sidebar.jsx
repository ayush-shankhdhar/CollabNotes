"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FileText,
  Plus,
  Search,
  BookOpen,
  Tag,
  Clock,
  Settings,
  ChevronRight,
  ChevronDown,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [notebooksExpanded, setNotebooksExpanded] = useState(true)
  const [recentExpanded, setRecentExpanded] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - will be replaced with real data from Supabase
  const notebooks = [
    { id: "1", title: "Personal", noteCount: 12 },
    { id: "2", title: "Work", noteCount: 8 },
    { id: "3", title: "Projects", noteCount: 5 },
  ]

  const recentNotes = [
    { id: "1", title: "Meeting Notes", updatedAt: "2 hours ago" },
    { id: "2", title: "Project Ideas", updatedAt: "Yesterday" },
    { id: "3", title: "Todo List", updatedAt: "2 days ago" },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/app/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-sidebar-border">
        <Link href="/app" className="flex items-center gap-2 mb-4">
          <FileText className="h-6 w-6 text-sidebar-primary" />
          <span className="text-lg font-semibold text-sidebar-foreground">CollabNotes</span>
        </Link>

        <Link href="/app/notes/new">
          <Button className="w-full" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-sidebar-border">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-9 bg-sidebar-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* Notebooks Section */}
          <div className="mb-4">
            <button
              onClick={() => setNotebooksExpanded(!notebooksExpanded)}
              className="flex items-center gap-2 w-full px-2 py-1.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md"
            >
              {notebooksExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <BookOpen className="h-4 w-4" />
              <span>Notebooks</span>
            </button>

            {notebooksExpanded && (
              <div className="ml-6 mt-1 space-y-1">
                {notebooks.map((notebook) => (
                  <Link
                    key={notebook.id}
                    href={`/app/notebooks/${notebook.id}`}
                    className={cn(
                      "flex items-center justify-between px-2 py-1.5 text-sm rounded-md hover:bg-sidebar-accent",
                      pathname.includes(`/notebooks/${notebook.id}`)
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground",
                    )}
                  >
                    <span>{notebook.title}</span>
                    <span className="text-xs text-muted-foreground">{notebook.noteCount}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent Notes Section */}
          <div className="mb-4">
            <button
              onClick={() => setRecentExpanded(!recentExpanded)}
              className="flex items-center gap-2 w-full px-2 py-1.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md"
            >
              {recentExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <Clock className="h-4 w-4" />
              <span>Recent</span>
            </button>

            {recentExpanded && (
              <div className="ml-6 mt-1 space-y-1">
                {recentNotes.map((note) => (
                  <Link
                    key={note.id}
                    href={`/app/notes/${note.id}`}
                    className={cn(
                      "block px-2 py-1.5 text-sm rounded-md hover:bg-sidebar-accent",
                      pathname === `/app/notes/${note.id}`
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground",
                    )}
                  >
                    <div className="font-medium truncate">{note.title}</div>
                    <div className="text-xs text-muted-foreground">{note.updatedAt}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-1">
            <Link
              href="/app/tags"
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-sidebar-accent",
                pathname === "/app/tags"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground",
              )}
            >
              <Tag className="h-4 w-4" />
              <span>Tags</span>
            </Link>

            <Link
              href="/app/activity"
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-sidebar-accent",
                pathname === "/app/activity"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground",
              )}
            >
              <Activity className="h-4 w-4" />
              <span>Activity</span>
            </Link>

            <Link
              href="/app/settings"
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-sidebar-accent",
                pathname === "/app/settings"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground",
              )}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}
