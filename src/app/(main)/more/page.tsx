import LogoutButton from "@/components/LogoutButton"
import UserName from "@/containers/more/UserName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

export default function More() {
  return (
    <main>
      <section className="p-8 w-full ">
        <div className="h-16 bg-content-box rounded-md px-5 flex items-center justify-between">
          <div className="flex">
            <FontAwesomeIcon className="text-main-theme w-8 h-8" icon={faUser} />
            <UserName />
          </div>
          <LogoutButton />
        </div>
      </section>
    </main>
  )
}
