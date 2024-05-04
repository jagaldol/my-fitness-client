import React, { useState } from "react"
import { SetData } from "@/types/record"
import axiosInstance from "@/utils/axiosInstance"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MdDelete } from "react-icons/md"
import useToast from "@/hooks/useToast"

export default function UpdateSetData({ data, sessionId, idx }: { data: SetData; sessionId: number; idx: number }) {
  const queryClient = useQueryClient()
  const { addSuccessToast } = useToast()
  const { mutate: setDataMutate } = useMutation({
    mutationFn: (body: any) => axiosInstance.put(`/sessions/records/sets/${data.id}`, body),
  })

  const { mutate: deleteDataMutate } = useMutation({
    mutationFn: () => axiosInstance.delete(`/sessions/records/sets/${data.id}`),
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
          className="text-end bg-input-box p-1 rounded-md"
          type="number"
          value={set.count}
          onFocus={(e) => {
            if (e.target.value === "0") e.target.value = ""
          }}
          onChange={(e) => {
            setSet((prevState) => ({
              ...prevState,
              count: Number(e.target.value),
            }))
          }}
          onBlur={() => {
            if (!set.count)
              setSet((prevState) => ({
                ...prevState,
                count: 0,
              }))
            if (data.count !== set.count) onBlurred("count", set.count)
          }}
        />
        <input
          className="text-center bg-input-box p-1 rounded-md"
          value={set.countUnit}
          onChange={(e) => {
            if (e.target.value.length <= 2) {
              setSet((prevState) => ({
                ...prevState,
                countUnit: e.target.value,
              }))
            }
          }}
          onBlur={() => {
            if (set.countUnit.trim() !== "" && data.countUnit !== set.countUnit)
              onBlurred("countUnit", set.countUnit.trim())
          }}
        />
        <span className="text-text-gray pl-5 max-md:pl-2">무게</span>
        <input
          className="text-end bg-input-box p-1 rounded-md"
          type="number"
          value={set.weight}
          onFocus={(e) => {
            if (e.target.value === "0") e.target.value = ""
          }}
          onChange={(e) => {
            setSet((prevState) => ({
              ...prevState,
              weight: Number(e.target.value),
            }))
          }}
          onBlur={() => {
            if (!set.weight)
              setSet((prevState) => ({
                ...prevState,
                weight: 0,
              }))
            if (data.weight !== set.weight) onBlurred("weight", set.weight)
          }}
        />
        <span className="text-center">kg</span>
        <button
          type="button"
          aria-label="삭제"
          onClick={() =>
            deleteDataMutate(undefined, {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [`/sessions/${sessionId}`] }).then()
                addSuccessToast("삭제되었습니다.")
              },
            })
          }
        >
          <MdDelete className="text-main-theme text-lg" />
        </button>
      </>
    )
  )
}
