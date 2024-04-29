"use client"

import UpdateSessionForm from "@/containers/records/update/UpdateSessionForm"
import { useSearchParams } from "next/navigation"
import axiosInstance from "@/utils/axiosInstance"
import { useQuery } from "@tanstack/react-query"
import { SessionData } from "@/types/record"
import { useEffect, useState } from "react"

export default function UpdatePage() {
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
      return res.data.response.session
    },
    enabled: typeCheck(searchParams.get("id")),
    retry: 0,
  })

  useEffect(() => {
    if (resData) setData(resData)
  }, [resData])

  if (!isFetched) return null

  return !isError && data ? <UpdateSessionForm data={data} /> : <p>권한이 없습니다.</p>
}
