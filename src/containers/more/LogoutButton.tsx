"use client"

import useLogout from "@/hooks/useLogout"
import axiosInstance from "@/utils/axiosInstance"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/navigation"
import useToast from "@/hooks/useToast"

export default function LogoutButton() {
  const logout = useLogout()
  const router = useRouter()
  const { addSuccessToast } = useToast()
  return (
    <button
      type="button"
      className="text-text-gray flex gap-1 items-center"
      onClick={() => {
        axiosInstance.post("/logout").finally(() => {
          addSuccessToast("로그아웃 되었습니다.")
          router.replace("/login")
          logout()
        })
      }}
    >
      <FontAwesomeIcon className="h-4 w-4" icon={faArrowRightFromBracket} />
      <span>로그아웃</span>
    </button>
  )
}
