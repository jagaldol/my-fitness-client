export interface SessionData {
  id: number
  date: string
  startTime: string
  endTime: string
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
