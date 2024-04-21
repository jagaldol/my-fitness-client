"use client"

import UpdateSessionForm from "@/containers/records/update/UpdateSessionForm"
import { useRecoilValue } from "recoil"
import recordIdState from "@/states/recordIdState"

export default function RecordsUpdatePage() {
  const recordId = useRecoilValue(recordIdState)

  return <div className="w-full px-3 pt-14 flex flex-col gap-4">{recordId !== -1 ? <UpdateSessionForm /> : null}</div>
}
