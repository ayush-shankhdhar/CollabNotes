"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link,
  ImageIcon,
  Table,
  Undo,
  Redo,
} from "lucide-react"

export function EditorToolbar() {
  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value)
  }

  return (
    <div className="border-b border-border p-2 flex items-center gap-1 flex-wrap bg-card">
      {/* History */}
      <Button variant="ghost" size="sm" onClick={() => executeCommand("undo")}>
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => executeCommand("redo")}>
        <Redo className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Text Formatting */}
      <Button variant="ghost" size="sm" onClick={() => executeCommand("bold")}>
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => executeCommand("italic")}>
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => executeCommand("underline")}>
        <Underline className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => executeCommand("strikeThrough")}>
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => executeCommand("formatBlock", "<code>")}>
        <Code className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Headings */}
      <Button variant="ghost" size="sm" onClick={() => executeCommand("formatBlock", "<h1>")}>
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => executeCommand("formatBlock", "<h2>")}>
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => executeCommand("formatBlock", "<h3>")}>
        <Heading3 className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Lists */}
      <Button variant="ghost" size="sm" onClick={() => executeCommand("insertUnorderedList")}>
        <List className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => executeCommand("insertOrderedList")}>
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => executeCommand("formatBlock", "<blockquote>")}>
        <Quote className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Insert */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const url = prompt("Enter URL:")
          if (url) executeCommand("createLink", url)
        }}
      >
        <Link className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const url = prompt("Enter image URL:")
          if (url) executeCommand("insertImage", url)
        }}
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const rows = prompt("Number of rows:", "3")
          const cols = prompt("Number of columns:", "3")
          if (rows && cols) {
            let table = "<table border='1'>"
            for (let i = 0; i < Number.parseInt(rows); i++) {
              table += "<tr>"
              for (let j = 0; j < Number.parseInt(cols); j++) {
                table += "<td><br></td>"
              }
              table += "</tr>"
            }
            table += "</table>"
            executeCommand("insertHTML", table)
          }
        }}
      >
        <Table className="h-4 w-4" />
      </Button>
    </div>
  )
}
