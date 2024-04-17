"use client"

import { useSetRecoilState } from "recoil"
import isLoginState from "@/state/auth"

export default function LogoutButton() {
  const setLogin = useSetRecoilState(isLoginState)
  return (
    <button
      type="button"
      className="bg-main-theme rounded-md"
      onClick={() => {
        setLogin(false)
      }}
    >
      logout
    </button>
  )
}
