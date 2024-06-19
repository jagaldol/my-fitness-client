import { SetStateAction } from "react"
import Dropdown from "@/components/Dropdown"
import useSportsQuery from "@/hooks/useSportsQuery"

interface Props {
  id: number
  setId: React.Dispatch<SetStateAction<number>>
}

export default function WorkoutSelector({ id, setId }: Props) {
  const { data, isFetched } = useSportsQuery()

  return (
    isFetched && (
      <Dropdown
        placeholder="운동종목"
        options={[...data, { id: 0, name: "직접추가" }]}
        width={200}
        onChange={(e) => {
          setId(parseInt(e.target.value, 10))
          e.target.blur()
        }}
        selectedOptionId={id}
      />
    )
  )
}
