"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import axiosInstance from "@/utils/axiosInstance"
import React, { useCallback } from "react"
import SessionBox from "@/containers/records/SessionBox"
import { SessionData } from "@/types/record"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"

export default function RecordsContainer() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    initialData: undefined,
    initialPageParam: 1,
    queryKey: ["/sessions"],
    queryFn: async ({ pageParam = 1 }) => {
      const params = { page: pageParam }

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

  const handleIntersect = useCallback(
    async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target)
        if (hasNextPage) {
          await fetchNextPage()
          observer.observe(entry.target)
        }
      }
    },
    [hasNextPage, fetchNextPage],
  )

  const { targetRef } = useIntersectionObserver(handleIntersect)

  return (
    <>
      {data?.pages.map((page) =>
        page.sessions.map((session: SessionData) => <SessionBox key={session.id} session={session} />),
      )}
      {hasNextPage && <div ref={targetRef} />}
    </>
  )
}
