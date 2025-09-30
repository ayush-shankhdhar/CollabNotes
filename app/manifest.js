export default function manifest() {
  return {
    name: "CollabNotes - Collaborative Note Taking",
    short_name: "CollabNotes",
    description: "A modern collaborative notes app with real-time editing and seamless team collaboration",
    start_url: "/app",
    display: "standalone",
    background_color: "#1f1f23",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
