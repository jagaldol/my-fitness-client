import ContentBox from "@/components/ContentBox"
import { convertDateString, convertTimeString, getKoreanDay } from "@/utils/utils"

export default function SessionBox({ session }: { session: any }) {
  const date = convertDateString(session.date)

  return (
    <ContentBox>
      <div className="pt-3">
        <h2 className="text-xl">{`${date.getMonth() + 1}월 ${date.getDate()}일(${getKoreanDay(date.getDay())})`}</h2>
      </div>
      <hr />
      <div className="p-2">
        <p className="text-xs text-end">{`${convertTimeString(session.startTime)} ~ ${convertTimeString(session.endTime)}`}</p>
        {session.records.map((record: any, i: number) => (
          <div className="py-2 flex items-baseline" key={i}>
            <h3 className="text-base min-w-32">{record.sport.name}</h3>
            <span className="pl-5 text-text-gray">{`${record.sets.length}세트`}</span>
          </div>
        ))}
      </div>
    </ContentBox>
  )
}
