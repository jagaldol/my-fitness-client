import React, { ReactNode } from "react"
import RequireAuth from "@/wrappers/RequireAuth"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <main className="w-full flex flex-col items-center">{children}</main>
    </RequireAuth>
  )
}
