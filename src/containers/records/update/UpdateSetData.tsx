import React, { useState } from "react"
import { SetData } from "@/types/record"
import axiosInstance from "@/utils/axiosInstance"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function UpdateSetData({ data, sessionId, idx }: { data: SetData; sessionId: number; idx: number }) {
  const queryClient = useQueryClient()
  const { mutate: setDataMutate } = useMutation({
    mutationFn: (body: any) => axiosInstance.put(`/sessions/records/sets/${data.id}`, body),
  })

  const [set, setSet] = useState<SetData>(data)

  const onBlurred = (label: string, value: any) => {
    setDataMutate(
      { [label]: value },
      {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [`/sessions/${sessionId}`] }).then(),
        onError: () => setSet(data),
      },
    )
  }

  return (
    set && (
      <>
        <span className="text-text-gray">{`${idx + 1}세트`}</span>
        <input
          className="text-end bg-input-box px-1 rounded-sm"
          value={set.count}
          onChange={(e) => {
            const value = Number(e.target.value)
            if (!isNaN(value)) {
              setSet((prevState) => ({
                ...prevState,
                count: value,
              }))
            }
          }}
          onBlur={() => {
            if (data.count !== set.count) onBlurred("count", set.count)
          }}
        />
        <input
          className="text-center bg-input-box px-1 rounded-sm"
          value={set.countUnit}
          onBlur={() => {
            if (data.countUnit !== set.countUnit) onBlurred("countUnit", set.countUnit)
          }}
          onChange={(e) => {
            if (e.target.value.length <= 2) {
              setSet((prevState) => ({
                ...prevState,
                countUnit: e.target.value,
              }))
            }
          }}
        />
        <span className="text-text-gray pl-5 max-md:pl-2">무게</span>
        <input
          className="text-end bg-input-box px-1 rounded-sm"
          value={set.weight}
          onChange={(e) => {
            const value = Number(e.target.value)
            if (!isNaN(value)) {
              setSet((prevState) => ({
                ...prevState,
                weight: value,
              }))
            }
          }}
          onBlur={() => {
            if (data.weight !== set.weight) onBlurred("weight", set.weight)
          }}
        />
        <span className="text-center">kg</span>
      </>
    )
  )
}
