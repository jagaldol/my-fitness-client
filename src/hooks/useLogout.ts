import { useSetRecoilState } from "recoil"
import { deleteJwt } from "@/utils/jwtDecoder"
import { userIdState } from "@/states/auth"

export default function useLogout() {
  const setUserId = useSetRecoilState(userIdState)

  return () => {
    setUserId(0)
    deleteJwt()
  }
}
