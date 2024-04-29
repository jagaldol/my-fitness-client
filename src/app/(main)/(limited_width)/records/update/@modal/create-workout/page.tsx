"use client"

import React from "react"
import Modal from "@/components/modal/Modal"
import { usePathname } from "next/navigation"
import AddRecordForm from "@/containers/records/update/AddRecordForm"

export default function AddRecordModal() {
  const pathname = usePathname()

  return pathname.includes("create-workout") ? (
    <Modal title="운동 추가하기" zIndex={100}>
      <AddRecordForm />
    </Modal>
  ) : null
}
