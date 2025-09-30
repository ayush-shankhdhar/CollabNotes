"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { History, RotateCcw } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { formatDistanceToNow } from "date-fns"

export function VersionHistoryPanel({ noteId, onRestore }) {
  const [selectedVersion, setSelectedVersion] = useState(null)

  // TODO: Load versions from Supabase
  const versions = [
    {
      id: "1",
      title: "Project Planning Document",
      content: {},
      createdBy: { id: "1", name: "John Doe" },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "2",
      title: "Project Planning",
      content: {},
      createdBy: { id: "2", name: "Alice Johnson" },
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: "3",
      title: "Initial Draft",
      content: {},
      createdBy: { id: "1", name: "John Doe" },
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <History className="h-4 w-4 mr-2" />
          History
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Version History</SheetTitle>
        </SheetHeader>

        <div className="mt-6 grid grid-cols-2 gap-4 h-[calc(100vh-8rem)]">
          {/* Versions List */}
          <ScrollArea className="border rounded-lg">
            <div className="p-2 space-y-2">
              {versions.map((version) => (
                <button
                  key={version.id}
                  onClick={() => setSelectedVersion(version)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedVersion?.id === version.id ? "bg-accent" : "hover:bg-accent/50"
                  }`}
                >
                  <div className="font-medium mb-1">{version.title}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs">
                        {version.createdBy.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{version.createdBy.name}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(version.createdAt, { addSuffix: true })}</span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Version Preview */}
          <div className="border rounded-lg flex flex-col">
            {selectedVersion ? (
              <>
                <div className="p-4 border-b">
                  <h3 className="font-semibold mb-2">{selectedVersion.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {selectedVersion.createdBy.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedVersion.createdBy.name}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(selectedVersion.createdAt, { addSuffix: true })}</span>
                  </div>
                  <Button onClick={() => onRestore(selectedVersion.id)} size="sm" className="w-full">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restore this version
                  </Button>
                </div>
                <ScrollArea className="flex-1 p-4">
                  <div className="prose prose-sm dark:prose-invert">
                    <p>Version content preview would be displayed here...</p>
                  </div>
                </ScrollArea>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a version to preview
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
