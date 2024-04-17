"use client"

import { useRecoilValue } from "recoil"
import isLoginState from "@/state/auth"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

export default function RequireAuth({ children }: { children: ReactNode }) {
  const isLoggedIn = useRecoilValue(isLoginState)
  const router = useRouter()
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  return children
}
