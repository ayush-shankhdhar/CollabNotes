import { ActivityFeed } from "@/components/activity/activity-feed"

export default function ActivityPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Activity Feed</h1>
      <p className="text-muted-foreground mb-8">See what's happening across your notes and notebooks</p>
      <ActivityFeed />
    </div>
  )
}
