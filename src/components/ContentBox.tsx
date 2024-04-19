import { ReactNode } from "react"

export default function ContentBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-content-box">
      <h2>{title}</h2>
      <hr />
      {children}
    </section>
  )
}
