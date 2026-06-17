import { ImageResponse } from "next/og"
import { portfolioData } from "@/data/portfolio"

export const runtime = "edge"
export const alt = "Nihir Mobile portfolio — a portfolio that behaves like a phone"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px 96px",
          background:
            "radial-gradient(120% 120% at 80% 10%, #14233f 0%, #0a0a0c 55%, #000 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left: text */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "640px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 24,
              color: "#007AFF",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Nihir Mobile Portfolio
          </div>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.05,
              marginTop: "20px",
            }}
          >
            {portfolioData.personal.name}
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, color: "#cfd6e4", marginTop: "16px" }}>
            {portfolioData.personal.title}
          </div>
          <div style={{ fontSize: 28, color: "#8b93a7", marginTop: "28px", lineHeight: 1.4 }}>
            What if your portfolio wasn&apos;t a website — it was a device?
          </div>
        </div>

        {/* Right: phone mockup */}
        <div
          style={{
            display: "flex",
            width: "300px",
            height: "470px",
            borderRadius: "44px",
            border: "3px solid #2a2a2a",
            background: "#1a1a1a",
            padding: "10px",
            boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              borderRadius: "36px",
              background: "linear-gradient(160deg, #0d1b33 0%, #05060a 100%)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "16px",
                width: "100px",
                height: "26px",
                borderRadius: "20px",
                background: "#000",
              }}
            />
            <div style={{ fontSize: 64, fontWeight: 700, color: "#fff" }}>09:41</div>
            <div style={{ fontSize: 20, color: "#9aa3b8", marginTop: "6px" }}>
              {portfolioData.personal.location}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
