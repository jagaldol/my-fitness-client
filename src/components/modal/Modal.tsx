"use client"

import React from "react"
import { MdClose } from "react-icons/md"
import { ModalData } from "@/types/modal"
import useModal from "@/hooks/useModal"

interface Props {
  modalData: ModalData
  zIndex: number
}

function Modal({ modalData, zIndex = 100 }: Props) {
  const { onCloseModal } = useModal()
  return (
    <div
      style={{ zIndex }}
      className="fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-black/30"
    >
      <div className="bg-content-box border border-text-gray/10 rounded-2xl shadow-2xl p-3">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-lg font-GmarketSansMedium mr-7">{modalData.title}</h2>
          <button
            type="button"
            className="hover:brightness-75 transition-all text-2xl font-bold rounded-full"
            onClick={() => onCloseModal()}
            aria-label="Modal Close"
          >
            <MdClose />
          </button>
        </div>
        <hr />
        <section className="px-2 py-5">{modalData.body}</section>
      </div>
    </div>
  )
}

export default Modal
