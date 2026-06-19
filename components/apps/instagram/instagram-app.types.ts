import type { ElementType } from "react"

export interface FeedPost {
  id: number
  caption: string
  likes: number
  comments: number
  time: string
  image: string
}

export interface ProfileData {
  username: string
  fullName: string
  position: string
  company: string
  bio: string
  companies: number
  education: number
  projects: number
  instagramUrl: string
  email: string
}

export interface WorkExperienceItem {
  id: number
  initials: string
  company: string
  position: string
  duration: string
  description: string
}

export interface EducationItem {
  id: number
  initials: string
  institution: string
  degree: string
  duration: string
  description: string
}

export interface ProjectItem {
  id: number
  initials: string
  title: string
  description: string
  tags: string[]
  url?: string;
  logo?: React.ComponentType<{
    size?: number;
  }>;
}

export interface BlogItem {
  id: number
  initials: string
  title: string
  description: string
  readTime: string
  url: string
  logo?: React.ComponentType<{
    size?: number;
  }>;
}

export interface SkillItem {
  id: number
  initials: string
  category: string
  items: string[]
  logo?: React.ComponentType<{
    size?: number;
  }>;
}

export type Tab = "feed" | "work" | "education" | "projects" | "blogs" | "skills"
export type CareerTab = Exclude<Tab, "feed">

export interface CategoryConfig {
  label: string
  gridFrom: string
  gridTo: string
  heroFrom: string
  heroVia: string
  heroTo: string
  accentBg: string
  textAccent: string
  storyFrom: string
  storyTo: string
  Icon: ElementType
}

export type SelectedPost = { post: any; tab: CareerTab } | null
