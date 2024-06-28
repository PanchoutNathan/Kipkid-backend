import CalendarEventService from '#services/calendar_event_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class GetAllCalendarEventsController {
  @inject()
  async handle({ request }: HttpContext, calendarService: CalendarEventService) {
    return calendarService.ge(
      [1, 2],
      ['2024-06-05', '2024-06-06'],
      [{ start: { hour: 13, minute: 0 }, end: { hour: 18, minute: 30 } }],
      'Europe/Berlin'
    )
  }
}
