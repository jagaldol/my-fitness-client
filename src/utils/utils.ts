export function convertDateString(dateStr: string) {
  const splitDate = dateStr.split("-").map((value) => parseInt(value, 10))
  return new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
}

export function convertTimeString(timeStr: string | undefined) {
  if (timeStr) {
    const splitTime = timeStr.split(":")
    return `${splitTime[0]}:${splitTime[1]}`
  }
  return "--:--"
}

export function getKoreanDay(day: number) {
  switch (day) {
    case 1:
      return "월"
    case 2:
      return "화"
    case 3:
      return "수"
    case 4:
      return "목"
    case 5:
      return "금"
    case 6:
      return "토"
    case 7:
      return "일"
    default:
      return ""
  }
}
