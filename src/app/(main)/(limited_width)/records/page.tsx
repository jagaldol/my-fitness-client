import RecordsContainer from "@/containers/records/RecordsContainer"
import RecordsHeader from "@/containers/records/RecordsHeader"

export default function Records() {
  return (
    <>
      <RecordsHeader />
      <div className="w-full px-3 pt-14 flex flex-col gap-4">
        <RecordsContainer />
      </div>
    </>
  )
}
