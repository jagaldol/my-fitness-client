import axiosInstance from "@/utils/axiosInstance"
import React, { useEffect, useState } from "react"
import { MdCheckCircle } from "react-icons/md"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useSportsQuery from "@/hooks/useSportsQuery"
import { AxiosError } from "axios"
import useToast from "@/hooks/useToast"

export default function EditSport({ sportId }: { sportId: number }) {
  const { addErrorToast } = useToast()
  const queryClient = useQueryClient()

  const { mutate: putSportMutate } = useMutation({
    mutationFn: (data: any) => axiosInstance.put(`/sports/${sportId}`, data),
    onSuccess: () => queryClient.refetchQueries({ queryKey: ["/sports"] }).then(),
    onError: (err) => {
      if (err instanceof AxiosError && err?.response?.data.response !== "UNKNOWN_SERVER_ERROR") {
        if (err?.response?.data.response === "DUPLICATED_DATA") addErrorToast("이미 존재하는 이름입니다.")
        else addErrorToast(err?.response?.data.errorMessage)
      } else addErrorToast(err.message)
    },
  })
  const { data: sports } = useSportsQuery()

  const [name, setName] = useState("")

  useEffect(() => {
    if (sports) setName(sports.filter((item: any) => item.id === sportId)[0]?.name)
  }, [sports, sportId])

  return (
    <div className="flex items-center justify-between flex-1">
      <input
        className="bg-input-box h-9 p-2 rounded-md w-40"
        value={name}
        onChange={(e) => {
          if (e.target.value.length <= 20) {
            setName(e.target.value)
          }
        }}
      />
      <button
        type="button"
        aria-label="이름변경"
        onClick={() => {
          if (name && name !== "") {
            putSportMutate({ name })
          }
        }}
      >
        <MdCheckCircle className="text-3xl text-main-theme" />
      </button>
    </div>
  )
}
