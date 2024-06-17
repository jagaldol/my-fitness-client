import React, { useEffect, useRef, useState } from "react"
import Calendar from "react-calendar"
import { MdCalendarMonth } from "react-icons/md"
import moment from "moment"

interface Props {
  date?: Date | string
  setDate: (date: Date) => void
}

export default function DatePicker({ date, setDate }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="md:relative flex items-center gap-6 md:gap-2">
      <button
        type="button"
        aria-label="날짜 선택"
        className="bg-main-theme rounded p-1.5 text-lg"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MdCalendarMonth />
      </button>
      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute max-md:top-1/2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2 md:top-full md:-left-5 w-[250px] h-[300px] date-picker"
        >
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
