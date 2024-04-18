"use client"

import { useEffect, useState } from "react"
import useUserInfoQuery from "@/hooks/useUserInfoQuery"

export default function UserName() {
  const [userName, setUserName] = useState("")
  const { userInfo, isSuccess } = useUserInfoQuery()

  useEffect(() => {
    if (isSuccess) {
      setUserName(userInfo.response.name)
    }
  }, [userInfo, isSuccess])

  return <span className="font-GmarketSansMedium text-xl">{userName}</span>
}
