import { SignupForm } from "@/components/auth/signup-form"
import Link from "next/link"
import { FileText } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <FileText className="h-8 w-8 text-primary" />
            <span className="text-2xl font-semibold">CollabNotes</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-muted-foreground">Start collaborating on notes in seconds</p>
        </div>

        <SignupForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
