"use client"

import useLogout from "@/hooks/useLogout"
import axiosInstance from "@/utils/axiosInstance"

export default function LogoutButton() {
  const logout = useLogout()
  return (
    <button
      type="button"
      className="bg-main-theme rounded-md"
      onClick={() => {
        axiosInstance.post("/logout").finally(logout)
      }}
    >
      logout
    </button>
  )
}
