import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
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
            alignItems: "center",
            justifyContent: "center",
            width: "76px",
            height: "112px",
            border: "5px solid #fff",
            borderRadius: "22px",
            background: "linear-gradient(160deg, #0d1b33 0%, #05060a 100%)",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "#007AFF",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  )
}
