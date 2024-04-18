"use client"

import { useEffect, useState } from "react"
import useUserInfoQuery from "@/hooks/useUserInfoQuery"

export default function UserMemo() {
  const [memo, setMemo] = useState("")
  const { userInfo, isSuccess } = useUserInfoQuery()

  useEffect(() => {
    if (isSuccess && userInfo.response.memo) {
      setMemo(userInfo.response.memo)
    }
  }, [userInfo, isSuccess])

  return memo !== "" ? <p>{memo}</p> : <p className="text-text-gray">메모가 없습니다.</p>
}
