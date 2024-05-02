import LogoutButton from "@/containers/more/LogoutButton"
import UserName from "@/containers/more/UserName"
import UserMemo from "@/containers/more/UserMemo"
import { MdEdit, MdPerson } from "react-icons/md"
import ContentBox from "@/components/ContentBox"
import Link from "next/link"

export default function More() {
  return (
    <div className="p-6 w-full flex flex-col gap-5">
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

      <hr className="w-[106%] -translate-x-[3%]" />

      <section className="w-full h-16">
        <h2 className="font-GmarketSansMedium">📝 메모</h2>
        <div className="pl-5">
          <UserMemo />
        </div>
      </section>
    </div>
  )
}
