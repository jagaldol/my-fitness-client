"use client"

import useLogout from "@/hooks/useLogout"
import axiosInstance from "@/utils/axiosInstance"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/navigation"
import useToast from "@/hooks/useToast"
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient"

export default function LogoutButton() {
  const logout = useLogout()
  const router = useRouter()
  const { addSuccessToast } = useToast()
  const { mutate, queryClient } = useMutateWithQueryClient(() => axiosInstance.post("/logout"))

  return (
    <button
      type="button"
      className="text-text-gray flex gap-1 items-center"
      onClick={() => {
        mutate(null, {
          onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["/users/mine"] }).then()
            addSuccessToast("로그아웃 되었습니다.")
            router.replace("/login")
            logout()
          },
        })
      }}
    >
      <FontAwesomeIcon className="h-4 w-4" icon={faArrowRightFromBracket} />
      <span>로그아웃</span>
    </button>
  )
}
