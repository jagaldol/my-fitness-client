import { PointTooltipProps, ResponsiveLine } from "@nivo/line"
import { BasicTooltip } from "@nivo/tooltip"
import React from "react"

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

function CustomTooltip({ point }: PointTooltipProps) {
  return <BasicTooltip id={String(point.data.y)} />
}

export default function Chart({ id, data, color }: { id: string; data: { x: string; y: number }[]; color: string }) {
  if (data.length === 0) return <div className="w-full text-center text-text-gray">기록을 추가해주세요</div>
  const minX = Math.min(...data.map((d) => d.y)) - 0.1
  const maxX = Math.max(...data.map((d) => d.y)) + 0.1
  const interval = (maxX - minX) / 3
  const yValues = [minX, minX + interval, minX + 2 * interval, maxX].map((value) => Math.round(value * 10) / 10)

  const uniqueYValues = [yValues[0]]

  for (let i = 1; i < yValues.length; i += 1) {
    if (yValues[i] !== uniqueYValues[uniqueYValues.length - 1]) {
      uniqueYValues.push(yValues[i])
    }
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
      yScale={{
        type: "linear",
        min: minX,
        max: maxX,
      }}
      enableGridX={false}
      colors={[`${color}`]}
      pointSize={10}
      axisLeft={{
        tickValues: uniqueYValues,
      }}
      axisBottom={{
        tickRotation: 90, // Rotates the labels
      }}
      gridYValues={uniqueYValues}
      tooltip={CustomTooltip}
      useMesh
      theme={theme}
    />
  )
}
