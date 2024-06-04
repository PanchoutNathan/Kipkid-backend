import CalendarEventsQuery from '#queries/calendar_events_query'
import type { HttpContext } from '@adonisjs/core/http'

export default class GetCalendarEventsController {
  async handle({ params, auth }: HttpContext) {
    // const user = await auth.authenticate()
    const { date, contractId } = params

    return CalendarEventsQuery.new().canRead()
    return { date, contractId }
  }
}
