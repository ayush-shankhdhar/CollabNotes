"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Plus, X, Check } from "lucide-react"

export function TagSelector({ selectedTags, onTagsChange }) {
  const [searchQuery, setSearchQuery] = useState("")

  // TODO: Load available tags from Supabase
  const availableTags = [
    { id: "1", name: "Important", color: "#ef4444" },
    { id: "2", name: "Work", color: "#3b82f6" },
    { id: "3", name: "Personal", color: "#10b981" },
    { id: "4", name: "Ideas", color: "#f59e0b" },
  ]

  const filteredTags = availableTags.filter((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const toggleTag = (tag) => {
    const isSelected = selectedTags.some((t) => t.id === tag.id)
    if (isSelected) {
      onTagsChange(selectedTags.filter((t) => t.id !== tag.id))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  const removeTag = (tagId) => {
    onTagsChange(selectedTags.filter((t) => t.id !== tagId))
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {selectedTags.map((tag) => (
        <Badge key={tag.id} style={{ backgroundColor: tag.color }} className="text-white pr-1">
          {tag.name}
          <button onClick={() => removeTag(tag.id)} className="ml-1 hover:bg-white/20 rounded p-0.5">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-6 bg-transparent">
            <Plus className="h-3 w-3 mr-1" />
            Add Tag
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2">
          <Input
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-2"
          />
          <div className="space-y-1 max-h-48 overflow-auto">
            {filteredTags.map((tag) => {
              const isSelected = selectedTags.some((t) => t.id === tag.id)
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag)}
                  className="w-full flex items-center justify-between p-2 rounded hover:bg-accent"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.color }} />
                    <span className="text-sm">{tag.name}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-primary" />}
                </button>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
