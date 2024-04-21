import LogoutButton from "@/containers/more/LogoutButton"
import UserName from "@/containers/more/UserName"
import UserMemo from "@/containers/more/UserMemo"
import { MdPerson } from "react-icons/md"

export default function More() {
  return (
    <>
      <section className="p-6 w-full">
        <div className="h-16 bg-content-box rounded-md px-5 flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <MdPerson className="text-main-theme text-5xl" />
            <UserName />
          </div>
          <LogoutButton />
        </div>
      </section>
      <hr />
      <section className="py-6 px-11 w-full h-16 font-GmarketSansMedium text-base">
        <p>📝 메모</p>
        <UserMemo />
      </section>
    </>
  )
}
