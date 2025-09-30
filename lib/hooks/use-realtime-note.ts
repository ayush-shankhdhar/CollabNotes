"use client"

import { useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface Note {
  id: string
  title: string
  content: any
  updated_at: string
}

export function useRealtimeNote(noteId: string) {
  const [note, setNote] = useState<Note | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    // Load initial note
    const loadNote = async () => {
      const { data, error } = await supabase.from("notes").select("*").eq("id", noteId).single()

      if (data) {
        setNote(data)
      }
      setIsLoading(false)
    }

    loadNote()

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`note:${noteId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "notes", filter: `id=eq.${noteId}` },
        (payload) => {
          setNote(payload.new as Note)
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [noteId, supabase])

  return { note, isLoading }
}
