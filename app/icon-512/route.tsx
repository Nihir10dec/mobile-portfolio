import { renderBrandIcon } from "@/lib/brand-icon"

export const runtime = "edge"

export function GET() {
  return renderBrandIcon(512)
}
