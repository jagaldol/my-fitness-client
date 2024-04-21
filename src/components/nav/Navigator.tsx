import NavLink from "@/components/nav/NavLink"
import { MdHouse, MdMenu } from "react-icons/md"
import { FaDumbbell } from "react-icons/fa"

export default function Navigator() {
  return (
    <nav className="flex w-full justify-around fixed bg-background bottom-0 z-10">
      <NavLink link="/" name="홈" icon={<MdHouse />} />
      <NavLink link="/records" name="기록" icon={<FaDumbbell />} />
      <NavLink link="/more" name="더보기" icon={<MdMenu />} />
    </nav>
  )
}
