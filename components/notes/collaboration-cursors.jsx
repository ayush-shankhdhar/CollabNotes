"use client"

import { useEffect, useState } from "react"

export function CollaborationCursors({ noteId }) {
  const [collaborators, setCollaborators] = useState([])

  useEffect(() => {
    // TODO: Subscribe to Supabase Realtime for cursor positions
    // Mock data for demonstration
    const mockCollaborators = [
      {
        id: "1",
        name: "Alice Johnson",
        color: "#6366f1",
        cursorX: 300,
        cursorY: 200,
      },
      {
        id: "2",
        name: "Bob Smith",
        color: "#ec4899",
        cursorX: 500,
        cursorY: 350,
      },
    ]

    // Simulate cursor movement
    const interval = setInterval(() => {
      setCollaborators(
        mockCollaborators.map((c) => ({
          ...c,
          cursorX: c.cursorX + Math.random() * 20 - 10,
          cursorY: c.cursorY + Math.random() * 20 - 10,
        })),
      )
    }, 100)

    return () => clearInterval(interval)
  }, [noteId])

  return (
    <>
      {collaborators.map((collaborator) => (
        <div
          key={collaborator.id}
          className="fixed pointer-events-none z-50 transition-all duration-100"
          style={{
            left: `${collaborator.cursorX}px`,
            top: `${collaborator.cursorY}px`,
          }}
        >
          {/* Cursor */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.65376 12.3673L8.97017 15.6837L11.8586 12.7953L15.6837 8.97017L12.3673 5.65376L5.65376 12.3673Z"
              fill={collaborator.color}
            />
            <path
              d="M12.3673 5.65376L15.6837 8.97017L11.8586 12.7953L8.97017 15.6837L5.65376 12.3673L12.3673 5.65376Z"
              stroke={collaborator.color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Name tag */}
          <div
            className="ml-6 -mt-2 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
            style={{ backgroundColor: collaborator.color }}
          >
            {collaborator.name}
          </div>
        </div>
      ))}
    </>
  )
}
