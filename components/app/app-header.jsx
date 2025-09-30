"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { ShareDialog } from "@/components/notes/share-dialog"
import { ActiveCollaborators } from "@/components/notes/active-collaborators"
import { VersionHistoryPanel } from "@/components/notes/version-history-panel"
import { CommentsPanel } from "@/components/notes/comments-panel"
import { OfflineIndicator } from "@/components/app/offline-indicator"
import { NotificationCenter } from "@/components/notifications/notification-center"

export function AppHeader() {
  const router = useRouter()
  const pathname = usePathname()

  // Extract note ID from pathname
  const noteId = pathname.match(/\/app\/notes\/([^/]+)/)?.[1]

  const handleLogout = () => {
    // TODO: Implement Supabase logout
    router.push("/login")
  }

  const handleRestoreVersion = (versionId) => {
    // TODO: Restore version from Supabase
    console.log("Restoring version:", versionId)
  }

  return (
    <header className="h-14 border-b border-border bg-card px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {noteId && noteId !== "new" && (
          <>
            <ShareDialog noteId={noteId} />
            <CommentsPanel noteId={noteId} />
            <VersionHistoryPanel noteId={noteId} onRestore={handleRestoreVersion} />
            <ActiveCollaborators noteId={noteId} />
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <OfflineIndicator />
        <NotificationCenter />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
