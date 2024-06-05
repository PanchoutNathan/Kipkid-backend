import CalendarEventService from '#services/calendar_event_service'
import { createCalendarEventValidator } from '#validators/calendar_events_validators'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateCalendarEventController {
  @inject()
  async handle({ request }: HttpContext, calendarService: CalendarEventService) {
    const payload = await request.validateUsing(createCalendarEventValidator)
    return calendarService.addEvent(
      payload.contracts,
      payload.dates,
      payload.events,
      payload.useTimezone
    )
  }
}
