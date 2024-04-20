import { useSetRecoilState } from "recoil"
import modalState from "@/states/modalState"
import React from "react"

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

  return { openModal }
}
