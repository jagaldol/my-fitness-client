"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons"

export default function AddSessionButton() {
  return (
    <button type="button" className="p-2 flex items-center">
      <span className="font-GmarketSansMedium pt-0.5">추가하기</span>
      <FontAwesomeIcon className="w-4 h-4 px-2" icon={faSquarePlus} />
    </button>
  )
}
