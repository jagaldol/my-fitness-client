import { atom } from "recoil"

const recordIdState = atom({
  key: "recordIdState",
  default: -1,
})

export default recordIdState
