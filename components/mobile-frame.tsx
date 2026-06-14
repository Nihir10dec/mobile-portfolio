import type React from "react"

interface MobileFrameProps {
  children: React.ReactNode
}

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-14 rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
      <div className="w-[100px] h-[18px] bg-gray-800 top-0 rounded-b-2xl left-1/2 -translate-x-1/2 absolute"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute left-[-17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute left-[-17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute right-[-17px] top-[142px] rounded-r-lg"></div>
      <div className="rounded-4xl overflow-hidden w-full h-full bg-linear-to-b from-blue-500 to-purple-600">{children}</div>
    </div>
  )
}
