import EventCalendarNormalizer from '#normalizers/event_calendar_normalizer'
import CalendarEventService from '#services/calendar_event_service'
import ContractService from '#services/contract_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class GetCalendarEventsController {
  @inject()
  async handle(
    { params, auth }: HttpContext,
    calendarEventService: CalendarEventService,
    contractSerivce: ContractService
  ) {
    const user = await auth.authenticate()

    const { date } = params

    const contracts = await contractSerivce.getUserContracts()
    const events = await calendarEventService.getEventsByDate(date)
    const normalizer = new EventCalendarNormalizer(user, contracts)
    return normalizer.normalizeArray(events)
  }
}
