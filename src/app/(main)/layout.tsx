import React, { ReactNode } from "react"
import RequireAuth from "@/providers/RequireAuth"
import Navigator from "@/components/nav/Navigator"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      {children}
      <Navigator />
    </RequireAuth>
  )
}
