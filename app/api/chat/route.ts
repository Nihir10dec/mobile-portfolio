import { NextResponse } from "next/server"
import { generateReply } from "@/lib/chat-engine"

// Use the Node runtime (not edge) — this is a showcase of server-side logic.
export const runtime = "nodejs"

export async function POST(request: Request) {
  let message = ""
  try {
    const body = await request.json()
    message = typeof body?.message === "string" ? body.message : ""
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  if (!message.trim()) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 })
  }
  if (message.length > 500) {
    message = message.slice(0, 500)
  }

  const { intent, reply } = generateReply(message)
  return NextResponse.json({ intent, reply })
}
