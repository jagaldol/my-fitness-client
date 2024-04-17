import React from "react"
import "@/styles/globals.css"
import RecoilRootWrapper from "@/components/RecoilRootWrapper"

export const metadata = {
  title: "Fitness | Behind",
  description: "당신만을 위한 비하인드 운동 관리 프로젝트",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <RecoilRootWrapper>
        <body>{children}</body>
      </RecoilRootWrapper>
    </html>
  )
}
