import React, { ReactNode } from "react"
import Navigator from "@/components/nav/Navigator"

export default function MainNavbarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full pb-24 flex flex-col justify-center items-center">
      {children}
      <Navigator />
    </div>
  )
}
