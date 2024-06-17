import LogoutButton from "@/containers/more/LogoutButton"
import UserName from "@/containers/more/UserName"
import UserMemo from "@/containers/more/UserMemo"
import { MdEdit, MdPerson } from "react-icons/md"
import ContentBox from "@/components/ContentBox"
import Link from "next/link"
import { SlChart } from "react-icons/sl"

export default function More() {
  return (
    <>
      <div className="p-6 w-full">
        <ContentBox>
          <div className="flex justify-between items-center px-1">
            <div className="flex-1 flex items-center text-xl gap-1">
              <MdPerson className="text-main-theme text-5xl" />
              <div className="pt-2 font-GmarketSansMedium">
                <UserName />
              </div>
              <Link className="p-2" href="/update-info">
                <MdEdit className="text-main-theme" />
              </Link>
            </div>
            <LogoutButton />
          </div>
        </ContentBox>
      </div>

      <section className="w-full px-6 py-3 border-b-gray-500 border-b">
        <h2 className="font-GmarketSansMedium">📝 메모</h2>
        <div className="pl-5">
          <UserMemo />
        </div>
      </section>

      <section className="w-full">
        <Link
          href="/inbody"
          className="flex items-center border-b-gray-700 border-b px-6 h-14 hover:bg-input-box transition-all"
        >
          <span className="w-10">
            <SlChart className="text-lg" />
          </span>
          <span>인바디</span>
        </Link>
      </section>
    </>
  )
}
