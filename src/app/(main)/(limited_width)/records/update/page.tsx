"use client"

import UpdateSessionForm from "@/containers/records/update/UpdateSessionForm"
import { useSearchParams } from "next/navigation"

export default function RecordsUpdatePage() {
  const searchParams = useSearchParams()

  const typeCheck = (value: string | null) => {
    const number = Number(value)
    return !isNaN(number) && Number.isInteger(number) && number > 0
  }

  return (
    <div className="w-full px-3 pt-14 flex flex-col gap-4">
      {typeCheck(searchParams.get("id")) ? <UpdateSessionForm recordId={Number(searchParams.get("id"))} /> : null}
    </div>
  )
}
