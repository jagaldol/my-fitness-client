import AddSessionButton from "@/containers/records/AddSessionButton"

export default function RecordsHeader() {
  return (
    <header className="fixed top-0 left-0 w-full h-14 flex justify-center py-3 max-md:px-0 bg-background/70 backdrop-blur z-10">
      <div className="w-[1000px] h-full flex items-center justify-end px-10 max-md:px-0">
        <AddSessionButton />
      </div>
    </header>
  )
}
