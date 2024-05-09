import useToast from "@/hooks/useToast"
import { AxiosError } from "axios"

export default function useErrorResponseHandler() {
  const { addErrorToast, addWarningToast } = useToast()

  return (err: Error, response?: string, message?: string, type?: "WARN" | "ERR") => {
    if (err instanceof AxiosError) {
      if (response && message && err.response?.data.response === response) {
        if (type && type === "WARN") addWarningToast(message)
        else addErrorToast(message)
      } else addErrorToast(err.response?.data.errorMessage)
    } else addErrorToast(err.message)
  }
}
