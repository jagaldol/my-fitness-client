import React from "react"
import AddSessionForm from "@/containers/records/AddSessionForm"
import Modal from "@/components/modal/Modal"

export default function AddSessionModal() {
  return (
    <Modal title="기록 추가하기" zIndex={100}>
      <AddSessionForm />
    </Modal>
  )
}
