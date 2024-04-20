"use client"

import { useRecoilValue } from "recoil"
import modalState from "@/states/modalState"
import { ModalData } from "@/types/modal"
import Modal from "@/components/modal/Modal"

function ModalList() {
  const modalList = useRecoilValue(modalState)

  return modalList.map((item: ModalData, idx) => <Modal key={item.id} modalData={item} zIndex={idx + 100} />)
}

export default ModalList
