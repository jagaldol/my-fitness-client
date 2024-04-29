export interface SessionData {
  id: number
  date: Date
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
  records: Record[]
}

export interface Record {
  id: number
  sport: Sport
  sets: SetData[]
}

export interface Sport {
  id: number
  name: string
}

export interface SetData {
  id: number
  weight: number
  count: number
  countUnit: string
}
