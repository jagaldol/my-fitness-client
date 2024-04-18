import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/utils/axiosInstance"
import { useRecoilValue } from "recoil"
import { userIdState } from "@/state/auth"

export default function useUserInfoQuery() {
  const queryClient = useQueryClient()
  const userId = useRecoilValue(userIdState)
  const { data, isSuccess } = useQuery({
    queryKey: ["userInfo", userId],
    queryFn: async () => {
      return axiosInstance.get("/users/mine").then((res) => res.data)
    },
    enabled: userId !== 0,
  })

  const updateMutation = useMutation({
    mutationFn: (newInfo) => {
      return axiosInstance.put("/users/mine", newInfo)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo", userId] }).then(() => {})
    },
  })

  return { userInfo: data, isSuccess, updateUserInfo: updateMutation }
}
