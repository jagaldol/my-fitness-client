import React from "react"
import ContentBox from "@/components/ContentBox"
import MainCalendar from "@/containers/home/MainCalendar"
import AddSessionButton from "@/containers/records/AddSessionButton"
import MainRecordContainer from "@/containers/home/MainRecordContainer"

export default function HomePage() {
  return (
    <div className="flex max-md:flex-col min-h-[calc(100vh-100px)] pt-10 px-5 items-start gap-5 w-full 2xl:w-[1500px]">
      <div className="w-full md:sticky top-[calc(100vh-780px)]">
        <ContentBox>
          <div className="h-[calc((100vh-140px)*3/4-36px)] md:h-[550px] md:text-xl">
            <MainCalendar />
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        <div className="pt-3 relative min-h-[calc((100vh-140px)/4-16px)] md:min-h-[calc(100vh-200px)]">
          <div className="px-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">운동 기록</h2>
            <div className="text-main-theme">
              <AddSessionButton otherDate />
            </div>
          </div>
          <div className="p-2">
            <MainRecordContainer />
          </div>
        </div>
      </ContentBox>
    </div>
  )
}
