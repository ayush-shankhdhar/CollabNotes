"use client"

import { createBrowserClient } from "@supabase/ssr"

let client = null

export function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  return client
}
