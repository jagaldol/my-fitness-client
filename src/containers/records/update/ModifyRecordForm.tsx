"use client"

import axiosInstance from "@/utils/axiosInstance"
import React, { useEffect, useState } from "react"
import useToast from "@/hooks/useToast"
import WorkoutSelector from "@/components/WorkoutSelector"
import { MdAddCircle, MdDelete, MdEdit } from "react-icons/md"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useSportsQuery from "@/hooks/useSportsQuery"
import EditSport from "@/components/sports/EditSport"
import useErrorResponseHandler from "@/hooks/useErrorResponseHandler"

export default function ModifyRecordForm({ currentId, onSubmitMutate }: { currentId: number; onSubmitMutate: any }) {
  const { addSuccessToast } = useToast()
  const queryClient = useQueryClient()
  const errorHandler = useErrorResponseHandler()

  const { data: sports, isFetched } = useSportsQuery()

  const [sportId, setSportId] = useState(currentId)
  const [sportName, setSportName] = useState("")
  const [editOpen, setEditOpen] = useState(false)

  const { mutate: postSportMutate } = useMutation({
    mutationFn: (data: any) => axiosInstance.post("/sports", data),
    onSuccess: (res) => {
      queryClient.refetchQueries({ queryKey: ["/sports"] }).then()
      setSportId(res.data.response.id)
    },
    onError: (err) => errorHandler(err, "DUPLICATED_DATA", "이미 존재하는 이름입니다."),
  })
  const { mutate: deleteSportMutate } = useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/sports/${id}`),
    onSuccess: () => {
      setSportId(-1)
      queryClient.refetchQueries({ queryKey: ["/sports"] }).then()
      addSuccessToast("삭제되었습니다.")
    },
    onError: (err) => errorHandler(err, "REFERENCED_DATA_EXISTS", "사용 중인 데이터입니다."),
  })

  useEffect(() => {
    if (isFetched && sportId > 0) {
      setSportName(sports.filter((item: any) => item.id === sportId)[0]?.name)
    }
    setEditOpen(false)
  }, [sportId, sports, isFetched])

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmitMutate({ sportId })
      }}
    >
      <div className="flex flex-col gap-4 min-w-[280px]">
        <div className="flex items-center">
          <span className="w-20">선택</span>
          <WorkoutSelector id={sportId} setId={setSportId} />
        </div>
        {sportId === 0 && (
          <div className="flex items-center">
            <span className="min-w-20">직접입력</span>
            <div className="flex items-center justify-between flex-1">
              <input
                className="bg-input-box h-9 p-2 rounded-md w-40"
                onChange={(e) => {
                  if (e.target.value.length <= 20) {
                    setSportName(e.target.value)
                  }
                }}
              />
              <button
                type="button"
                aria-label="추가"
                onClick={() => {
                  if (sportName && sportName !== "") {
                    postSportMutate({ name: sportName })
                  }
                }}
              >
                <MdAddCircle className="text-3xl text-main-theme" />
              </button>
            </div>
          </div>
        )}
        {sportId > 0 &&
          (editOpen ? (
            <div className="flex items-center">
              <span className="w-20">이름변경</span>
              <EditSport sportId={sportId} />
            </div>
          ) : (
            <div className="flex justify-around">
              <button
                type="button"
                onClick={() => setEditOpen(true)}
                className="font-bold text-base text-main-theme flex items-center justify-center gap-1"
              >
                <MdEdit />
                <span>이름 변경</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm("기록이 존재하는 종목은 삭제할 수 없습니다. 정말 삭제하시겠습니까?")) {
                    deleteSportMutate(sportId)
                  }
                }}
                className="font-bold text-base text-main-theme flex items-center justify-center gap-1"
              >
                <MdDelete />
                <span>삭제</span>
              </button>
            </div>
          ))}
      </div>
      <button type="submit" className="w-full h-10 rounded-full bg-main-theme">
        완료
      </button>
    </form>
  )
}
