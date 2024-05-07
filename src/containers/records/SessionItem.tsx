import { convertTimeString } from "@/utils/utils"
import React from "react"
import { MdDelete, MdEdit } from "react-icons/md"
import { Record, SessionData, SetData } from "@/types/record"
import Link from "next/link"
import axiosInstance from "@/utils/axiosInstance"
import useToast from "@/hooks/useToast"
import { useRecoilValue } from "recoil"
import selectedDateState from "@/states/selectedDateState"
import moment from "moment"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function SessionItem({ session, shortView = false }: { session: SessionData; shortView?: boolean }) {
  const { addSuccessToast } = useToast()

  const date = useRecoilValue(selectedDateState)
  const sessionParam = { date: moment(date).format("YYYY-MM-DD") }
  const sessionDateParam = { month: moment(date).format("YYYY-MM") }

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => axiosInstance.delete(`/sessions/${session.id}`),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["/sessions", sessionParam] }).then()
      queryClient.refetchQueries({ queryKey: ["/sessions/dates", sessionDateParam] }).then()
      addSuccessToast("삭제되었습니다.")
    },
  })

  return (
    <>
      <hr />
      <div className="p-2">
        <div className="flex items-center justify-end text-xl gap-3">
          <p className="text-sm text-end">{`${convertTimeString(session.startTime)} ~ ${convertTimeString(session.endTime)}`}</p>
          {!shortView && (
            <>
              <Link className="text-main-theme z-10" href={`/update-record?id=${session.id}`}>
                <MdEdit />
              </Link>
              <button
                className="text-main-theme z-10"
                type="button"
                aria-label="삭제"
                onClick={() => {
                  if (confirm("정말 삭제하시겠습니까?")) mutate()
                }}
              >
                <MdDelete />
              </button>
            </>
          )}
        </div>
        <div className="flex flex-col items-center">
          {session.records.map((record: Record) => (
            <div className="py-2 w-full md:w-5/6" key={record.id}>
              <div className={`flex ${shortView ? "items-baseline" : "flex-col"}`}>
                <h3 className="text-lg min-w-32">{record.sport.name}</h3>
                {shortView ? (
                  <span className="pl-5 text-text-gray">{`${record.sets.length}세트`}</span>
                ) : (
                  <div className="grid grid-cols-[minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_3fr)_minmax(0,_2fr)] gap-y-2 pt-2">
                    {record.sets.map((set: SetData, idx: number) => (
                      <React.Fragment key={set.id}>
                        <span className="text-text-gray">{`${idx + 1}세트`}</span>
                        <span className="text-end">{`${set.count}${set.countUnit}`}</span>
                        <span className="text-text-gray text-center">무게</span>
                        <span className="text-end">{`${set.weight}kg`}</span>
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
