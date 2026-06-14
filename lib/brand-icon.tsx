import { ImageResponse } from "next/og"

/**
 * Shared renderer for the app's maskable phone icon, used by the PWA manifest
 * icon routes and the apple-touch-icon. Keeps a single visual source of truth.
 */
export function renderBrandIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #14233f 0%, #000 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: `${size * 0.42}px`,
            height: `${size * 0.62}px`,
            border: `${Math.max(2, size * 0.03)}px solid #fff`,
            borderRadius: `${size * 0.12}px`,
            background: "linear-gradient(160deg, #0d1b33 0%, #05060a 100%)",
          }}
        >
          <div
            style={{
              width: `${size * 0.16}px`,
              height: `${size * 0.16}px`,
              borderRadius: "50%",
              background: "#007AFF",
            }}
          />
        </div>
      </div>
    ),
    { width: size, height: size },
  )
}
