"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import axiosInstance from "@/utils/axiosInstance"
import React from "react"
import SessionBox from "@/containers/records/SessionBox"

export default function RecordsContainer() {
  const { data, fetchNextPage } = useInfiniteQuery({
    initialData: undefined,
    initialPageParam: 1,
    queryKey: ["getRecords"],
    queryFn: async ({ pageParam = 1 }) => {
      const params = { page: pageParam, size: 1 }

      try {
        const res = await axiosInstance.get("/sessions", { params })
        return res.data.response
      } catch {
        return null
      }
    },
    getNextPageParam: (lastPage, pages, pageNum) => {
      return lastPage.sessions.length > 0 ? pageNum + 1 : undefined
    },
  })

  return (
    <>
      {data?.pages.map((page) =>
        page.sessions.map((session: any) => <SessionBox key={session.id} session={session} />),
      )}
      <button type="button" onClick={() => fetchNextPage()}>
        더보기
      </button>
    </>
  )
}
