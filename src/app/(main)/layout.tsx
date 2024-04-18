import React, { ReactNode } from "react"
import RequireAuth from "@/components/RequireAuth"
import Navigator from "@/components/Navigator"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      {children}
      <Navigator />
      dfafd
    </RequireAuth>
  )
}
