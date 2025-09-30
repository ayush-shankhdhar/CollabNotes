import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Users, Zap, Shield, Cloud, History } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">CollabNotes</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          Collaborate on notes in <span className="text-primary">real-time</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          A powerful note-taking app built for teams. Write, organize, and collaborate with your team seamlessly.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8">
              Start for Free
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Everything you need to collaborate</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Users className="h-8 w-8 text-primary" />}
            title="Real-time Collaboration"
            description="See changes instantly as your team edits. Multiple cursors, live updates, and conflict-free editing."
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-primary" />}
            title="Rich Text Editor"
            description="Format text, add images, create tables, and embed links with our powerful editor."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-primary" />}
            title="Lightning Fast"
            description="Optimized for speed with instant search, quick navigation, and smooth performance."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-primary" />}
            title="Secure & Private"
            description="Enterprise-grade security with role-based permissions and encrypted data storage."
          />
          <FeatureCard
            icon={<Cloud className="h-8 w-8 text-primary" />}
            title="Offline Support"
            description="Work offline and sync automatically when you're back online. Never lose your work."
          />
          <FeatureCard
            icon={<History className="h-8 w-8 text-primary" />}
            title="Version History"
            description="Track every change with complete version history. Restore any previous version instantly."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 CollabNotes. Built with v0.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
