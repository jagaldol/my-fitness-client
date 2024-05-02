"use client"

import React from "react"
import moment from "moment/moment"
import Calendar from "react-calendar"
import { useRecoilState } from "recoil"
import selectedDateState from "@/states/selectedDateState"

export default function MainCalendar() {
  const [date, setDate] = useRecoilState(selectedDateState)
  return (
    <Calendar
      locale="ko"
      calendarType="gregory"
      next2Label={null}
      prev2Label={null}
      minDetail="year"
      formatDay={(locale, d) => moment(d).format("D")}
      formatMonthYear={(locale, d) => moment(d).format("YYYY. MM")}
      formatYear={(locale, d) => moment(d).format("YYYY")}
      value={date}
      onChange={(selectedData) => {
        setDate(selectedData as Date)
      }}
    />
  )
}
