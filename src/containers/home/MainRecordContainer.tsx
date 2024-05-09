"use client"

import React, { useCallback } from "react"
import { useRecoilValue } from "recoil"
import selectedDateState from "@/states/selectedDateState"
import axiosInstance from "@/utils/axiosInstance"
import { SessionData } from "@/types/record"
import moment from "moment/moment"
import { useInfiniteQuery } from "@tanstack/react-query"
import SessionItem from "@/containers/records/SessionItem"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"

export default function MainRecordContainer() {
  const date = useRecoilValue(selectedDateState)
  const param = { date: moment(date).format("YYYY-MM-DD") }
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    initialData: undefined,
    initialPageParam: 1,
    queryKey: ["/sessions", param],
    queryFn: async ({ pageParam = 1 }) => {
      const params = { page: pageParam, ...param }

      try {
        const res = await axiosInstance.get("/sessions", { params })
        return res.data.response
      } catch {
        return null
      }
    },
    getNextPageParam: (lastPage, pages, pageNum) => {
      if (lastPage && lastPage.sessions.length > 0) return pageNum + 1
      return undefined
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
  return data?.pages[0]?.sessions && data?.pages[0]?.sessions.length > 0 ? (
    <>
      {data?.pages.map((page) =>
        page.sessions.map((session: SessionData) => <SessionItem key={session.id} session={session} />),
      )}
      {hasNextPage && <div ref={targetRef} />}
    </>
  ) : (
    <>
      <hr />
      <p className="mt-7 text-center">기록이 존재하지 않습니다.</p>
    </>
  )
}
