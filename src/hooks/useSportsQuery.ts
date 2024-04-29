import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/utils/axiosInstance"

export default function useSportsQuery() {
  const { data, isFetched } = useQuery({
    queryKey: ["/sports"],
    queryFn: async () => {
      return axiosInstance.get("/sports").then((res) => {
        return res.data.response.sports
      })
    },
    staleTime: 300_000,
  })

  return { data, isFetched }
}
