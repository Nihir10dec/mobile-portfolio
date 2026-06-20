import type React from "react"

export interface Article {
  author: string
  in: string
  title: string
  desc: string
  date: string
  readTime: string
  tags: string[]
  image: string
  url: string
  logo?: React.ComponentType<{ size?: number }>
}

export type MediumTabs = string[]
