"use client"

import { useEffect, useState } from "react"

export function useOfflineSync() {
  const [syncStatus, setSyncStatus] = useState({
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    isSyncing: false,
    pendingChanges: 0,
    lastSyncedAt: null,
  })

  useEffect(() => {
    const handleOnline = () => {
      setSyncStatus((prev) => ({ ...prev, isOnline: true }))
      // Trigger sync when coming back online
      syncPendingChanges()
    }

    const handleOffline = () => {
      setSyncStatus((prev) => ({ ...prev, isOnline: false }))
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const syncPendingChanges = async () => {
    if (!syncStatus.isOnline) return

    setSyncStatus((prev) => ({ ...prev, isSyncing: true }))

    try {
      // TODO: Sync pending changes from IndexedDB to Supabase
      // 1. Get all pending changes from IndexedDB
      // 2. Upload to Supabase
      // 3. Clear pending changes
      // 4. Update lastSyncedAt

      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate sync

      setSyncStatus((prev) => ({
        ...prev,
        isSyncing: false,
        pendingChanges: 0,
        lastSyncedAt: new Date(),
      }))
    } catch (error) {
      console.error("Sync failed:", error)
      setSyncStatus((prev) => ({ ...prev, isSyncing: false }))
    }
  }

  const addPendingChange = () => {
    setSyncStatus((prev) => ({
      ...prev,
      pendingChanges: prev.pendingChanges + 1,
    }))
  }

  return {
    ...syncStatus,
    syncPendingChanges,
    addPendingChange,
  }
}
