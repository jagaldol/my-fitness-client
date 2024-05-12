"use client"

import React, { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useToast from "@/hooks/useToast"
import useUserInfoQuery from "@/hooks/useUserInfoQuery"
import { MdPassword } from "react-icons/md"
import useModal from "@/hooks/useModal"
import UpdatePasswordForm from "@/containers/more/info/UpdatePasswordForm"

export default function UpdateInfo() {
  const router = useRouter()
  const { addSuccessToast } = useToast()
  const { openModal } = useModal()

  const { userInfo, updateUserInfo } = useUserInfoQuery()

  const [name, setName] = useState("")
  const [memo, setMemo] = useState("")

  const reset = useCallback(() => {
    setName(userInfo?.name ? userInfo?.name : "")
    setMemo(userInfo?.memo ? userInfo?.memo : "")
  }, [userInfo])

  const onBlurred = (label: string, value: any) => {
    updateUserInfo(
      { [label]: value },
      {
        onError: reset,
      },
    )
  }

  useEffect(() => {
    reset()
  }, [reset, userInfo])
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_5fr)] gap-y-4 gapx-1 pl-3 items-center">
        <span>이름</span>
        <input
          type="text"
          className="p-2 bg-input-box rounded-md h-10"
          value={name}
          onChange={(e) => {
            if (e.target.value.length <= 20) {
              setName(e.target.value)
            }
          }}
          onBlur={() => {
            if (name.trim() !== "" && userInfo?.name !== name.trim()) onBlurred("name", name.trim())
          }}
        />
        <span>메모</span>
        <input
          type="text"
          className="p-2 bg-input-box rounded-md h-10"
          value={memo}
          onChange={(e) => {
            if (e.target.value.length <= 100) {
              setMemo(e.target.value)
            }
          }}
          onBlur={() => {
            if (userInfo?.memo !== memo.trim()) onBlurred("memo", memo.trim())
          }}
        />
        <span>이메일</span>
        <span className="p-2 h-10">{userInfo?.email}</span>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            openModal("비밀번호 변경", <UpdatePasswordForm />)
          }}
          className="flex items-center justify-center gap-1 w-40 h-8 rounded-full bg-main-theme"
        >
          <MdPassword />
          <span>비밀번호 변경</span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          addSuccessToast("저장되었습니다.")
          router.push("/more", { scroll: false })
        }}
        className="w-full h-10 rounded-full bg-main-theme"
      >
        확인
      </button>
    </div>
  )
}
