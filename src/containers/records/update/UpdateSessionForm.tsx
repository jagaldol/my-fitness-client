import axiosInstance from "@/utils/axiosInstance"
import React, { useEffect, useState } from "react"
import DatePicker from "@/components/DatePicker"
import { convertDateString, formatDateToString } from "@/utils/utils"
import TimeSelector from "@/components/TimeSelector"
import { useRecoilValue } from "recoil"
import recordIdState from "@/states/recordIdState"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export default function UpdateSessionForm() {
  const router = useRouter()
  // const { addSuccessToast, addErrorToast } = useToast()
  // const { mutate, queryClient } = useMutateWithQueryClient((data) => axiosInstance.post("/sessions", data))
  const [date, setDate] = useState(new Date())
  const [startHour, setStartHour] = useState(-1)
  const [startMinute, setStartMinute] = useState(-1)
  const [endHour, setEndHour] = useState(-1)
  const [endMinute, setEndMinute] = useState(-1)

  const recordId = useRecoilValue(recordIdState)
  const { data, isFetched } = useQuery({
    queryKey: [`/sessions/${recordId}`],
    queryFn: async () => {
      const res = await axiosInstance.get(`/sessions/${recordId}`)
      return res.data.response.session
    },
  })

  useEffect(() => {
    if (isFetched) {
      setDate(convertDateString(data.date))
      if (data.startTime) {
        setStartHour(parseInt(data.startTime.split(":")[0], 10))
        setStartMinute(parseInt(data.startTime.split(":")[1], 10))
      }
      if (data.endTime) {
        setEndHour(parseInt(data.endTime.split(":")[0], 10))
        setEndMinute(parseInt(data.endTime.split(":")[1], 10))
      }
    }
  }, [isFetched, data])

  return (
    <div
      className="flex flex-col gap-10"
      // onSubmit={(e) => {
      //   e.preventDefault()
      //   const data = {
      //     date: formatDateToStringDash(date),
      //     startTime:
      //       startHour !== -1 && startMinute !== -1
      //         ? `${startHour.toString().padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`
      //         : undefined,
      //     endTime:
      //       endHour !== -1 && endMinute !== -1
      //         ? `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`
      //         : undefined,
      //   }
      //   mutate(data, {
      //     onSuccess: () => {
      //       addSuccessToast("기록이 생성되었습니다.")
      //       // router.replace(`/records/${res.data.response.id}/update`)
      //       queryClient.invalidateQueries({ queryKey: ["/sessions"] }).then()
      //       // queryClient.refetchQueries({ queryKey: ["/sessions"] }).then()
      //     },
      //     onError: (err) => {
      //       if (err instanceof AxiosError) addErrorToast(err?.response?.data.errorMessage)
      //       else addErrorToast(err.message)
      //     },
      //   })
      // }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <span className="w-20">날짜</span>
          <div className="flex items-center gap-2">
            <DatePicker setDate={setDate} />
            <span>{formatDateToString(date)}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-20">시작시간</span>
          <TimeSelector hour={startHour} minute={startMinute} setHour={setStartHour} setMinute={setStartMinute} />
        </div>
        <div className="flex items-center">
          <span className="w-20">종료시간</span>
          <TimeSelector hour={endHour} minute={endMinute} setHour={setEndHour} setMinute={setEndMinute} />
        </div>
      </div>
      <button type="button" onClick={() => router.back()} className="w-full h-10 rounded-full bg-main-theme">
        확인
      </button>
    </div>
  )
}
