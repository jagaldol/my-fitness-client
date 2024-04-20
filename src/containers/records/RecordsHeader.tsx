"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons"
import useModal from "@/hooks/useModal"
import AddSessionForm from "@/containers/records/AddSessionForm"

export default function RecordsHeader() {
  const { openModal } = useModal()
  return (
    <header className="fixed top-0 left-0 w-full h-14 flex justify-center py-3 max-md:px-0 bg-background/70 backdrop-blur z-10">
      <div className="w-[1000px] h-full flex items-center justify-end px-10 max-md:px-0">
        <button
          type="button"
          className="p-2 flex items-center"
          onClick={() => openModal("기록 추가하기", <AddSessionForm />)}
        >
          <span className="font-GmarketSansMedium pt-0.5">추가하기</span>
          <FontAwesomeIcon className="w-4 h-4 px-2" icon={faSquarePlus} />
        </button>
      </div>
    </header>
  )
}
