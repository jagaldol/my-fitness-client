import React, { ReactNode } from "react"
import RequireAuth from "@/providers/RequireAuth"
import Navigator from "@/components/nav/Navigator"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <main className="pt-5 pb-24 w-full flex flex-col justify-center items-center">{children}</main>
      <Navigator />
    </RequireAuth>
  )
}
