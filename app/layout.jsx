import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

export const metadata = {
  title: "CollabNotes - Real-time Collaborative Note Taking",
  description:
    "A modern collaborative notes app with real-time editing, rich text support, and seamless team collaboration",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
