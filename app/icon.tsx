import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px',
          border: '2px solid #333'
        }}
      >
        <div style={{
          width: '14px',
          height: '20px',
          border: '2px solid white',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2px'
        }}>
          <div style={{ width: '6px', height: '2px', background: 'white', borderRadius: '10px' }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
