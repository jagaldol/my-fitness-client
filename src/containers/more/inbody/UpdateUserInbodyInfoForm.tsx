import React, { useEffect, useRef, useState } from "react"
import useToast from "@/hooks/useToast"
import useErrorResponseHandler from "@/hooks/useErrorResponseHandler"
import useModal from "@/hooks/useModal"
import Dropdown from "@/components/Dropdown"
import useUserInfoQuery from "@/hooks/useUserInfoQuery"
import { genderString } from "@/utils/utils"

export default function UpdateUserInbodyInfoForm() {
  const { onCloseModal } = useModal()
  const { addSuccessToast } = useToast()
  const errorHandler = useErrorResponseHandler()

  const { userInfo, updateUserInfo } = useUserInfoQuery()

  const genderOptions = [
    { id: 0, name: genderString(0) },
    { id: 1, name: genderString(1) },
  ]

  const [gender, setGender] = useState(-1)
  const heightRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (userInfo) setGender(userInfo.gender)
  }, [userInfo])

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={(e) => {
        e.preventDefault()

        const height = Number(heightRef?.current?.value.replaceAll(" ", ""))

        updateUserInfo(
          { gender, height },
          {
            onSuccess: () => {
              onCloseModal()
              addSuccessToast("수정되었습니다.")
            },
            onError: (err) => errorHandler(err),
          },
        )
      }}
    >
      <div className="grid grid-cols-[minmax(0,_96px)_minmax(0,_2fr)] gap-y-4 gapx-1 items-center">
        <span>성별</span>
        <Dropdown
          options={genderOptions}
          width={100}
          selectedOptionId={gender}
          onChange={(e) => setGender(parseInt(e.target.value, 10))}
          placeholder=""
        />
        <span>신장(cm)</span>
        <input
          type="tel"
          ref={heightRef}
          className="p-2 bg-input-box rounded-md h-10 w-[100px] text-center"
          defaultValue={userInfo?.height}
        />
      </div>

      <button type="submit" className="w-full h-10 rounded-full bg-main-theme">
        수정
      </button>
    </form>
  )
}
