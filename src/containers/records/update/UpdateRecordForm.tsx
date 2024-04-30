"use client"

import axiosInstance from "@/utils/axiosInstance"
import React from "react"
import useToast from "@/hooks/useToast"
import { useSearchParams } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import useModal from "@/hooks/useModal"
import ModifyRecordForm from "@/containers/records/update/ModifyRecordForm"

export default function UpdateRecordForm({ recordId, currentId }: { recordId: number; currentId: number }) {
  const { addSuccessToast, addErrorToast } = useToast()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const { onCloseModal } = useModal()

  const { mutate } = useMutation({
    mutationFn: (data: any) => axiosInstance.put(`/sessions/records/${recordId}`, data),
    onSuccess: () => {
      addSuccessToast("수정하였습니다.")
      queryClient.refetchQueries({ queryKey: [`/sessions/${Number(searchParams.get("id"))}`] }).then()
      onCloseModal()
    },
    onError: (err) => {
      if (err instanceof AxiosError) addErrorToast(err?.response?.data.errorMessage)
      else addErrorToast(err.message)
    },
  })

  return <ModifyRecordForm currentId={currentId} onSubmitMutate={mutate} />
}
