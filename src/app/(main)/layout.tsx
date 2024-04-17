import { ReactNode } from "react"
import RequireAuth from "@/components/RequireAuth"

export default function MainLayout({ children }: { children: ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>
}
