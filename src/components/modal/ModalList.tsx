"use client"

import { useRecoilState } from "recoil"
import modalState from "@/states/modalState"
import { ModalData } from "@/types/modal"
import Modal from "@/components/modal/Modal"
import { useEffect } from "react"

function ModalList() {
  const [modalList, setModalList] = useRecoilState(modalState)

  useEffect(() => {
    const popModal = () => {
      setModalList((prev: ModalData[]) => {
        return prev.slice(0, prev.length - 1)
      })
    }
    window.addEventListener("popstate", popModal)
    return () => window.removeEventListener("popstate", popModal)
  }, [setModalList])

  return modalList.map((item: ModalData, idx) => <Modal key={item.id} zIndex={idx + 100} modalData={item} />)
}

export default ModalList
