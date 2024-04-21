"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { MdArrowBack, MdHouse } from "react-icons/md"

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="mt-8 p-10 flex flex-col gap-5 md:text-lg">
      <h2 className="md:text-3xl text-xl font-GmarketSansMedium">
        죄송합니다.
        <br />
        페이지를 찾을 수 없습니다.
      </h2>
      <p>
        페이지의 주소가 잘못 입력되었거나,
        <br />
        변경 혹은 삭제되어 페이지를 찾을 수 없습니다.
      </p>
      <p>입력하신 주소를 다시 한번 확인해 주시기 바랍니다.</p>
      <p>감사합니다.</p>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="font-GmarketSansMedium p-1 text-lg text-main-theme hover:brightness-75 flex gap-1 items-center justify-center"
        >
          <MdArrowBack className="text-xl" />
          뒤로가기
        </button>
        <Link
          href="/"
          className="font-GmarketSansMedium p-1 text-lg text-main-theme hover:brightness-75 flex gap-1 items-center justify-center"
        >
          <MdHouse className="text-xl" />
          <span className="pt-1">홈으로</span>
        </Link>
      </div>
    </div>
  )
}
