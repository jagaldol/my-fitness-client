import LogoutButton from "@/containers/more/LogoutButton"
import UserName from "@/containers/more/UserName"
import UserMemo from "@/containers/more/UserMemo"
import { MdEdit, MdPerson } from "react-icons/md"
import ContentBox from "@/components/ContentBox"
import Link from "next/link"

export default function More() {
  return (
    <>
      <section className="p-6 w-full">
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
      </section>
      <hr />
      <section className="py-6 px-11 w-full h-16 font-GmarketSansMedium text-base">
        <p>📝 메모</p>
        <UserMemo />
      </section>
    </>
  )
}
