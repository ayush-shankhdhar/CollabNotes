"use client"

import { useOfflineSync } from "@/lib/hooks/use-offline-sync"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WifiOff, Wifi, RefreshCw } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function OfflineIndicator() {
  const { isOnline, isSyncing, pendingChanges, lastSyncedAt, syncPendingChanges } = useOfflineSync()

  if (isOnline && pendingChanges === 0) {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4 text-destructive" />}
          {!isOnline && <span className="text-destructive">Offline</span>}
          {pendingChanges > 0 && (
            <Badge variant="secondary" className="ml-1">
              {pendingChanges}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Sync Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Connection:</span>
                <span className={isOnline ? "text-green-500" : "text-destructive"}>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pending changes:</span>
                <span>{pendingChanges}</span>
              </div>
              {lastSyncedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last synced:</span>
                  <span>{lastSyncedAt.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </div>

          {!isOnline && (
            <div className="p-3 bg-muted rounded-lg text-sm">
              <p className="text-muted-foreground">
                You're working offline. Your changes will be saved locally and synced when you're back online.
              </p>
            </div>
          )}

          {isOnline && pendingChanges > 0 && (
            <Button onClick={syncPendingChanges} disabled={isSyncing} className="w-full">
              <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
              {isSyncing ? "Syncing..." : "Sync Now"}
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
