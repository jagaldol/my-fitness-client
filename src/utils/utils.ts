export function convertDateString(dateStr: string) {
  const splitDate = dateStr.split("-").map((value) => parseInt(value, 10))
  return new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
}

export function convertTimeString(timeStr?: string) {
  if (timeStr) {
    const splitTime = timeStr.split(":")
    return `${splitTime[0]}:${splitTime[1]}`
  }
  return "--:--"
}

export function getKoreanDay(day: number) {
  switch (day) {
    case 0:
      return "일"
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
    default:
      return ""
  }
}

/**
 * Date 객체를 전달받아 "00월 00일(o)"의 형태로 파싱 후 그 값을 리턴하는 함수.
 * @param date - string으로 변환할 Date 객체
 * @returns - 파싱된 string 반환
 */
export function formatDateToString(date: Date) {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"]

  const month = date.getMonth() + 1 // 월 (0부터 시작하므로 +1)
  const day = date.getDate().toString()

  const dayOfWeek = daysOfWeek[date.getDay()] // 요일

  return `${month}월 ${day}일 (${dayOfWeek})`
}

/**
 * Date 객체를 전달받아 "0000-00-00"의 형태로 파싱 후 그 값을 리턴하는 함수.
 * @param date - string으로 변환할 Date 객체
 * @returns - 파싱된 string 반환
 */
export function formatDateToStringDash(date: Date) {
  const year = date.getFullYear().toString().padStart(2, "0") // 년 (두 자리로 포맷)
  const month = (date.getMonth() + 1).toString().padStart(2, "0") // 월 (0부터 시작하므로 +1, 두 자리로 포맷)
  const day = date.getDate().toString().padStart(2, "0") // 일 (두 자리로 포맷)

  return `${year}-${month}-${day}`
}

export function genderString(gender?: number) {
  switch (gender) {
    case 0:
      return "남자"
    case 1:
      return "여자"
    default:
      return ""
  }
}
