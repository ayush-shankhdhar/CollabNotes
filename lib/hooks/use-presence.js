"use client"

import { useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface PresenceState {
  user_id: string
  name: string
  cursor_x: number
  cursor_y: number
  is_typing: boolean
}

export function usePresence(noteId: string, userId: string, userName: string) {
  const [presences, setPresences] = useState<Record<string, PresenceState>>({})
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    const channel = supabase.channel(`presence:${noteId}`, {
      config: {
        presence: {
          key: userId,
        },
      },
    })

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState()
        setPresences(state as Record<string, PresenceState>)
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log("User joined:", key, newPresences)
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        console.log("User left:", key, leftPresences)
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            user_id: userId,
            name: userName,
            cursor_x: 0,
            cursor_y: 0,
            is_typing: false,
          })
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [noteId, userId, userName, supabase])

  const updatePresence = async (updates: Partial<PresenceState>) => {
    const channel = supabase.channel(`presence:${noteId}`)
    await channel.track({
      user_id: userId,
      name: userName,
      ...updates,
    })
  }

  return { presences, updatePresence }
}
