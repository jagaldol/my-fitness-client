"use client"

import { useSetRecoilState } from "recoil"
import isLoginState from "@/state/auth"
import { useRouter } from "next/navigation"
import { HTMLInputTypeAttribute } from "react"

function Field({ label, id, type }: { label: string; id: string; type: HTMLInputTypeAttribute }) {
  return (
    <label htmlFor={id}>
      {label}
      <input
        type={type}
        id={id}
        autoComplete="on"
        className="w-full p-2 bg-input-box border border-gray-100 rounded-md h-14 mt-2"
      />
    </label>
  )
}

export default function LoginForm() {
  const setLogin = useSetRecoilState(isLoginState)
  const router = useRouter()
  return (
    <form
      className="w-[350px] flex flex-col gap-10"
      onSubmit={(e) => {
        e.preventDefault()
        setLogin(true)
        router.push("/")
      }}
    >
      <div className="flex flex-col gap-4">
        <Field label="이메일" id="email" type="text" />
        <Field label="비밀번호" id="password" type="password" />
      </div>
      <button type="submit" className="w-full h-14 rounded-full bg-main-theme">
        로그인
      </button>
    </form>
  )
}
