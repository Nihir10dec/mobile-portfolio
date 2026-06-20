import type React from "react"

export type ProfileKey = "recruiter" | "developer" | "collaborator" | "explorer"

export interface Profile {
  key: ProfileKey
  label: string
  primary: string
  tagline: string
}

export interface CardItem {
  id: string
  title: string
  subtitle: string
  body: string
  tags?: string[]
  progress?: number
  gradient: string
  bgImage?: string
  ctaLabel?: string
  ctaUrl?: string
  logo?: React.ComponentType<{ size?: number }>
}

export interface Row {
  id: string
  label: string
  items: CardItem[]
  variant: "continue" | "tall" | "wide"
}
