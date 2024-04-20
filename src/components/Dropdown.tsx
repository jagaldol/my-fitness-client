interface Props {
  options: { name: string; id: number }[]
  width: number
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  placeholder: string
  selectedOptionId?: number
}

export default function Dropdown({ options, width, onChange, placeholder, selectedOptionId = -1 }: Props) {
  return (
    <select
      onChange={onChange}
      style={{ width }}
      className="bg-input-box appearance-none rounded-full p-2 text-center cursor-pointer hover:brightness-90"
      defaultValue={selectedOptionId}
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
