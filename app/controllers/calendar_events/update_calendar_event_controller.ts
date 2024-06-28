import EventCalendarNormalizer from '#normalizers/event_calendar_normalizer'
import CalendarEventService from '#services/calendar_event_service'
import ContractService from '#services/contract_service'
import { updateCalendarEventValidator } from '#validators/calendar_events_validators'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateCalendarEventController {
  @inject()
  async handle(
    { request, auth, params }: HttpContext,
    calendarService: CalendarEventService,
    contractSerivce: ContractService
  ) {
    const { contract, date } = params
    const user = await auth.authenticate()
    const contracts = await contractSerivce.getUserContracts()
    const payload = await request.validateUsing(updateCalendarEventValidator)
    const event = await calendarService.update(contract, date, payload)
    const normalizer = new EventCalendarNormalizer(user, contracts)
    const ev = normalizer.normalize(event)
    return ev
  }
}
