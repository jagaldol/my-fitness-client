import React, { useState } from "react"
import "@/styles/react-calendar.css"
import Calendar from "react-calendar"
import { MdCalendarMonth } from "react-icons/md"
import moment from "moment"

interface Props {
  date?: Date | string
  setDate: (date: Date) => void
}

export default function DatePicker({ date, setDate }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative flex items-center gap-6 md:gap-2">
      <button
        type="button"
        aria-label="날짜 선택"
        className="bg-main-theme rounded p-1.5 text-lg"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MdCalendarMonth />
      </button>
      {isOpen && (
        <div className="absolute top-full -left-5 w-[250px]">
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
              setIsOpen(false)
            }}
          />
        </div>
      )}
    </div>
  )
}
