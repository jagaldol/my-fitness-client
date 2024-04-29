"use client"

import UpdateSessionForm from "@/containers/records/update/UpdateSessionForm"
import { useSearchParams } from "next/navigation"
import axiosInstance from "@/utils/axiosInstance"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { convertDateString } from "@/utils/utils"
import { SessionData } from "@/types/record"

export default function RecordsUpdatePage() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<SessionData>()

  const typeCheck = (value: string | null) => {
    const number = Number(value)
    return !isNaN(number) && Number.isInteger(number) && number > 0
  }

  const {
    data: resData,
    isFetched,
    isError,
  } = useQuery({
    queryKey: [`/sessions/${Number(searchParams.get("id"))}`],
    queryFn: async () => {
      const res = await axiosInstance.get(`/sessions/${Number(searchParams.get("id"))}`)
      console.log(res.data.response.session)
      return res.data.response.session
    },
    enabled: typeCheck(searchParams.get("id")),
    retry: 0,
  })

  useEffect(() => {
    if (resData) {
      setData({
        id: resData.id,
        date: convertDateString(resData.date),
        startHour: resData.startTime ? parseInt(resData.startTime.split(":")[0], 10) : -1,
        startMinute: resData.startTime ? parseInt(resData.startTime.split(":")[1], 10) : -1,
        endHour: resData.endTime ? parseInt(resData.endTime.split(":")[0], 10) : -1,
        endMinute: resData.endTime ? parseInt(resData.endTime.split(":")[1], 10) : -1,
        records: resData.records,
      })
    }
  }, [resData])

  if (!isFetched) return null

  return (
    <div className="w-full px-3 pt-14 flex flex-col gap-4">
      {!isError && data ? <UpdateSessionForm data={data} setData={setData} /> : <p>권한이 없습니다.</p>}
    </div>
  )
}
