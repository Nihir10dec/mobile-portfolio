export function ReactLogoSVG({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="-12 -10.5 24 21" width={size} height={size} fill="none">
      <circle r="2.2" fill="rgba(255,255,255,0.95)" />
      <g stroke="rgba(255,255,255,0.88)" strokeWidth="1.1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}

export function BackendLogoSVG({ size = 28 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 256 296"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer hexagon */}
      <path
        d="M128 0L239 64V192L128 256L17 192V64L128 0Z"
        stroke="rgba(255,255,255,0.92)"
        strokeWidth="18"
        strokeLinejoin="round"
      />

      {/* Stylized N */}
      <path
        d="M82 186V84L174 172V70"
        stroke="rgba(255,255,255,0.96)"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function GitBranchLogoSVG({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 72" width={size} height={size} fill="none">
      <circle cx="16" cy="12" r="7" stroke="rgba(255,255,255,0.9)" strokeWidth="4" />
      <circle cx="16" cy="60" r="7" stroke="rgba(255,255,255,0.9)" strokeWidth="4" />
      <circle cx="48" cy="24" r="7" stroke="rgba(255,255,255,0.9)" strokeWidth="4" />
      <line x1="16" y1="19" x2="16" y2="53" stroke="rgba(255,255,255,0.9)" strokeWidth="4" strokeLinecap="round" />
      <path d="M 16 30 Q 16 24 41 24" stroke="rgba(255,255,255,0.9)" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function AwsLogoSVG({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <g
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 15H17C19.2 15 21 13.2 21 11C21 8.8 19.2 7 17 7C16.4 4.7 14.4 3 12 3C9.2 3 7 5.2 7 8C4.8 8 3 9.8 3 12C3 13.7 4.3 15 6 15H7Z" />
        <path d="M7 18C10 20 14 20 17 18" />
      </g>
    </svg>
  )
}

export function CognitoLogoSVG({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <g
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="7" r="3" />
        <path d="M6.5 20C7.5 16.5 10 15 12 15C14 15 16.5 16.5 17.5 20" />
        <circle cx="18" cy="8" r="2.2" />
        <path d="M16.5 14L18 15.5L21 12.5" />
      </g>
    </svg>
  )
}

export function ClarityLogoSVG({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <g
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="7" />
        <path d="M12 12L16 8" />
        <circle
          cx="12"
          cy="12"
          r="1.4"
          fill="rgba(255,255,255,0.95)"
          stroke="none"
        />
        <path d="M12 5V3" />
      </g>
    </svg>
  )
}

export function AzureLogoSVG({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <g
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 4L6 20" />
        <path d="M12 4L18 20" />
        <path d="M8.5 13H15.5" />
      </g>
    </svg>
  )
};

export function WordleLogoSVG({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <g
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="3" height="3" rx="0.4" />
        <rect x="7.5" y="5" width="3" height="3" rx="0.4" />
        <rect x="12" y="5" width="3" height="3" rx="0.4" />
        <rect x="16.5" y="5" width="3" height="3" rx="0.4" />

        <rect
          x="3"
          y="10"
          width="3"
          height="3"
          rx="0.4"
          fill="rgba(255,255,255,0.9)"
          stroke="none"
        />

        <rect x="7.5" y="10" width="3" height="3" rx="0.4" />
        <rect x="12" y="10" width="3" height="3" rx="0.4" />
        <rect x="16.5" y="10" width="3" height="3" rx="0.4" />

        <rect x="3" y="15" width="3" height="3" rx="0.4" />
        <rect x="7.5" y="15" width="3" height="3" rx="0.4" />
        <rect x="12" y="15" width="3" height="3" rx="0.4" />
        <rect x="16.5" y="15" width="3" height="3" rx="0.4" />
      </g>
    </svg>
  )
};

