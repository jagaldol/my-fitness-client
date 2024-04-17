"use client"

import { useRecoilState } from "recoil"
import isLoginState from "@/state/auth"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [isLogin, setLogin] = useRecoilState(isLoginState)
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
      <input className="w-full p-2 bg-input-box border border-gray-100 rounded-md h-14 mt-2" />
      <input className="w-full p-2 bg-input-box border border-gray-100 rounded-md h-14 mt-2" />
      <button type="submit">로그인</button>
    </form>
  )
}
