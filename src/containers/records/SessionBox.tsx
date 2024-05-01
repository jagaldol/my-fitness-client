"use client"

import ContentBox from "@/components/ContentBox"
import { convertDateString, convertTimeString, getKoreanDay } from "@/utils/utils"
import React, { useState } from "react"
import { MdDelete, MdEdit, MdExpandMore } from "react-icons/md"
import { Record, SessionData, SetData } from "@/types/record"
import Link from "next/link"
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient"
import axiosInstance from "@/utils/axiosInstance"
import useToast from "@/hooks/useToast"

export default function SessionBox({ session }: { session: SessionData }) {
  const date = convertDateString(session.date)

  const [isOpen, setIsOpen] = useState(false)
  const { addSuccessToast } = useToast()

  const { mutate, queryClient } = useMutateWithQueryClient(() => axiosInstance.delete(`/sessions/${session.id}`))

  return (
    <ContentBox>
      <div className="pt-3 relative">
        <button
          className={`flex justify-end items-start w-full ${isOpen ? "h-fit" : "h-full"} absolute right-0 top-0`}
          type="button"
          aria-label="토글 버튼"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdExpandMore className={`text-4xl transition-all ${isOpen ? "rotate-180" : ""}`} />
        </button>
        <div className="flex items-center text-xl gap-3">
          <h2 className="font-bold">{`${date.getMonth() + 1}월 ${date.getDate()}일(${getKoreanDay(date.getDay())})`}</h2>
          {isOpen && (
            <>
              <Link className="text-main-theme z-10" href={`/update-record?id=${session.id}`}>
                <MdEdit />
              </Link>
              <button
                className="text-main-theme z-10"
                type="button"
                aria-label="삭제"
                onClick={() => {
                  if (confirm("정말 삭제하시겠습니까?")) {
                    mutate(null, {
                      onSuccess: () => {
                        queryClient.refetchQueries({ queryKey: ["/sessions"] }).then()
                        addSuccessToast("삭제되었습니다.")
                      },
                    })
                  }
                }}
              >
                <MdDelete />
              </button>
            </>
          )}
        </div>
        <hr />
        <div className="p-2">
          <p className="text-sm text-end">{`${convertTimeString(session.startTime)} ~ ${convertTimeString(session.endTime)}`}</p>
          {session.records.map((record: Record) => (
            <div className="py-2" key={record.id}>
              {isOpen ? (
                <div className="flex flex-col">
                  <h3 className="text-lg min-w-32">{record.sport.name}</h3>
                  <div className="grid grid-cols-[minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_3fr)_minmax(0,_2fr)] gap-y-2 pt-2 md:w-2/3">
                    {record.sets.map((set: SetData, idx: number) => (
                      <React.Fragment key={set.id}>
                        <span className="text-text-gray">{`${idx + 1}세트`}</span>
                        <span className="text-end">{`${set.count}${set.countUnit}`}</span>
                        <span className="text-text-gray text-center">무게</span>
                        <span className="text-end">{`${set.weight}kg`}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-baseline">
                  <h3 className="text-lg min-w-32">{record.sport.name}</h3>
                  <span className="pl-5 text-text-gray">{`${record.sets.length}세트`}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ContentBox>
  )
}
