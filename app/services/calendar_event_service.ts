import CalendarEvent from '#models/calendar_event'
import CalendarEventsQuery from '#queries/calendar_events_query'
import ContractService from '#services/contract_service'
import {
  CalendarEventEvent,
  DTOCalendarEvent,
  DTOClockInCalendarEvent,
  DTOUpdateCalendarEvent,
} from '#types/calendar_event'
import { SelectedMeals, getDefaultSelectedMeal } from '#types/meals'
import { inject } from '@adonisjs/core'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'

@inject()
export default class CalendarEventService {
  constructor(protected contractService: ContractService) {}

  async getEventsByDate(date: string) {
    return CalendarEventsQuery.new().withDate(date).canRead().query
  }

  async addEvent(
    contracts: number[],
    dates: string[],
    events: DTOCalendarEvent[],
    useTimezone: string,
    meals?: SelectedMeals
  ) {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    const toAdd: CalendarEvent[] = []

    await CalendarEvent.query()
      .select()
      .whereIn('date', dates)
      .whereIn('contract_id', contracts)
      .delete()

    dates.forEach((day) => {
      const d = dayjs(day).tz(useTimezone)

      const newEvents: CalendarEventEvent[] = []
      events.map((ev) => {
        newEvents.push({
          start: d.hour(ev.start.hour).minute(ev.start.minute).second(0).toISOString(),
          end: d.hour(ev.end.hour).minute(ev.end.minute).second(0).toISOString(),
        })
      })

      contracts.map((contract) => {
        const newEvent = new CalendarEvent()
        newEvent.type = 'classic'
        newEvent.contractId = contract
        newEvent.events = newEvents
        newEvent.meal = meals
        newEvent.date = day
        toAdd.push(newEvent)
      })
    })
    const createdEvents = await CalendarEvent.createMany(toAdd)
    return createdEvents
  }

  getDefaultEvent(contract: number, date: string) {
    const event = new CalendarEvent()
    event.type = 'classic'
    event.contractId = contract
    event.meal = getDefaultSelectedMeal()
    event.date = date

    return event
  }

  async clockIn(contract: number, date: string, newEvents: DTOClockInCalendarEvent[]) {
    let event = await CalendarEvent.findBy({ date: date, contract_id: contract })
    const allValidated = newEvents.every((ev) => {
      return ev.validatedStart !== undefined && ev.validatedEnd !== undefined
    })

    if (!event) {
      event = this.getDefaultEvent(contract, date)
    }

    event.events = newEvents
    event.validated = allValidated
    event.save()
    return event
  }

  async update(contract: number, date: string, payload: DTOUpdateCalendarEvent) {
    let event = await CalendarEvent.findBy({ date: date, contract_id: contract })

    if (!event) {
      event = this.getDefaultEvent(contract, date)
    }

    event.validated = event.validated ?? false
    if (payload.events) {
      event.validated = payload.events.every((ev) => {
        return ev.validatedStart !== undefined && ev.validatedEnd !== undefined
      })
      event.events = payload.events
    }

    event.car = payload.car ?? event.car
    event.meal = payload.meals ?? event.meal
    event.save()
    return event
  }
}
