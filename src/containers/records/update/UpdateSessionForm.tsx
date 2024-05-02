import React from "react"
import DatePicker from "@/components/DatePicker"
import TimeSelector from "@/components/TimeSelector"
import { useRouter } from "next/navigation"
import { convertDateString, formatDateToString, formatDateToStringDash } from "@/utils/utils"
import { Record, SessionData, SetData } from "@/types/record"
import axiosInstance from "@/utils/axiosInstance"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useToast from "@/hooks/useToast"
import UpdateSetData from "@/containers/records/update/UpdateSetData"
import { MdAdd, MdDelete, MdEdit } from "react-icons/md"
import useModal from "@/hooks/useModal"
import AddRecordForm from "@/containers/records/update/AddRecordForm"
import UpdateRecordForm from "@/containers/records/update/UpdateRecordForm"
import { useSetRecoilState } from "recoil"
import selectedDateState from "@/states/selectedDateState"
import moment from "moment"

export default function UpdateSessionForm({ data, sessionId }: { data: SessionData; sessionId: number }) {
  const router = useRouter()
  const { addSuccessToast } = useToast()
  const queryClient = useQueryClient()
  const { openModal } = useModal()
  const setSelectedDate = useSetRecoilState(selectedDateState)

  const { mutate: sessionMutate } = useMutation({
    mutationFn: (body: any) => axiosInstance.put(`/sessions/${sessionId}`, body),
  })

  const { mutate: postSetRecord } = useMutation({
    mutationFn: (id: number) => axiosInstance.post(`/sessions/records/${id}/sets`, {}),
  })

  const { mutate: deleteRecordMutate } = useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/sessions/records/${id}`),
  })

  const updateSession = (label: string, value: any) => {
    sessionMutate(
      { [label]: value },
      {
        onSuccess: () => {
          queryClient.refetchQueries({ queryKey: [`/sessions/${sessionId}`] }).then()
        },
      },
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <span className="w-20">날짜</span>
          <div className="flex items-center gap-2">
            <DatePicker date={data.date} setDate={(value) => updateSession("date", formatDateToStringDash(value))} />
            <span>{formatDateToString(convertDateString(data.date))}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-20">시작시간</span>
          <TimeSelector
            hour={data.startTime ? parseInt(data.startTime.split(":")[0], 10) : -1}
            minute={data.startTime ? parseInt(data.startTime.split(":")[1], 10) : -1}
            setHour={(value) =>
              updateSession(
                "startTime",
                `${value.toString().padStart(2, "0")}:${data.startTime ? data.startTime.split(":")[1] : "00"}`,
              )
            }
            setMinute={(value) =>
              updateSession(
                "startTime",
                `${data.startTime ? data.startTime.split(":")[0] : "00"}:${value.toString().padStart(2, "0")}`,
              )
            }
          />
        </div>
        <div className="flex items-center">
          <span className="w-20">종료시간</span>
          <TimeSelector
            hour={data.endTime ? parseInt(data.endTime.split(":")[0], 10) : -1}
            minute={data.endTime ? parseInt(data.endTime.split(":")[1], 10) : -1}
            setHour={(value) =>
              updateSession(
                "endTime",
                `${value.toString().padStart(2, "0")}:${data.endTime ? data.endTime.split(":")[1] : "00"}`,
              )
            }
            setMinute={(value) =>
              updateSession(
                "endTime",
                `${data.endTime ? data.endTime.split(":")[0] : "00"}:${value.toString().padStart(2, "0")}`,
              )
            }
          />
        </div>
      </div>
      {data.records.map((record: Record) => (
        <div key={record.id}>
          <hr />
          <div className="flex text-lg my-3 gap-2">
            <h2>{record.sport.name}</h2>
            <button
              type="button"
              aria-label="수정"
              onClick={() =>
                openModal("운동 수정하기", <UpdateRecordForm recordId={record.id} currentId={record.sport.id} />)
              }
            >
              <MdEdit className="text-main-theme" />
            </button>
            <button
              type="button"
              aria-label="삭제"
              onClick={() =>
                deleteRecordMutate(record.id, {
                  onSuccess: () => {
                    queryClient.refetchQueries({ queryKey: [`/sessions/${sessionId}`] }).then()
                    addSuccessToast("삭제되었습니다.")
                  },
                })
              }
            >
              <MdDelete className="text-main-theme" />
            </button>
          </div>

          <div className="grid items-center grid-cols-[minmax(0,_1fr)_45px_35px_minmax(0,_1fr)_45px_20px_20px] gap-y-4 gap-x-2 pt-2">
            {record.sets.map((set: SetData, idx: number) => (
              <UpdateSetData data={set} sessionId={sessionId} idx={idx} key={set.id} />
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              postSetRecord(record.id, {
                onSuccess: () => {
                  queryClient.refetchQueries({ queryKey: [`/sessions/${sessionId}`] }).then()
                  addSuccessToast("세트를 생성했습니다.")
                },
              })
            }
            className="w-full mt-5 font-bold text-base text-main-theme flex items-center justify-center"
          >
            <MdAdd />
            <span>세트 추가</span>
          </button>
        </div>
      ))}
      <hr />
      <button
        type="button"
        onClick={() => openModal("운동 추가하기", <AddRecordForm />)}
        className="w-full font-bold text-lg text-main-theme flex items-center justify-center"
      >
        <MdAdd />
        <span>운동 추가</span>
      </button>

      <button
        type="button"
        onClick={() => {
          setSelectedDate(moment(data.date, "YYYY-MM-DD").toDate())
          addSuccessToast("저장되었습니다.")
          router.push("/", { scroll: false })
        }}
        className="w-full h-10 rounded-full bg-main-theme"
      >
        확인
      </button>
    </div>
  )
}
