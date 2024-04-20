import axiosInstance from "@/utils/axiosInstance"
import React, { forwardRef, useRef } from "react"
import { useRouter } from "next/navigation"
import useToast from "@/hooks/useToast"

const Field = forwardRef(function FieldForward(
  {
    label,
    id,
    required,
  }: {
    label: string
    id: string
    required?: boolean
  },
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <label htmlFor={id} className="flex items-center">
      <span className="w-20">{label}</span>
      <input
        id={id}
        className="w-full p-2 bg-input-box border border-gray-100 rounded-md h-14 mt-2"
        required={required}
        ref={ref}
      />
    </label>
  )
})

export default function AddSessionForm() {
  const router = useRouter()
  const dateInputRef = useRef<HTMLInputElement>(null)
  const startTimeInputRef = useRef<HTMLInputElement>(null)
  const endTimeInputRef = useRef<HTMLInputElement>(null)
  const { addSuccessToast, addErrorToast } = useToast()

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={(e) => {
        e.preventDefault()
        const date = dateInputRef?.current?.value
        const startTime = startTimeInputRef?.current?.value
        const endTime = endTimeInputRef?.current?.value
        axiosInstance
          .post("/sessions", { date, startTime, endTime })
          .then((res) => {
            addSuccessToast("기록이 생성되었습니다.")
            router.replace(`/records/${res.data.response.id}/update`)
          })
          .catch((res) => {
            addErrorToast(res.response.data.errorMessage)
          })
      }}
    >
      <div className="flex flex-col gap-4">
        <Field label="날짜" id="date" ref={dateInputRef} required />
        <Field label="시작시간" id="startTime" ref={startTimeInputRef} />
        <Field label="종료시간" id="endTime" ref={endTimeInputRef} />
      </div>
      <button type="submit" className="w-full h-14 rounded-full bg-main-theme">
        추가
      </button>
    </form>
  )
}
