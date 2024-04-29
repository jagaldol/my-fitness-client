import { SetStateAction } from "react"
import "react-calendar/dist/Calendar.css"
import Dropdown from "@/components/Dropdown"

interface Props {
  hour: number
  minute: number
  setHour: React.Dispatch<SetStateAction<number>>
  setMinute: React.Dispatch<SetStateAction<number>>
}

export default function TimeSelector({ hour, minute, setHour, setMinute }: Props) {
  const hoursOptions = [
    { name: "0시", id: 0 },
    { name: "1시", id: 1 },
    { name: "2시", id: 2 },
    { name: "3시", id: 3 },
    { name: "4시", id: 4 },
    { name: "5시", id: 5 },
    { name: "6시", id: 6 },
    { name: "7시", id: 7 },
    { name: "8시", id: 8 },
    { name: "9시", id: 9 },
    { name: "10시", id: 10 },
    { name: "11시", id: 11 },
    { name: "12시", id: 12 },
    { name: "13시", id: 13 },
    { name: "14시", id: 14 },
    { name: "15시", id: 15 },
    { name: "16시", id: 16 },
    { name: "17시", id: 17 },
    { name: "18시", id: 18 },
    { name: "19시", id: 19 },
    { name: "20시", id: 20 },
    { name: "21시", id: 21 },
    { name: "22시", id: 22 },
    { name: "23시", id: 23 },
  ]
  const minutesOptions = [
    { name: "0분", id: 0 },
    { name: "10분", id: 10 },
    { name: "20분", id: 20 },
    { name: "30분", id: 30 },
    { name: "40분", id: 40 },
    { name: "50분", id: 50 },
  ]

  return (
    <div className="flex items-center gap-2">
      <Dropdown
        placeholder="시간"
        options={hoursOptions}
        width={100}
        onChange={(e) => {
          setHour(parseInt(e.target.value, 10))
        }}
        selectedOptionId={hour}
      />
      <Dropdown
        placeholder="분"
        options={minutesOptions}
        width={100}
        onChange={(e) => {
          setMinute(parseInt(e.target.value, 10))
        }}
        selectedOptionId={minute}
      />
    </div>
  )
}
