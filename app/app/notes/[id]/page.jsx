import { NoteEditor } from "@/components/notes/note-editor"

export default function NotePage({ params }) {
  return <NoteEditor noteId={params.id} />
}
