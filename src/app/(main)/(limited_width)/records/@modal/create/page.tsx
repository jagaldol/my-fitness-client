"use client"

import React from "react"
import AddSessionForm from "@/containers/records/AddSessionForm"
import Modal from "@/components/modal/Modal"
import { usePathname } from "next/navigation"

export default function AddSessionModal() {
  const pathname = usePathname()

  return pathname.includes("create") ? (
    <Modal title="기록 추가하기" zIndex={100}>
      <AddSessionForm />
    </Modal>
  ) : null
}
