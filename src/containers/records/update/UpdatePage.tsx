"use client"

import UpdateSessionForm from "@/containers/records/update/UpdateSessionForm"
import { useSearchParams } from "next/navigation"
import axiosInstance from "@/utils/axiosInstance"
import { useQuery } from "@tanstack/react-query"

export default function UpdatePage() {
  const searchParams = useSearchParams()

  const { data, isFetched, isError } = useQuery({
    queryKey: [`/sessions/${Number(searchParams.get("id"))}`],
    queryFn: async () => {
      const res = await axiosInstance.get(`/sessions/${Number(searchParams.get("id"))}`)
      return res.data.response.session
    },
    refetchInterval: 30_000,
  })

  if (!isFetched) return null

  return !isError && data ? <UpdateSessionForm data={data} /> : <p>권한이 없습니다.</p>
}
