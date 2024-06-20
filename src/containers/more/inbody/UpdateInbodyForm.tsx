import axiosInstance from "@/utils/axiosInstance"
import React, { useEffect, useState } from "react"
import useToast from "@/hooks/useToast"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useErrorResponseHandler from "@/hooks/useErrorResponseHandler"
import moment from "moment/moment"
import DatePicker from "@/components/DatePicker"
import { formatDateToString } from "@/utils/utils"
import useModal from "@/hooks/useModal"
import InbodyBarChartContainer from "@/containers/more/inbody/InbodyBarChartContainer"
import useUserInfoQuery from "@/hooks/useUserInfoQuery"

export default function UpdateInbodyForm({ id }: { id: number }) {
  const { onCloseModal } = useModal()
  const { addSuccessToast } = useToast()
  const errorHandler = useErrorResponseHandler()

  const queryClient = useQueryClient()

  const { data, isFetched } = useQuery({
    queryKey: ["/inbody"],
    queryFn: async () => {
      return axiosInstance.get("/inbody").then((res) => res.data.response)
    },
  })

  const { userInfo } = useUserInfoQuery()

  const { mutate: updateMutate } = useMutation({
    mutationFn: (newData: any) => {
      return axiosInstance.put(`/inbody/${id}`, newData)
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["/inbody"] }).then()
    },
  })

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (newData: any) => {
      return axiosInstance.delete(`/inbody/${id}`, newData)
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["/inbody"] }).then()
    },
  })

  const [date, setDate] = useState(new Date())
  const [weight, setWeight] = useState("")
  const [muscle, setMuscle] = useState("")
  const [fat, setFat] = useState("")

  useEffect(() => {
    if (isFetched) {
      setDate(moment(data.filter((d: any) => d.id === id)[0].date, "YYYY-MM_DD").toDate())
      setWeight(data.filter((d: any) => d.id === id)[0].weight)
      setMuscle(data.filter((d: any) => d.id === id)[0].muscle)
      setFat(data.filter((d: any) => d.id === id)[0].fat)
    }
  }, [id, isFetched, data])
  return (
    isFetched && (
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault()
          const w = Number(weight)
          const m = Number(muscle)
          const f = Number(fat)

          updateMutate(
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
                addSuccessToast("수정되었습니다.")
              },
              onError: (err) => errorHandler(err),
            },
          )
        }}
      >
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

        <div className="flex w-full gap-4">
          <button
            type="button"
            className="w-full h-10 rounded-full bg-main-theme"
            onClick={() => {
              deleteMutate(undefined, {
                onSuccess: () => {
                  onCloseModal()
                  addSuccessToast("삭제되었습니다.")
                },
                onError: (err) => errorHandler(err),
              })
            }}
          >
            삭제
          </button>
          <button type="submit" className="w-full h-10 rounded-full bg-main-theme">
            수정
          </button>
        </div>
      </form>
    )
  )
}
