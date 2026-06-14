import type { ExperienceItem } from "./linkedin-app.types"
import { portfolioData } from "@/data/portfolio"

export const experience: ExperienceItem[] = [
  {
    company: "Kotak Securities",
    role: "Senior Software Engineer",
    duration: "October 2024 - Present",
    logo: "🏦",
    description: "Building scalable and performant webpages like Stocks, Indices, Future and options for lakhs of monthly visitors.",
  },
  {
    company: "DemandHelm",
    role: "Full Stack Developer",
    duration: "March 2021 - September 2024",
    logo: "🚀",
    description: "Developed modern web applications for handling different campaigns leveraging React JS, TypeScript, Node JS and AWS",
  },
  {
    company: "Infosys",
    role: "Systems Engineer",
    duration: "June 2018 - February 2020",
    logo: "💻",
    description: "Developed modern web applications for handling different campaigns leveraging React JS, TypeScript, Node JS and AWS",
  },
]

export const skills: string[] = [...portfolioData.skills]
