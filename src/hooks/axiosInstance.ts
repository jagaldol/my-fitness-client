import axios from "axios"
import refresh from "@/utils/refresh"

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(refresh)

export default axiosInstance
