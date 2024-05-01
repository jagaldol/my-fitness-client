import { Suspense } from "react"
import UpdatePage from "@/containers/records/update/UpdatePage"

export default function UpdateRecordPage() {
  return (
    <div className="w-full px-3 pt-14 flex flex-col gap-4">
      <Suspense fallback={<p>Loading...</p>}>
        <UpdatePage />
      </Suspense>
    </div>
  )
}
