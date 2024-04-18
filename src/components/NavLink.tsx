"use client"

import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function NavLink({ link, icon, name }: { link: string; icon: IconProp; name: string }) {
  const pathname = usePathname()
  return (
    <Link
      href={link}
      className={`flex flex-col items-center justify-end gap-1 p-4 ${pathname === link ? "text-main-theme" : "text-text-gray"}`}
    >
      <FontAwesomeIcon className="w-6 h-6" icon={icon} />
      <span>{name}</span>
    </Link>
  )
}
