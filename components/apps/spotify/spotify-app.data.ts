import type { Playlist, Track } from "./spotify-app.types"
import { portfolioData } from "@/data/portfolio"

export const playlists: Playlist[] = [
  { title: "Deep Focus Code", artist: portfolioData.personal.name, color: "linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)" },
  { title: "Late Night Bugs", artist: "Syntax Error", color: "linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)" },
  { title: "Lo-Fi Beats", artist: "Chill Developer", color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)" },
  { title: "Tech Podcasts", artist: "Various Creators", color: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)" },
]

export const recentTracks: Track[] = [
  { title: "Building the Engine", album: "System Design", duration: "3:42" },
  { title: "TypeScript Blues", album: "Strict Mode", duration: "4:15" },
  { title: "Deploy on Friday", album: "Living Dangerously", duration: "2:58" },
  { title: "Async/Await", album: "Promises", duration: "5:10" },
  { title: "React Context", album: "State Management", duration: "3:30" },
]
