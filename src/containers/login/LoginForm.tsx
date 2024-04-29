"use client"

import React, { forwardRef, HTMLInputTypeAttribute, useEffect, useRef } from "react"
import { useSetRecoilState } from "recoil"
import { useRouter } from "next/navigation"
import { userIdState } from "@/states/auth"
import { getJwtId, getJwtPayload, saveJwt } from "@/utils/jwtDecoder"
import axiosInstance from "@/utils/axiosInstance"
import useToast from "@/hooks/useToast"
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient"
import { AxiosError } from "axios"

const Field = forwardRef(function FieldForward(
  {
    label,
    id,
    type,
  }: {
    label: string
    id: string
    type: HTMLInputTypeAttribute
  },
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <label htmlFor={id}>
      <span>{label}</span>
      <input
        type={type}
        id={id}
        autoComplete="on"
        className="w-full p-2 bg-input-box border border-gray-100 rounded-md h-14 mt-2"
        required
        ref={ref}
      />
    </label>
  )
})

export default function LoginForm() {
  const setUserId = useSetRecoilState(userIdState)
  const router = useRouter()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const { addSuccessToast, addWarningToast, addErrorToast } = useToast()

  const { mutate, queryClient } = useMutateWithQueryClient((data) => axiosInstance.post("/login", data))

  useEffect(() => {
    const payload = getJwtPayload()
    if (payload) {
      router.replace("/")
    }
  })

  return (
    <form
      className="w-[350px] max-w-[85%] flex flex-col gap-10"
      onSubmit={(e) => {
        e.preventDefault()
        const email = emailInputRef?.current?.value
        const password = passwordInputRef?.current?.value
        mutate(
          { email, password },
          {
            onSuccess: (res) => {
              addSuccessToast("환영합니다!")
              const jwt = res.headers.authorization
              saveJwt(jwt)
              setUserId(getJwtId(jwt))
              queryClient.invalidateQueries().then()
              router.replace("/")
            },
            onError: (err) => {
              if (err instanceof AxiosError && err?.response?.data.response === "LOGIN_FAILED")
                addWarningToast("이메일 혹은 비밀번호가 틀렸습니다.")
              else addErrorToast(err.message)
            },
          },
        )
      }}
    >
      <div className="flex flex-col gap-4">
        <Field label="이메일" id="email" type="text" ref={emailInputRef} />
        <Field label="비밀번호" id="password" type="password" ref={passwordInputRef} />
      </div>
      <button type="submit" className="w-full h-14 rounded-full bg-main-theme">
        로그인
      </button>
    </form>
  )
}
