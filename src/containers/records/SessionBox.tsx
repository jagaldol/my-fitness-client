import ContentBox from "@/components/ContentBox"
import { getKoreanDay } from "@/utils/utils"
import React, { useState } from "react"
import { MdExpandMore } from "react-icons/md"
import { SessionData } from "@/types/record"
import SessionItem from "@/containers/records/SessionItem"
import moment from "moment"

export default function SessionBox({ session }: { session: SessionData }) {
  const date = moment(session.date, "YYYY-MM-DD")
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ContentBox>
      <div className="pt-3 relative">
        <button
          className={`flex justify-end items-start w-full ${isOpen ? "h-fit" : "h-full"} absolute right-0 top-2`}
          type="button"
          aria-label="토글 버튼"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdExpandMore className={`text-4xl transition-all ${isOpen ? "rotate-180" : ""}`} />
        </button>
        <div className="flex items-center text-xl gap-3 px-5">
          <h2 className="font-bold">{`${date.format("M")}월 ${date.format("D")}일(${getKoreanDay(date.day())})`}</h2>
        </div>
        <div className="p-2">
          <SessionItem session={session} shortView={!isOpen} />
        </div>
      </div>
    </ContentBox>
  )
}
