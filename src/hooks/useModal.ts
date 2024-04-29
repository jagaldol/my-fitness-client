import { useSetRecoilState } from "recoil"
import modalState from "@/states/modalState"
import React from "react"
import { ModalData } from "@/types/modal"

export default function useModal() {
  const setModalState = useSetRecoilState(modalState)

  const openModal = (title: string, body: React.ReactNode) => {
    setModalState((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        body,
      },
    ])
  }
  const onCloseModal = () => {
    setModalState((prev: ModalData[]) => {
      return prev.slice(0, prev.length - 1)
    })
  }

  return { openModal, onCloseModal }
}
