"use client"

interface Note {
  id: string
  title: string
  content: any
  updatedAt: Date
  synced: boolean
}

class OfflineStorage {
  private dbName = "collabnotes-offline"
  private version = 1
  private db: IDBDatabase | null = null

  async init() {
    if (typeof window === "undefined") return

    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create notes store
        if (!db.objectStoreNames.contains("notes")) {
          const notesStore = db.createObjectStore("notes", { keyPath: "id" })
          notesStore.createIndex("synced", "synced", { unique: false })
          notesStore.createIndex("updatedAt", "updatedAt", { unique: false })
        }

        // Create pending changes store
        if (!db.objectStoreNames.contains("pendingChanges")) {
          db.createObjectStore("pendingChanges", { keyPath: "id", autoIncrement: true })
        }
      }
    })
  }

  async saveNote(note: Note) {
    if (!this.db) await this.init()

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(["notes"], "readwrite")
      const store = transaction.objectStore("notes")
      const request = store.put(note)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async getNote(id: string): Promise<Note | null> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["notes"], "readonly")
      const store = transaction.objectStore("notes")
      const request = store.get(id)

      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  }

  async getAllNotes(): Promise<Note[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["notes"], "readonly")
      const store = transaction.objectStore("notes")
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async getUnsyncedNotes(): Promise<Note[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["notes"], "readonly")
      const store = transaction.objectStore("notes")
      const index = store.index("synced")
      const request = index.getAll(false)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async deleteNote(id: string) {
    if (!this.db) await this.init()

    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(["notes"], "readwrite")
      const store = transaction.objectStore("notes")
      const request = store.delete(id)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
}

export const offlineStorage = new OfflineStorage()
