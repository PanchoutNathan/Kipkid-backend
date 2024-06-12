import EventCalendarNormalizer from '#normalizers/event_calendar_normalizer'
import CalendarEventService from '#services/calendar_event_service'
import ContractService from '#services/contract_service'
import { createCalendarEventValidator } from '#validators/calendar_events_validators'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateCalendarEventController {
  @inject()
  async handle(
    { request, auth }: HttpContext,
    calendarService: CalendarEventService,
    contractSerivce: ContractService
  ) {
    const user = await auth.authenticate()
    const contracts = await contractSerivce.getUserContracts()
    const payload = await request.validateUsing(createCalendarEventValidator)
    const events = await calendarService.addEvent(
      payload.contracts,
      payload.dates,
      payload.events,
      payload.useTimezone
    )
    const normalizer = new EventCalendarNormalizer(user, contracts)
    return normalizer.normalizeArray(events)
  }
}
