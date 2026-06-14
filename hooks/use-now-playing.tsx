"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface NowPlaying {
  track: string
  artist: string
  /** CSS color/gradient used as the pill artwork swatch. */
  artwork: string
}

interface NowPlayingContextType {
  nowPlaying: NowPlaying | null
  setNowPlaying: (np: NowPlaying | null) => void
  clearNowPlaying: () => void
}

const NowPlayingContext = createContext<NowPlayingContextType | null>(null)

export function NowPlayingProvider({ children }: { children: ReactNode }) {
  const [nowPlaying, setNowPlayingState] = useState<NowPlaying | null>(null)

  const setNowPlaying = useCallback((np: NowPlaying | null) => setNowPlayingState(np), [])
  const clearNowPlaying = useCallback(() => setNowPlayingState(null), [])

  return (
    <NowPlayingContext.Provider value={{ nowPlaying, setNowPlaying, clearNowPlaying }}>
      {children}
    </NowPlayingContext.Provider>
  )
}

export function useNowPlaying() {
  const ctx = useContext(NowPlayingContext)
  if (!ctx) throw new Error("useNowPlaying must be used within NowPlayingProvider")
  return ctx
}
