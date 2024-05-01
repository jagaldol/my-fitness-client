import React, { ReactNode } from "react"

export default function LimitedWidthLayout({ children }: { children: ReactNode }) {
  return <div className="lg:w-[1000px] w-full align-middle px-3">{children}</div>
}
