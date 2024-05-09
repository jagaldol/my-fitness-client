import axiosInstance from "@/utils/axiosInstance"
import { useEffect } from "react"
import { deleteJwt, getJwtExp, getJwtTokenFromStorage, saveJwt } from "@/utils/jwtDecoder"
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { useRouter } from "next/navigation"
import useToast from "@/hooks/useToast"
import { ApiResponse } from "@/types/response"

type RefreshCallback = (newToken: string) => void

let isRefreshing = false
let refreshSubscribers: RefreshCallback[] = []

function subscribeTokenRefresh(cb: RefreshCallback) {
  refreshSubscribers.push(cb)
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token))
  refreshSubscribers = []
}

export default function useAxiosInterceptor() {
  const router = useRouter()
  const { addErrorToast } = useToast()

  const requestHandler = async (config: InternalAxiosRequestConfig) => {
    const jwtExp = getJwtExp()
    const newConfig = config
    if (jwtExp !== null && jwtExp * 1000 < Date.now()) {
      if (!isRefreshing) {
        try {
          isRefreshing = true
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/authentication`, null, {
            withCredentials: true,
          })

          const jwt = res.headers.authorization
          saveJwt(jwt)
          onRefreshed(jwt)
          newConfig.headers.Authorization = jwt
        } catch (e) {
          deleteJwt()
        } finally {
          isRefreshing = false
        }
      } else {
        await new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            newConfig.headers.Authorization = token
            resolve(token)
          })
        })
      }
    } else {
      newConfig.headers.Authorization = getJwtTokenFromStorage()
    }
    return newConfig
  }

  const responseHandler = (response: AxiosResponse) => {
    return response
  }

  const errorHandler = (error: AxiosError) => {
    const errorResponse = error.response?.data as ApiResponse
    switch (errorResponse.status) {
      case 401:
        router.replace("/login")
        addErrorToast("인증 되지 않았습니다.")
        break
      case 403:
        addErrorToast("권한이 없습니다.")
        break
      default:
        if (errorResponse.response === "UNKNOWN_SERVER_ERROR") {
          addErrorToast("서버 오류가 발생했습니다.")
        }
    }
    return Promise.reject(error)
  }

  const requestInterceptor = axiosInstance.interceptors.request.use(requestHandler)

  const responseInterceptor = axiosInstance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error),
  )

  useEffect(() => {
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [responseInterceptor, requestInterceptor])
}
