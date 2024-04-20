import React, { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { MdCalendarMonth } from "react-icons/md"

interface Props {
  date?: Date
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
        <div className="absolute top-full left-0 text-black">
          <Calendar
            locale="ko"
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
