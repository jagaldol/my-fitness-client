"use client"

import { useRecoilState } from "recoil"
import { userIdState } from "@/state/auth"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"
import { getJwtPayload } from "@/utils/jwtDecoder"
import useLogout from "@/hooks/useLogout"

export default function RequireAuth({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useRecoilState(userIdState)
  const logout = useLogout()
  const router = useRouter()

  useEffect(() => {
    const payload = getJwtPayload()
    if (payload) {
      setUserId(payload.sub)
    } else {
      logout()
      router.replace("/login")
    }
  }, [userId, setUserId, logout, router])

  return children
}
