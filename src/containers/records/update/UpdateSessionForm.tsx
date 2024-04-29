import React from "react"
import DatePicker from "@/components/DatePicker"
import TimeSelector from "@/components/TimeSelector"
import { useRouter } from "next/navigation"
import { formatDateToString } from "@/utils/utils"
import { Record, SessionData, SetData } from "@/types/record"

export default function UpdateSessionForm({ data, setData }: { data: SessionData; setData: (value: any) => void }) {
  const router = useRouter()
  // const { addSuccessToast, addErrorToast } = useToast()
  // const { mutate, queryClient } = useMutateWithQueryClient((data) => axiosInstance.post("/sessions", data))

  const setOneData = (label: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [label]: value,
    }))
  }

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
            <DatePicker setDate={(value) => setOneData("date", value)} />
            <span>{formatDateToString(data.date)}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-20">시작시간</span>
          <TimeSelector
            hour={data.startHour}
            minute={data.startMinute}
            setHour={(value) => setOneData("startHour", value)}
            setMinute={(value) => setOneData("startMinute", value)}
          />
        </div>
        <div className="flex items-center">
          <span className="w-20">종료시간</span>
          <TimeSelector
            hour={data.endHour}
            minute={data.endMinute}
            setHour={(value) => setOneData("endHour", value)}
            setMinute={(value) => setOneData("endMinute", value)}
          />
        </div>
      </div>
      {data.records.map((record: Record) => (
        <div key={record.id}>
          <hr />
          <h2 className="text-lg my-3">{record.sport.name}</h2>
          <div className="grid grid-cols-4 gap-y-2 pt-2 w-2/3 ">
            {record.sets.map((set: SetData, idx: number) => (
              <React.Fragment key={set.id}>
                <span className="text-text-gray">{`${idx + 1}세트`}</span>
                <span className="text-end">{`${set.count}${set.countUnit}`}</span>
                <span className="text-text-gray pl-5">무게</span>
                <span className="text-end">{`${set.weight}kg`}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}

      <button type="button" onClick={() => router.back()} className="w-full h-10 rounded-full bg-main-theme">
        확인
      </button>
    </div>
  )
}
