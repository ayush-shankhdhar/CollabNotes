import { redirect } from "next/navigation"

export default function AppPage() {
  // Redirect to a default note or create new note
  redirect("/app/notes/new")
}
