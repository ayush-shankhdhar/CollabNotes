"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, BookOpen, Clock } from "lucide-react"
import Link from "next/link"

interface SearchResult {
  id: string
  type: "note" | "notebook"
  title: string
  preview?: string
  notebook?: string
  tags?: string[]
  updatedAt: string
}

export function SearchView() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    setIsSearching(true)

    // TODO: Implement full-text search with Supabase
    const mockResults: SearchResult[] = [
      {
        id: "1",
        type: "note",
        title: "Project Planning Document",
        preview: "Initial project scope and timeline for Q1 2025...",
        notebook: "Work",
        tags: ["Important", "Work"],
        updatedAt: "2 hours ago",
      },
      {
        id: "2",
        type: "note",
        title: "Meeting Notes - Team Sync",
        preview: "Discussed project milestones and deliverables...",
        notebook: "Work",
        tags: ["Work"],
        updatedAt: "Yesterday",
      },
      {
        id: "3",
        type: "notebook",
        title: "Personal Projects",
        updatedAt: "3 days ago",
      },
    ]

    // Simulate search delay
    setTimeout(() => {
      setResults(mockResults.filter((r) => r.title.toLowerCase().includes(query.toLowerCase())))
      setIsSearching(false)
    }, 300)
  }, [query])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-6">Search</h1>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes, notebooks, and tags..."
            className="pl-12 h-12 text-lg"
            autoFocus
          />
        </div>
      </div>

      {/* Search Results */}
      {query.length < 2 ? (
        <div className="text-center text-muted-foreground py-12">
          <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Type at least 2 characters to search</p>
        </div>
      ) : isSearching ? (
        <div className="text-center text-muted-foreground py-12">Searching...</div>
      ) : results.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          <p>No results found for "{query}"</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Found {results.length} result{results.length !== 1 ? "s" : ""}
          </p>

          {results.map((result) => (
            <Link
              key={result.id}
              href={result.type === "note" ? `/app/notes/${result.id}` : `/app/notebooks/${result.id}`}
            >
              <Card className="p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  {result.type === "note" ? (
                    <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  ) : (
                    <BookOpen className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{result.title}</h3>

                    {result.preview && (
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{result.preview}</p>
                    )}

                    <div className="flex items-center gap-2 flex-wrap">
                      {result.notebook && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3" />
                          <span>{result.notebook}</span>
                        </div>
                      )}

                      {result.tags && result.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                          {result.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                        <Clock className="h-3 w-3" />
                        <span>{result.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
