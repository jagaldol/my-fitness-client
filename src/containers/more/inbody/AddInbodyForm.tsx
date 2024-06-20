import React, { useState } from "react"
import useToast from "@/hooks/useToast"
import useModal from "@/hooks/useModal"
import useErrorResponseHandler from "@/hooks/useErrorResponseHandler"
import axiosInstance from "@/utils/axiosInstance"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import DatePicker from "@/components/DatePicker"
import { formatDateToString } from "@/utils/utils"
import moment from "moment"
import InbodyBarChartContainer from "@/containers/more/inbody/InbodyBarChartContainer"
import useUserInfoQuery from "@/hooks/useUserInfoQuery"

export default function AddInbodyForm() {
  const { onCloseModal } = useModal()
  const { addSuccessToast } = useToast()
  const errorHandler = useErrorResponseHandler()

  const { userInfo } = useUserInfoQuery()

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
  const [weight, setWeight] = useState("")
  const [muscle, setMuscle] = useState("")
  const [fat, setFat] = useState("")

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={(e) => {
        e.preventDefault()
        const w = Number(weight)
        const m = Number(muscle)
        const f = Number(fat)

        mutate(
          {
            date: moment(date).format("YYYY-MM-DD"),
            weight: w,
            muscle: m,
            fat: f,
            percentFat: Math.round((f / w) * 10000) / 100,
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
          <input
            type="tel"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="p-2 w-32 bg-input-box rounded-md h-10"
            required
          />
        </div>
        <div className="flex items-center">
          <span className="w-24">골격근량(kg)</span>
          <input
            type="tel"
            value={muscle}
            onChange={(e) => setMuscle(e.target.value)}
            className="p-2 w-32 bg-input-box rounded-md h-10"
            required
          />
        </div>
        <div className="flex items-center">
          <span className="w-24">체지방량(kg)</span>
          <input
            type="tel"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            className="p-2 w-32 bg-input-box rounded-md h-10"
            required
          />
        </div>
      </div>
      <div className="w-[300px]">
        {userInfo && (
          <InbodyBarChartContainer
            height={userInfo.height}
            gender={userInfo.gender}
            weight={weight}
            muscle={muscle}
            fat={fat}
          />
        )}
      </div>
      <button type="submit" className="w-full h-10 rounded-full bg-main-theme">
        추가
      </button>
    </form>
  )
}
