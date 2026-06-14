import type {
  FeedPost,
  ProfileData,
  WorkExperienceItem,
  EducationItem,
  ProjectItem,
  BlogItem,
  SkillItem,
  CareerTab,
} from "./instagram-app.types"
import { portfolioData } from "@/data/portfolio"

// ─── Feed data (timeline tab) ──────────────────────────────────────────────

export const feedPosts: FeedPost[] = [
  {
    id: 1,
    caption: "Building the future, one component at a time. 🚀 #reactjs #frontend #webdev",
    likes: 234,
    comments: 18,
    time: "2h",
    image: "/images/workspace_setup.png",
  },
  {
    id: 2,
    caption: "Late night coding sessions hit different. 🌙💻 Sometimes the best ideas come after midnight. #developerlife",
    likes: 189,
    comments: 12,
    time: "5h",
    image: "/images/project_os_portfolio.png",
  },
  {
    id: 3,
    caption: "Mumbai skyline from my workspace. This city never sleeps, and neither do we. 🌆 #mumbai #startup",
    likes: 312,
    comments: 24,
    time: "1d",
    image: "/images/project_fintech.png",
  },
  {
    id: 4,
    caption: "New project launch! 🎉 Building something that will change how people interact with financial data.",
    likes: 456,
    comments: 32,
    time: "2d",
    image: "/images/project_ml_search.png",
  },
]

// ─── Profile & career data ─────────────────────────────────────────────────

export const profileData: ProfileData = {
  username: "nihir_shah_",
  fullName: portfolioData.personal.name,
  position: portfolioData.personal.title,
  company: portfolioData.experience[0].company,
  bio: "Full-stack developer✨\nReact, Next.js, Node.js 🌐",
  companies: 3,
  education: 2,
  projects: 6,
  instagramUrl: `https://instagram.com/${portfolioData.social.instagram.replace(/^@/, "")}`,
  email: portfolioData.personal.email,
}

export const workExperience: WorkExperienceItem[] = [
  {
    id: 1,
    initials: "KS",
    company: "Kotak Securities",
    position: "Senior Software Engineer",
    duration: "October 2024 - Present",
    description: "Building scalable and performant webpages like Stocks, Indices, Future and options for lakhs of monthly visitors.",

  },
  {
    id: 2,
    initials: "DH",
    company: "DemandHelm",
    position: "Full Stack Developer",
    duration: "March 2021 - September 2024",
    description: "Developed modern web applications for handling different campaigns leveraging React JS, TypeScript, Node JS and AWS",
  },
  {
    id: 3,
    initials: "IN",
    company: "Infosys",
    position: "Systems Engineer",
    duration: "June 2018 - February 2020",
    description: "Developed modern web applications for handling different campaigns leveraging React JS, TypeScript, Node JS and AWS",
  },
]

export const education: EducationItem[] = portfolioData.education.map((e, i) => ({
  id: i + 1,
  initials: e.initials,
  institution: e.institution,
  degree: e.degree,
  duration: e.duration,
  description: e.description,
}))

export const projects: ProjectItem[] = [
  {
    id: 1,
    initials: "CW",
    title: "Custom Wordle",
    description: "A fun guessing game like Wordle but with different categories and hints.",
    tags: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    id: 2,
    initials: "PV",
    title: "Portfolio v1",
    description: "My first developer portfolio, hand-crafted from scratch.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 3,
    initials: "AB",
    title: "Azure VM Telegram Bot",
    description: "Control and manage Azure VM instances remotely with a Python-powered Telegram bot.",
    tags: ["Azure", "Python", "Telegram"],
  },
  {
    id: 4,
    initials: "LS",
    title: "Lok Sabha 2019 Candidate Analysis",
    description: "Exploratory analysis on the personal details of candidates who contested the 2019 Lok Sabha elections.",
    tags: ["Python", "Pandas", "Seaborn"],
  },
  {
    id: 5,
    initials: "TC",
    title: "Top 100 Crypto-Currency",
    description: "Real-time rates of the top 100 cryptocurrencies.",
    tags: ["Vue.js", "Vuex", "Vuetify"],
  },
  {
    id: 6,
    initials: "TQ",
    title: "Time For Quiz",
    description: "A quiz website with a variety of questions and difficulty levels.",
    tags: ["Vue.js", "Bootstrap", "OpenTDB API"],
  },
]

export const blogs: BlogItem[] = [
  {
    id: 1,
    initials: "EC",
    title: "Enhancing React Projects with AWS Cognito",
    description: "A practical walkthrough of integrating AWS Cognito into a React project for authentication.",
    readTime: "2 min read",
  },
  {
    id: 2,
    initials: "UP",
    title: "AWS Cognito User Pool Creation: Step-by-Step Guide",
    description: "A step-by-step guide to creating and configuring a User Pool in AWS Cognito.",
    readTime: "4 min read",
  },
  {
    id: 3,
    initials: "AP",
    title: "AWS Cognito — Advantages, Pricing and Insights",
    description: "An overview of Amazon Cognito, the serverless authentication service, its pricing and advantages.",
    readTime: "4 min read",
  },
  {
    id: 4,
    initials: "MC",
    title: "Microsoft Clarity: A Game Changer for UX Research",
    description: "How Microsoft Clarity, a free analytics tool, transforms UX research and customer experience.",
    readTime: "7 min read",
  },
  {
    id: 5,
    initials: "LS",
    title: "Indian \"Lok Sabha\" Candidate Analysis",
    description: "A data-driven look at the personal details of the candidates in the 2019 Lok Sabha elections.",
    readTime: "10 min read",
  },
  {
    id: 6,
    initials: "AT",
    title: "Managing Azure Instances With Telegram Bot Using Python",
    description: "Send a command to your Telegram bot to control your Azure instances remotely with Python.",
    readTime: "8 min read",
  },
]

export const skills: SkillItem[] = [
  {
    id: 1,
    initials: "FE",
    category: "Frontend",
    items: ["React", "Next.js", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS", "Nginx"],
  },
  {
    id: 2,
    initials: "BE",
    category: "Backend",
    items: ["Node.js", "Express", "MySQL", "REST API", "GraphQL"],
  },
  {
    id: 3,
    initials: "TL",
    category: "Tools",
    items: ["Git", "AWS", "Vercel", "Figma", "VS Code"],
  },
]

export const CAREER_TABS: CareerTab[] = ["work", "education", "projects", "blogs", "skills"]
