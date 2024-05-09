import axiosInstance from "@/utils/axiosInstance"
import React from "react"
import useToast from "@/hooks/useToast"
import { useSearchParams } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useModal from "@/hooks/useModal"
import ModifyRecordForm from "@/containers/records/update/ModifyRecordForm"
import useErrorResponseHandler from "@/hooks/useErrorResponseHandler"

export default function AddRecordForm() {
  const { addSuccessToast } = useToast()
  const errorHandler = useErrorResponseHandler()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const { onCloseModal } = useModal()
  const { mutate } = useMutation({
    mutationFn: (data: any) => axiosInstance.post(`/sessions/${Number(searchParams.get("id"))}/records`, data),
    onSuccess: () => {
      addSuccessToast("운동을 추가하였습니다.")
      queryClient.refetchQueries({ queryKey: [`/sessions/${Number(searchParams.get("id"))}`] }).then()
      onCloseModal()
    },
    onError: (err) => errorHandler(err),
  })

  return <ModifyRecordForm currentId={-1} onSubmitMutate={mutate} />
}
