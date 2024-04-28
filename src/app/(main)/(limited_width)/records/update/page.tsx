"use client"

import UpdateSessionForm from "@/containers/records/update/UpdateSessionForm"
import { useSearchParams } from "next/navigation"
import axiosInstance from "@/utils/axiosInstance"
import { useQuery } from "@tanstack/react-query"

export default function RecordsUpdatePage() {
  const searchParams = useSearchParams()

  const typeCheck = (value: string | null) => {
    const number = Number(value)
    return !isNaN(number) && Number.isInteger(number) && number > 0
  }

  const { data, isFetched, isError } = useQuery({
    queryKey: [`/sessions/${Number(searchParams.get("id"))}`],
    queryFn: async () => {
      const res = await axiosInstance.get(`/sessions/${Number(searchParams.get("id"))}`)
      return res.data.response.session
    },
    enabled: typeCheck(searchParams.get("id")),
    retry: 0,
  })

  if (!isFetched) return null

  return (
    <div className="w-full px-3 pt-14 flex flex-col gap-4">
      {!isError && data ? (
        <UpdateSessionForm recordId={Number(searchParams.get("id"))} data={data} />
      ) : (
        <p>권한이 없습니다.</p>
      )}
    </div>
  )
}
