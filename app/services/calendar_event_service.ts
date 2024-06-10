import CalendarEvent from '#models/calendar_event'
import CalendarEventsQuery from '#queries/calendar_events_query'
import ContractService from '#services/contract_service'
import { CalendarEventEvent, DTOCalendarEvent } from '#types/calendar_event'
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
    useTimezone: string
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
        newEvent.date = day
        toAdd.push(newEvent)
      })
    })
    const createdEvents = await CalendarEvent.createMany(toAdd)
    return createdEvents
  }
}
