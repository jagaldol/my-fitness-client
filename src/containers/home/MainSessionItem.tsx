import { convertTimeString } from "@/utils/utils"
import React from "react"
import { MdDelete, MdEdit } from "react-icons/md"
import { Record, SessionData, SetData } from "@/types/record"
import Link from "next/link"
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient"
import axiosInstance from "@/utils/axiosInstance"
import useToast from "@/hooks/useToast"
import { useRecoilValue } from "recoil"
import selectedDateState from "@/states/selectedDateState"
import moment from "moment"

export default function MainSessionItem({ session }: { session: SessionData }) {
  const { addSuccessToast } = useToast()

  const date = useRecoilValue(selectedDateState)
  const param = { date: moment(date).format("YYYY-MM-DD") }

  const { mutate, queryClient } = useMutateWithQueryClient(() => axiosInstance.delete(`/sessions/${session.id}`))

  return (
    <>
      <hr />
      <div className="p-5">
        <div className="flex items-center justify-end text-xl gap-3">
          <p className="text-sm text-end">{`${convertTimeString(session.startTime)} ~ ${convertTimeString(session.endTime)}`}</p>
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
                    queryClient.refetchQueries({ queryKey: ["/sessions", param] }).then()
                    addSuccessToast("삭제되었습니다.")
                  },
                })
              }
            }}
          >
            <MdDelete />
          </button>
        </div>
        {session.records.map((record: Record) => (
          <div className="py-2" key={record.id}>
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
          </div>
        ))}
      </div>
    </>
  )
}
