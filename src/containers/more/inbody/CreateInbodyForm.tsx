import React, { useRef, useState } from "react"
import useToast from "@/hooks/useToast"
import useModal from "@/hooks/useModal"
import useErrorResponseHandler from "@/hooks/useErrorResponseHandler"
import axiosInstance from "@/utils/axiosInstance"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import DatePicker from "@/components/DatePicker"
import { formatDateToString } from "@/utils/utils"
import moment from "moment"

export default function CreateInbodyForm() {
  const { onCloseModal } = useModal()
  const { addSuccessToast } = useToast()
  const errorHandler = useErrorResponseHandler()

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (data: any) => {
      return axiosInstance.post("/inbody", data)
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["/inbody"] }).then()
    },
  })
  const [date, setDate] = useState(new Date())
  const weightRef = useRef<HTMLInputElement>(null)
  const muscleRef = useRef<HTMLInputElement>(null)
  const fatRef = useRef<HTMLInputElement>(null)

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={(e) => {
        e.preventDefault()
        const weight = Number(weightRef?.current?.value.trim())
        const muscle = Number(muscleRef?.current?.value.trim())
        const fat = Number(fatRef?.current?.value.trim())

        mutate(
          {
            date: moment(date).format("YYYY-MM-DD"),
            weight,
            muscle,
            fat,
            percentFat: Math.round((fat / weight) * 10000) / 100,
          },
          {
            onSuccess: () => {
              onCloseModal()
              addSuccessToast("추가되었습니다.")
            },
            onError: (err) => errorHandler(err),
          },
        )
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <span className="w-24">날짜</span>
          <div className="flex items-center gap-2">
            <DatePicker date={date} setDate={setDate} />
            <span>{formatDateToString(date)}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-24">체중(kg)</span>
          <input type="tel" ref={weightRef} className="p-2 bg-input-box rounded-md h-10" required />
        </div>
        <div className="flex items-center">
          <span className="w-24">골격근량(kg)</span>
          <input type="tel" ref={muscleRef} className="p-2 bg-input-box rounded-md h-10" required />
        </div>
        <div className="flex items-center">
          <span className="w-24">체지방량(kg)</span>
          <input type="tel" ref={fatRef} className="p-2 bg-input-box rounded-md h-10" required />
        </div>
      </div>
      <button type="submit" className="w-full h-10 rounded-full bg-main-theme">
        추가
      </button>
    </form>
  )
}
