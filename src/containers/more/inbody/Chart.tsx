import { Datum, PointTooltipProps, ResponsiveLine } from "@nivo/line"
import { BasicTooltip } from "@nivo/tooltip"
import React from "react"
import useModal from "@/hooks/useModal"
import UpdateInbodyForm from "@/containers/more/inbody/UpdateInbodyForm"
import moment from "moment/moment"

const theme = {
  text: {
    fill: "#FFFFFF",
  },
  tooltip: {
    container: {
      background: "#555555",
      color: "#fff",
    },
  },
  crosshair: {
    line: {
      stroke: "#FFFFFF",
    },
  },
}

function CustomTooltip({ point }: PointTooltipProps, unit: string) {
  return (
    <BasicTooltip
      id={moment(point.data.x).format("YY년 M월 D일")}
      value={`${point.data.y}${unit}`}
      enableChip
      color={point.serieColor}
    />
  )
}

export default function Chart({
  id,
  data,
  color,
  unit = "kg",
}: {
  id: string
  data: Datum[]
  color: string
  unit?: string
}) {
  const { openModal } = useModal()

  if (data.length === 0) return <div className="w-full text-center text-text-gray">기록을 추가해주세요</div>
  const minY = Math.min(...data.map((d) => Number(d.y))) - 0.1
  const maxY = Math.max(...data.map((d) => Number(d.y))) + 0.1
  const interval = (maxY - minY) / 3
  const yValues = [minY, minY + interval, minY + 2 * interval, maxY].map((value) => Math.round(value * 10) / 10)

  const uniqueYValues = [yValues[0]]

  for (let i = 1; i < yValues.length; i += 1) {
    if (yValues[i] !== uniqueYValues[uniqueYValues.length - 1]) {
      uniqueYValues.push(yValues[i])
    }
  }

  const allDates = data.map((point) => moment(point.x, "YYYY-MM-DD"))
  const minDate = moment.min(allDates).startOf("month")
  const maxDate = moment.max(allDates).add(1, "month").startOf("month")

  const months = []
  for (let currentMonth = minDate.clone(); currentMonth <= maxDate; currentMonth.add(1, "month")) {
    months.push(currentMonth.toDate())
  }

  return (
    <ResponsiveLine
      data={[
        {
          id,
          data,
        },
      ]}
      margin={{ top: 10, right: 10, bottom: 54, left: 32 }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        precision: "day",
        min: minDate.toDate(),
        max: maxDate.toDate(),
      }}
      yScale={{
        type: "linear",
        min: minY,
        max: maxY,
      }}
      xFormat="time:%Y-%m-%d"
      enableGridX={false}
      colors={[`${color}`]}
      pointSize={10}
      axisLeft={{
        tickValues: uniqueYValues,
      }}
      axisBottom={{
        tickRotation: 90, // Rotates the labels
        format: (date) => moment(date).format("YY.M.D"), // 날짜 형식
        tickValues: months,
      }}
      gridYValues={uniqueYValues}
      tooltip={(point) => CustomTooltip(point, unit)}
      onClick={(point: any) => openModal("인바디 기록 수정", <UpdateInbodyForm id={point.data.id} />)}
      useMesh
      theme={theme}
    />
  )
}
