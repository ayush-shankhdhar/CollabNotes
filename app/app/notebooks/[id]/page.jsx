import { NotebookView } from "@/components/notebooks/notebook-view"

export default function NotebookPage({ params }) {
  return <NotebookView notebookId={params.id} />
}
