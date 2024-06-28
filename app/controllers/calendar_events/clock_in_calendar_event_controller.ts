import EventCalendarNormalizer from '#normalizers/event_calendar_normalizer'
import CalendarEventService from '#services/calendar_event_service'
import ContractService from '#services/contract_service'
import { clockInCalendarEventValidator } from '#validators/calendar_events_validators'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClockInCalendarEventController {
  @inject()
  async handle(
    { request, auth, params }: HttpContext,
    calendarService: CalendarEventService,
    contractSerivce: ContractService
  ) {
    const { contract, date } = params
    const user = await auth.authenticate()
    const contracts = await contractSerivce.getUserContracts()
    const payload = await request.validateUsing(clockInCalendarEventValidator)
    const event = await calendarService.clockIn(contract, date, payload.events)
    const normalizer = new EventCalendarNormalizer(user, contracts)
    return normalizer.normalize(event)
  }
}
