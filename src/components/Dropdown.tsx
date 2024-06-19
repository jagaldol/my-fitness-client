interface Props {
  options: { name: string; id: number }[]
  width: string | number
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  placeholder: string
  selectedOptionId?: number
}

export default function Dropdown({ options, width, onChange, placeholder, selectedOptionId = -1 }: Props) {
  return (
    <select
      onChange={onChange}
      style={{ width }}
      className="bg-input-box appearance-none rounded-md p-2 text-center cursor-pointer hover:brightness-110 outline-none"
      value={selectedOptionId}
    >
      <option value={-1} hidden disabled>
        {placeholder}
      </option>
      {options?.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        )
      })}
    </select>
  )
}
