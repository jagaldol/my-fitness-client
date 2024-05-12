"use client"

import useUserInfoQuery from "@/hooks/useUserInfoQuery"

export default function UserMemo() {
  const { userInfo, isFetched } = useUserInfoQuery()

  return isFetched && userInfo?.memo !== "" ? (
    <p>{userInfo.memo}</p>
  ) : (
    <p className="text-text-gray">메모가 없습니다.</p>
  )
}
