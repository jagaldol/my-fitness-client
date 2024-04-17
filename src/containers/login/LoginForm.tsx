"use client"

import { useSetRecoilState } from "recoil"
import isLoginState from "@/state/auth"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const setLogin = useSetRecoilState(isLoginState)
  const router = useRouter()
  return (
    <form
      className="w-[350px] flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        setLogin(true)
        router.push("/")
      }}
    >
      <label htmlFor="email">
        이메일
        <input
          type="text"
          name="email"
          className="w-full p-2 bg-input-box border border-gray-100 rounded-md h-14 mt-2"
        />
      </label>
      <label htmlFor="password">
        비밀번호
        <input
          type="password"
          name="password"
          className="w-full p-2 bg-input-box border border-gray-100 rounded-md h-14 mt-2"
        />
      </label>
      <button type="submit">로그인</button>
    </form>
  )
}
