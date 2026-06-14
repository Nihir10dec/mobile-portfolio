"use client"

import { useCallback } from "react"
import { haptic } from "@/lib/haptics"

interface AppIconProps {
  id: string
  label: string
  bgColor?: string
  bgGradient?: string
  icon: React.ReactNode
  badge?: number
  onPress?: () => void
}

export default function AppIcon({ id, label, bgColor, bgGradient, icon, badge, onPress }: AppIconProps) {
  const handleClick = useCallback(() => {
    haptic(8)
    onPress?.()
  }, [onPress])

  return (
    <button
      onClick={handleClick}
      aria-label={label || id}
      className="flex flex-col items-center gap-[5px] group"
      style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
    >
      <div className="relative">
        {/* Icon container */}
        <div
          className="w-[60px] h-[60px] rounded-[14px] flex items-center justify-center
                     transition-transform duration-150 active:scale-[0.88]
                     shadow-[0_2px_8px_rgba(0,0,0,0.3)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
          style={{
            background: bgGradient || bgColor || "#333",
          }}
        >
          {icon}
        </div>

        {/* Badge */}
        {badge && badge > 0 && (
          <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-[5px] rounded-full bg-[#FF3B30] flex items-center justify-center">
            <span className="text-white text-[11px] font-bold leading-none">
              {badge > 99 ? "99+" : badge}
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      <span className="text-[11px] font-medium leading-tight text-center max-w-[68px] truncate text-(--on-surface)"
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
      >
        {label}
      </span>
    </button>
  )
}
