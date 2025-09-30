"use client"

import { useEffect, useRef } from "react"

export function EditorContent({ content, onChange, onSave }) {
  const editorRef = useRef(null)
  const isInitialLoad = useRef(true)

  useEffect(() => {
    if (editorRef.current && content && isInitialLoad.current) {
      editorRef.current.innerHTML = content
      isInitialLoad.current = false
    }
  }, [content])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleKeyDown = (e) => {
    // Save on Ctrl/Cmd + S
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault()
      onSave()
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[500px]"
        suppressContentEditableWarning
      >
        <p>Start writing your note here...</p>
      </div>
    </div>
  )
}
