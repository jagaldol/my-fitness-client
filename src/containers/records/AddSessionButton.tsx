"use client"

import { MdOutlineAddBox } from "react-icons/md"
import useModal from "@/hooks/useModal"
import AddSessionForm from "@/containers/records/AddSessionForm"
import { useRecoilValue } from "recoil"
import selectedDateState from "@/states/selectedDateState"

export default function AddSessionButton({ otherDate = false }: { otherDate?: boolean }) {
  const { openModal } = useModal()
  const selectedDate = useRecoilValue(selectedDateState)
  return (
    <button
      type="button"
      className="p-2 flex gap-1 items-center"
      onClick={() => openModal("기록 추가하기", <AddSessionForm defaultDate={otherDate ? selectedDate : new Date()} />)}
    >
      <span className="font-GmarketSansMedium pt-0.5">추가하기</span>
      <MdOutlineAddBox className="text-xl" />
    </button>
  )
}
