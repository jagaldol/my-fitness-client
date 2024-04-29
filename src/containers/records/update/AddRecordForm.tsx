"use client"

import axiosInstance from "@/utils/axiosInstance"
import React, { useEffect, useState } from "react"
import useToast from "@/hooks/useToast"
import { useRouter, useSearchParams } from "next/navigation"
import WorkoutSelector from "@/components/WorkoutSelector"
import { MdAddCircle, MdDelete, MdEdit } from "react-icons/md"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useSportsQuery from "@/hooks/useSportsQuery"
import EditSport from "@/components/sports/EditSport"
import { AxiosError } from "axios"

export default function AddRecordForm() {
  const router = useRouter()
  const { addSuccessToast, addErrorToast } = useToast()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const { mutate: postRecordMutate } = useMutation({
    mutationFn: (data: any) => axiosInstance.post(`/sessions/${Number(searchParams.get("id"))}/records`, data),
  })
  const { mutate: postSportMutate } = useMutation({
    mutationFn: (data: any) => axiosInstance.post("/sports", data),
  })
  const { mutate: deleteSportMutate } = useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/sports/${id}`),
  })
  const { data: sports } = useSportsQuery()

  const [sportId, setSportId] = useState(-1)
  const [sportName, setSportName] = useState("")
  const [editOpen, setEditOpen] = useState(false)

  useEffect(() => {
    if (sportId > 0) {
      setSportName(sports.filter((item: any) => item.id === sportId)[0]?.name)
    }
    setEditOpen(false)
  }, [sportId, sports])

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={(e) => {
        e.preventDefault()
        postRecordMutate(
          { sportId },
          {
            onSuccess: () => {
              addSuccessToast("운동을 추가하였습니다.")
              router.back()
              queryClient.refetchQueries({ queryKey: [`/sessions/${Number(searchParams.get("id"))}`] }).then()
            },
            onError: (err) => {
              if (err instanceof AxiosError) addErrorToast(err?.response?.data.errorMessage)
              else addErrorToast(err.message)
            },
          },
        )
      }}
    >
      <div className="flex flex-col gap-4 min-w-[280px]">
        <div className="flex items-center">
          <span className="w-20">선택</span>
          <WorkoutSelector hour={sportId} setHour={setSportId} />
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
                    postSportMutate(
                      { name: sportName },
                      {
                        onSuccess: (res) => {
                          queryClient.refetchQueries({ queryKey: ["/sports"] }).then()
                          setSportId(res.data.response.id)
                        },
                        onError: (err) => {
                          if (err instanceof AxiosError && err?.response?.data.response === "DUPLICATED_DATA")
                            addErrorToast("이미 존재하는 이름입니다.")
                          else addErrorToast(err.message)
                        },
                      },
                    )
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
                  deleteSportMutate(sportId, {
                    onSuccess: () => {
                      setSportId(-1)
                      addSuccessToast("삭제되었습니다.")
                    },
                    onError: () => {
                      addErrorToast("삭제할 수 없습니다.")
                    },
                  })
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
        추가
      </button>
    </form>
  )
}
