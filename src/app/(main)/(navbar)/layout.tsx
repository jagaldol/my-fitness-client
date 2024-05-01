import React, { ReactNode } from "react"
import Navigator from "@/components/nav/Navigator"

export default function MainNavbarLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Navigator />
    </>
  )
}
