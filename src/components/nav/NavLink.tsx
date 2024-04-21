"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import React from "react"

export default function NavLink({ link, icon, name }: { link: string; icon: React.ReactNode; name: string }) {
  const pathname = usePathname()
  return (
    <Link
      href={link}
      className={`flex flex-col items-center justify-end gap-1 p-4 ${pathname === link ? "text-main-theme" : "text-text-gray"}`}
      scroll={false}
    >
      <span className="text-3xl">{icon}</span>
      <span className="font-GmarketSansMedium">{name}</span>
    </Link>
  )
}
