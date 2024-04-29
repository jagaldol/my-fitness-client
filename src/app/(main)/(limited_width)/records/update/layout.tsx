import React, { ReactNode } from "react"

export default function RecordUpdatePageLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
