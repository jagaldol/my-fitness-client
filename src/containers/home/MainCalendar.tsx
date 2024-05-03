"use client"

import React, { useState } from "react"
import moment from "moment/moment"
import Calendar from "react-calendar"
import { useRecoilState } from "recoil"
import selectedDateState from "@/states/selectedDateState"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/utils/axiosInstance"

export default function MainCalendar() {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState)

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
  return (
    <Calendar
      locale="ko"
      calendarType="gregory"
      next2Label={null}
      prev2Label={null}
      minDetail="year"
      formatDay={(locale, date) => moment(date).format("D")}
      formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
      formatYear={(locale, date) => moment(date).format("YYYY")}
      tileClassName={({ date, view }) => {
        if (isFetched && view === "month" && data.includes(moment(date).format("YYYY-MM-DD")))
          return "react-calendar__tile-marker"
        return ""
      }}
      value={selectedDate}
      onActiveStartDateChange={({ activeStartDate, view }) => {
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
