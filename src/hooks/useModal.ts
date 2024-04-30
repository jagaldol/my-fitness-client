import { useSetRecoilState } from "recoil"
import modalState from "@/states/modalState"
import React from "react"
import { useRouter } from "next/navigation"
import { ModalData } from "@/types/modal"

export default function useModal() {
  const setModalList = useSetRecoilState(modalState)
  const router = useRouter()

  const openModal = (title: string, body: React.ReactNode) => {
    setModalList((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        body,
      },
    ])
    history.pushState(null, "")
  }
  const onCloseModal = (href?: string) => {
    if (href) {
      router.replace(href, { scroll: false })
      setModalList((prev: ModalData[]) => {
        return prev.slice(0, prev.length - 1)
      })
    } else router.back()
  }

  return { openModal, onCloseModal }
}
