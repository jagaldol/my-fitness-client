"use client"

import React from "react"
import { useRouter } from "next/navigation"
import useModal from "@/hooks/useModal"
import axiosInstance from "@/utils/axiosInstance"
import { useQuery } from "@tanstack/react-query"
import ContentBox from "@/components/ContentBox"
import AddInbodyForm from "@/containers/more/inbody/AddInbodyForm"
import { FaPlus } from "react-icons/fa6"
import Chart from "@/containers/more/inbody/Chart"
import useUserInfoQuery from "@/hooks/useUserInfoQuery"
import { genderString } from "@/utils/utils"
import { MdEdit } from "react-icons/md"
import UpdateUserInbodyInfoForm from "@/containers/more/inbody/UpdateUserInbodyInfoForm"

export default function Inbody() {
  const router = useRouter()
  const { openModal } = useModal()

  const { data, isFetched } = useQuery({
    queryKey: ["/inbody"],
    queryFn: async () => {
      return axiosInstance.get("/inbody").then((res) => res.data.response)
    },
  })

  const { userInfo } = useUserInfoQuery()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            openModal("인바디 기록 추가", <AddInbodyForm />)
          }}
          className="flex items-center justify-center gap-1 px-5 h-8 rounded-full bg-main-theme"
        >
          <FaPlus />
          <span>기록 추가</span>
        </button>
      </div>
      <ContentBox>
        <div className="h-40 text-white flex items-center">
          <div className="w-7 text-center mr-1">
            <h2 className="text-lg">체중</h2>
            <span>(kg)</span>
          </div>
          {isFetched && (
            <Chart
              id="weight"
              data={data.map((value: any) => ({
                x: value.date,
                y: value.weight,
                id: value.id,
              }))}
              color="#97e3d5"
            />
          )}
        </div>
      </ContentBox>
      <ContentBox>
        <div className="h-40 text-white flex items-center">
          <div className="w-7 text-center mr-1">
            <h2 className="text-lg">골격근량</h2>
            <span>(kg)</span>
          </div>
          {isFetched && (
            <Chart
              id="muscle"
              data={data.map((value: any) => ({
                x: value.date,
                y: value.muscle,
                id: value.id,
              }))}
              color="#EFB118"
            />
          )}
        </div>
      </ContentBox>
      <ContentBox>
        <div className="h-40 text-white flex items-center">
          <div className="w-7 text-center mr-1">
            <h2 className="text-lg">체지방량</h2>
            <span>(kg)</span>
          </div>
          {isFetched && (
            <Chart
              id="fat"
              data={data.map((value: any) => ({
                x: value.date,
                y: value.fat,
                id: value.id,
              }))}
              color="#97BBF5"
            />
          )}
        </div>
      </ContentBox>
      <ContentBox>
        <div className="h-40 text-white flex items-center">
          <div className="w-7 text-center mr-1">
            <h2 className="text-lg">체지방률</h2>
            <span>(%)</span>
          </div>
          {isFetched && (
            <Chart
              id="percentFat"
              data={data.map((value: any) => ({
                x: value.date,
                y: value.percentFat,
                id: value.id,
              }))}
              color="#FF725C"
              unit="%"
            />
          )}
        </div>
      </ContentBox>

      <div className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)_minmax(0,_3fr)] gap-y-4 gapx-1 pl-3 items-center">
        <span>성별</span>
        <span className="p-2 h-10 col-start-2 col-span-2">{genderString(userInfo?.gender)}</span>
        <span>신장</span>
        <span className="p-2 h-10">{userInfo ? `${userInfo.height}cm` : ""}</span>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              openModal("개인 데이터 변경", <UpdateUserInbodyInfoForm />)
            }}
            className="flex items-center justify-center gap-1 px-5 h-8 rounded-full bg-main-theme"
          >
            <MdEdit />
            <span>데이터 변경</span>
          </button>
        </div>
      </div>

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
