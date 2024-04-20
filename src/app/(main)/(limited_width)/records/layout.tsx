import React, { ReactNode } from "react"

export default function RecordPageLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
