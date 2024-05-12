"use client"

import useUserInfoQuery from "@/hooks/useUserInfoQuery"

export default function UserName() {
  const { userInfo, isFetched } = useUserInfoQuery()

  return <span>{isFetched ? userInfo?.name : ""}</span>
}
