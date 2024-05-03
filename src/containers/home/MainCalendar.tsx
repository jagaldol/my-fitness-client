"use client"

import React, { useState } from "react"
import moment from "moment/moment"
import Calendar from "react-calendar"
import { useRecoilState } from "recoil"
import selectedDateState from "@/states/selectedDateState"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/utils/axiosInstance"
import { useSwipeable } from "react-swipeable"

type View = "century" | "decade" | "year" | "month"

export default function MainCalendar() {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState)
  const [activeStartDateState, setActiveStartDateState] = useState(selectedDate)
  const [viewState, setViewState] = useState<View>("month")

  const [params, setParams] = useState({ month: moment(selectedDate).format("YYYY-MM") })

  const { data, isFetched } = useQuery({
    queryKey: ["/sessions/dates", params],
    queryFn: async () => {
      return axiosInstance.get("/sessions/dates", { params }).then((res) => {
        return res.data.response.dates
      })
    },
    staleTime: 300_000,
  })

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setActiveStartDateState((prevState) => {
        const next = new Date(prevState)
        switch (viewState) {
          case "year":
            next.setFullYear(prevState.getFullYear() + 1)
            break
          default:
            next.setMonth(prevState.getMonth() + 1)
        }
        return next
      }),
    onSwipedRight: () =>
      setActiveStartDateState((prevState) => {
        const next = new Date(prevState)
        switch (viewState) {
          case "year":
            next.setFullYear(prevState.getFullYear() - 1)
            break
          default:
            next.setMonth(prevState.getMonth() - 1)
        }
        return next
      }),
  })

  return (
    <Calendar
      inputRef={handlers.ref}
      locale="ko"
      activeStartDate={activeStartDateState}
      view={viewState}
      onViewChange={({ view }) => setViewState(view)}
      calendarType="gregory"
      next2Label={null}
      prev2Label={null}
      minDetail="year"
      formatDay={(locale, date) => moment(date).format("D")}
      formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
      formatYear={(locale, date) => moment(date).format("YYYY")}
      tileClassName={({ date, view }) => {
        if (isFetched && view === "month" && data && data.includes(moment(date).format("YYYY-MM-DD")))
          return "react-calendar__tile-marker"
        return ""
      }}
      value={selectedDate}
      onActiveStartDateChange={({ activeStartDate, view }) => {
        if (activeStartDate) setActiveStartDateState(activeStartDate)
        if (view === "month") {
          setParams({ month: moment(activeStartDate).format("YYYY-MM") })
        }
      }}
      onChange={(selectedData) => {
        setSelectedDate(selectedData as Date)
      }}
    />
  )
}
