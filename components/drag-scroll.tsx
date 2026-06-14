"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * DragScroll — desktop "grab to scroll" for the phone screen.
 *
 * On a desktop (mouse) the user can click-and-drag *inside* the phone screen to
 * scroll the content under the pointer, simulating a touch flick. It:
 *   - only activates inside the screen area (`[data-phone-screen]`),
 *   - auto-detects the scroll axis of the element under the cursor,
 *   - has a small movement threshold so taps/clicks on buttons still work,
 *   - applies momentum (inertia) on release,
 *   - suppresses the click that would otherwise fire after a drag,
 *   - leaves the native mouse wheel and touch scrolling untouched,
 *   - is disabled while the phone is locked.
 */
export default function DragScroll({
  children,
  disabled = false,
}: {
  children: ReactNode
  disabled?: boolean
}) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const THRESHOLD = 6 // px before a press becomes a drag

    let target: HTMLElement | null = null
    let axis: "x" | "y" | null = null
    let startX = 0
    let startY = 0
    let lastX = 0
    let lastY = 0
    let lastT = 0
    let velocity = 0
    let dragging = false
    let pressed = false
    let momentumId = 0

    const isScrollable = (el: HTMLElement, ax: "x" | "y") => {
      const style = getComputedStyle(el)
      const overflow = ax === "y" ? style.overflowY : style.overflowX
      if (!/(auto|scroll)/.test(overflow)) return false
      return ax === "y"
        ? el.scrollHeight > el.clientHeight + 1
        : el.scrollWidth > el.clientWidth + 1
    }

    // Walk up from the pressed node to find the nearest scrollable ancestor.
    const findScrollable = (node: HTMLElement): { el: HTMLElement; ax: "x" | "y" } | null => {
      let el: HTMLElement | null = node
      while (el && el !== root.parentElement) {
        if (isScrollable(el, "y")) return { el, ax: "y" }
        if (isScrollable(el, "x")) return { el, ax: "x" }
        el = el.parentElement
      }
      return null
    }

    const onMouseDown = (e: MouseEvent) => {
      if (disabled || e.button !== 0) return
      const node = e.target as HTMLElement
      // Only inside the phone screen, never on the bezel.
      if (!node.closest("[data-phone-screen]")) return
      const found = findScrollable(node)
      if (!found) return

      cancelAnimationFrame(momentumId)
      target = found.el
      axis = found.ax
      pressed = true
      dragging = false
      startX = lastX = e.clientX
      startY = lastY = e.clientY
      lastT = performance.now()
      velocity = 0
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!pressed || !target || !axis) return
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      if (!dragging) {
        const moved = axis === "y" ? Math.abs(dy) : Math.abs(dx)
        if (moved < THRESHOLD) return
        dragging = true
        document.body.style.userSelect = "none"
        root.style.cursor = "grabbing"
      }

      e.preventDefault()
      const now = performance.now()
      const dt = now - lastT || 16
      if (axis === "y") {
        const delta = e.clientY - lastY
        target.scrollTop -= delta
        velocity = -delta / dt
      } else {
        const delta = e.clientX - lastX
        target.scrollLeft -= delta
        velocity = -delta / dt
      }
      lastX = e.clientX
      lastY = e.clientY
      lastT = now
    }

    const applyMomentum = () => {
      if (!target || !axis) return
      const friction = 0.94
      const step = () => {
        if (!target || !axis) return
        velocity *= friction
        const move = velocity * 16
        if (Math.abs(velocity) < 0.02) return
        if (axis === "y") target.scrollTop += move
        else target.scrollLeft += move
        momentumId = requestAnimationFrame(step)
      }
      momentumId = requestAnimationFrame(step)
    }

    const onMouseUp = () => {
      if (!pressed) return
      pressed = false
      document.body.style.userSelect = ""
      root.style.cursor = ""
      if (dragging) {
        applyMomentum()
        // Swallow the click that follows a drag so buttons don't fire.
        const swallow = (ev: MouseEvent) => {
          ev.stopPropagation()
          ev.preventDefault()
        }
        root.addEventListener("click", swallow, { capture: true, once: true })
      }
      dragging = false
      target = null
      axis = null
    }

    root.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mousemove", onMouseMove, { passive: false })
    window.addEventListener("mouseup", onMouseUp)

    return () => {
      cancelAnimationFrame(momentumId)
      root.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      document.body.style.userSelect = ""
    }
  }, [disabled])

  return (
    <div ref={rootRef} className="p-3">
      {children}
    </div>
  )
}
