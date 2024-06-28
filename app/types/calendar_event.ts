import { SelectedMeals } from '#types/meals'
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

export type CalendarEventMeal = SelectedMeals

export type CalendarEventKilometers = {
  distance: number
  childCount: number
}

export const getDefaultCalendarEventCar = (): CalendarEventKilometers => {
  return { distance: 0, childCount: 1 }
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

export type DTOClockInCalendarEvent = {
  validatedStart?: string
  validatedEnd?: string
  start: string
  end: string
}

export type DTOUpdateCalendarEvent = {
  events?: DTOClockInCalendarEvent[]
  meals?: CalendarEventMeal
  car?: CalendarEventKilometers
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

export type WeekEventsLight = {
  0: CalendarEventLight[]
  1: CalendarEventLight[]
  2: CalendarEventLight[]
  3: CalendarEventLight[]
  4: CalendarEventLight[]
  5: CalendarEventLight[]
  6: CalendarEventLight[]
}
