"use client"

import React from "react"
import { useRouter } from "next/navigation"
import useModal from "@/hooks/useModal"
import axiosInstance from "@/utils/axiosInstance"
import { useQuery } from "@tanstack/react-query"
import { PointTooltipProps, ResponsiveLine } from "@nivo/line"
import ContentBox from "@/components/ContentBox"
import { BasicTooltip } from "@nivo/tooltip"
import moment from "moment"
import CreateInbodyForm from "@/containers/more/inbody/CreateInbodyForm"
import { FaPlus } from "react-icons/fa6"

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

function Chart({ id, data, color }: { id: string; data: { x: string; y: number }[]; color: string }) {
  const minX = Math.min(...data.map((d) => d.y)) - 0.5
  const maxX = Math.max(...data.map((d) => d.y)) + 0.5
  const interval = (maxX - minX) / 3
  const yValues = [minX, minX + interval, minX + 2 * interval, maxX].map((value) => Math.round(value * 10) / 10)
  return (
    <ResponsiveLine
      data={[
        {
          id,
          data,
        },
      ]}
      margin={{ top: 20, right: 50, bottom: 30, left: 50 }}
      yScale={{
        type: "linear",
        min: minX,
        max: maxX,
      }}
      enableGridX={false}
      colors={[`${color}`]}
      pointSize={10}
      axisLeft={{
        tickValues: yValues,
      }}
      gridYValues={yValues}
      tooltip={CustomTooltip}
      useMesh
      theme={theme}
    />
  )
}

export default function Inbody() {
  const router = useRouter()
  const { openModal } = useModal()

  const { data, isFetched } = useQuery({
    queryKey: ["/inbody"],
    queryFn: async () => {
      return axiosInstance.get("/inbody").then((res) => res.data.response)
    },
  })
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            openModal("인바디 기록 추가", <CreateInbodyForm />)
          }}
          className="flex items-center justify-center gap-1 px-5 h-8 rounded-full bg-main-theme"
        >
          <FaPlus />
          <span>기록 추가</span>
        </button>
      </div>
      <ContentBox>
        <div className="h-40 text-white flex items-center">
          <div className="w-7 text-center mx-2">
            <h2 className="text-lg">체중</h2>
            <span>(kg)</span>
          </div>
          {isFetched && (
            <Chart
              id="weight"
              data={data.map((value: any) => ({ x: moment(value.date).format("M/D"), y: value.weight }))}
              color="#97e3d5"
            />
          )}
        </div>
      </ContentBox>
      <ContentBox>
        <div className="h-40 text-white flex items-center">
          <div className="w-7 text-center mx-2">
            <h2 className="text-lg">골격근량</h2>
            <span>(kg)</span>
          </div>
          {isFetched && (
            <Chart
              id="muscle"
              data={data.map((value: any) => ({ x: moment(value.date).format("M/D"), y: value.muscle }))}
              color="#EFB118"
            />
          )}
        </div>
      </ContentBox>
      <ContentBox>
        <div className="h-40 text-white flex items-center">
          <div className="w-7 text-center mx-2">
            <h2 className="text-lg">체지방량</h2>
            <span>(kg)</span>
          </div>
          {isFetched && (
            <Chart
              id="fat"
              data={data.map((value: any) => ({ x: moment(value.date).format("M/D"), y: value.fat }))}
              color="#97BBF5"
            />
          )}
        </div>
      </ContentBox>
      <ContentBox>
        <div className="h-40 text-white flex items-center">
          <div className="w-7 text-center mx-2">
            <h2 className="text-lg">체지방률</h2>
            <span>(%)</span>
          </div>
          {isFetched && (
            <Chart
              id="percentFat"
              data={data.map((value: any) => ({ x: moment(value.date).format("M/D"), y: value.percentFat }))}
              color="#FF725C"
            />
          )}
        </div>
      </ContentBox>

      <button
        type="button"
        onClick={() => {
          router.push("/more", { scroll: false })
        }}
        className="w-full h-10 rounded-full bg-main-theme"
      >
        확인
      </button>
    </div>
  )
}
