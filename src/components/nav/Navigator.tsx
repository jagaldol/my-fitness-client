import { faBars, faDumbbell, faHouseChimney } from "@fortawesome/free-solid-svg-icons"
import NavLink from "@/components/nav/NavLink"

export default function Navigator() {
  return (
    <nav className="flex w-full justify-around fixed bottom-0">
      <NavLink link="/" name="홈" icon={faHouseChimney} />
      <NavLink link="/records" name="기록" icon={faDumbbell} />
      <NavLink link="/more" name="더보기" icon={faBars} />
    </nav>
  )
}
