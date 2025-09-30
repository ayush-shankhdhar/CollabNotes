import { AppSidebar } from "@/components/app/app-sidebar"
import { AppHeader } from "@/components/app/app-header"

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
