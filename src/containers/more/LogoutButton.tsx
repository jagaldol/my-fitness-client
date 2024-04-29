"use client"

import useLogout from "@/hooks/useLogout"
import axiosInstance from "@/utils/axiosInstance"
import { useRouter } from "next/navigation"
import useToast from "@/hooks/useToast"
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient"
import { MdLogout } from "react-icons/md"

export default function LogoutButton() {
  const logout = useLogout()
  const router = useRouter()
  const { addSuccessToast } = useToast()
  const { mutate } = useMutateWithQueryClient(() => axiosInstance.post("/logout"))

  return (
    <button
      type="button"
      className="text-text-gray flex gap-1 items-center"
      onClick={() => {
        mutate(null, {
          onSettled: () => {
            addSuccessToast("로그아웃 되었습니다.")
            router.replace("/login")
            logout()
          },
        })
      }}
    >
      <MdLogout className="text-xl" />
      <span>로그아웃</span>
    </button>
  )
}
