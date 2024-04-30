import { SetStateAction } from "react"
import Dropdown from "@/components/Dropdown"
import useSportsQuery from "@/hooks/useSportsQuery"

interface Props {
  hour: number
  setHour: React.Dispatch<SetStateAction<number>>
}

export default function WorkoutSelector({ hour, setHour }: Props) {
  const { data, isFetched } = useSportsQuery()

  return (
    isFetched && (
      <Dropdown
        placeholder="운동종목"
        options={[...data, { id: 0, name: "직접추가" }]}
        width={200}
        onChange={(e) => {
          setHour(parseInt(e.target.value, 10))
        }}
        selectedOptionId={hour}
      />
    )
  )
}
