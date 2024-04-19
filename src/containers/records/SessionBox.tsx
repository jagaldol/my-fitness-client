"use client"

import ContentBox from "@/components/ContentBox"
import { convertDateString, convertTimeString, getKoreanDay } from "@/utils/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"

export default function SessionBox({ session }: { session: any }) {
  const date = convertDateString(session.date)

  const [isOpen, setIsOpen] = useState(false)

  return (
    <ContentBox>
      <div className="pt-3 flex items-start">
        <h2 className="text-xl flex-1 font-bold">{`${date.getMonth() + 1}월 ${date.getDate()}일(${getKoreanDay(date.getDay())})`}</h2>
        <button type="button" aria-label="토글 버튼" onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon className={`w-6 h-6 transition-all ${isOpen ? "rotate-180" : ""}`} icon={faAngleDown} />
        </button>
      </div>
      <hr />
      <div className="p-2">
        <p className="text-xs text-end">{`${convertTimeString(session.startTime)} ~ ${convertTimeString(session.endTime)}`}</p>
        {session.records.map((record: any) => (
          <div className="py-2" key={record.id}>
            {isOpen ? (
              <div className="flex flex-col">
                <h3 className="text-base min-w-32 font-bold">{record.sport.name}</h3>
                <div className="grid grid-cols-4 gap-y-2 pt-2 w-2/3 ">
                  {record.sets.map((set: any, idx: number) => (
                    <React.Fragment key={set.id}>
                      <span className="text-text-gray">{`${idx + 1}세트`}</span>
                      <span className="text-end">{`${set.count}${set.countUnit}`}</span>
                      <span className="text-text-gray pl-5">무게</span>
                      <span className="text-end">{`${set.weight}kg`}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-baseline">
                <h3 className="text-base min-w-32">{record.sport.name}</h3>
                <span className="pl-5 text-text-gray">{`${record.sets.length}세트`}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </ContentBox>
  )
}
