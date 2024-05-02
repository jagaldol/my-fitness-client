import { ReactNode } from "react"

export default function ContentBox({ children }: { children: ReactNode }) {
  return <section className="bg-content-box rounded-md p-2 w-full">{children}</section>
}
