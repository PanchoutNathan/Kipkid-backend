import { Dayjs } from 'dayjs'

export type DailyCalendarEvent = {
  id: string
  contract: string
  events: CalendarEventEvent[]
  date: string
  type?: DailyCalendarEventType
  meal?: CalendarEventMeal
  kilometers?: {
    count: number
    otherChildCount: number
  }
  color?: string
  settings?: any
  sync?: boolean
}

export type DTODailyCalendarEvent = Omit<DailyCalendarEvent, 'id' | 'events'> & {
  events?: CalendarEventEvent[]
}

export enum DailyCalendarEventType {
  CLASSIC = 'classic',
  PAID_LEAVE = 'paid_leave',
  SICK_LEAVE = 'sick_leave',
  FAMILY_EVENT = 'family_event',
  CUSTOM = 'custom',
}

export type CalendarEventMeal = {
  breakfast: boolean
  lunch: boolean
  gouter: boolean
  dinner: boolean
}

export type CalendarEventKilometers = {
  count: number
  otherChildCount: number
}

export type CalendarEventLight = {
  start: {
    hour: number
    minutes: number
  }
  end: {
    hour: number
    minutes: number
  }
}

export type CalendarEventEvent = {
  start: string
  validatedStart?: string
  end: string
  validatedEnd?: string
}

export type DTOCalendarEvent = {
  start: { hour: number; minute: number }
  end: { hour: number; minute: number }
}

export type DailyCalendarEventByWeek = {
  [key: string]: DailyCalendarEventByDate
}

export type DailyCalendarEventByDate = {
  [key: string]: DailyCalendarEvent[]
}

export interface DayData {
  date: Dayjs
  isToday: boolean
  isSelected?: boolean
}
export type CalendarDayData = null | DayData
export type CalendarWeekData = CalendarDayData[]
export type CalendarData = CalendarWeekData[]
