import React, { useRef } from "react"
import useToast from "@/hooks/useToast"
import useModal from "@/hooks/useModal"
import useUserInfoQuery from "@/hooks/useUserInfoQuery"
import useErrorResponseHandler from "@/hooks/useErrorResponseHandler"

export default function UpdatePasswordForm() {
  const { onCloseModal } = useModal()
  const { addSuccessToast, addWarningToast } = useToast()
  const errorHandler = useErrorResponseHandler()

  const { updateUserInfo } = useUserInfoQuery()

  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={(e) => {
        e.preventDefault()
        let password = passwordRef?.current?.value
        let passwordConfirm = passwordConfirmRef?.current?.value

        if (!password || !passwordConfirm) return

        password = password.trim()
        passwordConfirm = passwordConfirm.trim()

        if (password.length < 4) {
          addWarningToast("비밀번호는 최소 4자리여야 합니다.")
          return
        }

        if (password !== passwordConfirm) {
          addWarningToast("비밀번호가 일치하지 않습니다.")
          return
        }

        updateUserInfo(
          { password },
          {
            onSuccess: () => {
              onCloseModal()
              addSuccessToast("비밀번호가 변경되었습니다.")
            },
            onError: (err) => errorHandler(err),
          },
        )
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <span className="w-24">비밀번호</span>
          <input
            type="password"
            ref={passwordRef}
            className="p-2 bg-input-box w-40 rounded-md h-10"
            onChange={(e) => {
              if (e.target.value.length <= 64) {
                e.target.value = e.target.value.slice(0, 64)
              }
            }}
            required
          />
        </div>
        <div className="flex items-center">
          <span className="w-24">비밀번호 확인</span>
          <input
            type="password"
            ref={passwordConfirmRef}
            className="p-2 bg-input-box w-40 rounded-md h-10"
            onChange={(e) => {
              if (e.target.value.length <= 64) {
                e.target.value = e.target.value.slice(0, 64)
              }
            }}
            required
          />
        </div>
      </div>
      <button type="submit" className="w-full h-10 rounded-full bg-main-theme">
        변경
      </button>
    </form>
  )
}
