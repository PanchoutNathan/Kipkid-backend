import CalendarEvent from '#models/calendar_event'
import User from '#models/user'
import BaseQuery from '#queries/base_query'

export default class CalendarEventsQuery extends BaseQuery<typeof CalendarEvent, CalendarEvent> {
  constructor(protected user: User | undefined = undefined) {
    super(CalendarEvent)
  }

  static new(user: User | undefined = undefined) {
    return new CalendarEventsQuery(user)
  }

  withDate(date: string) {
    this.query.where('date', date)
    return this
  }

  betweenDates(start: string, end: string) {
    this.query.whereBetween('date', [start, end])
    return this
  }

  withContract() {
    this.query.preload('contract', (query) => query.preload('child'))
    return this
  }

  canRead() {
    if (!this.user) {
      return this
    }

    this.query
      .join('child_contracts', (query) => {
        return query.on('calendar_events.contract_id', '=', 'child_contracts.id')
      })
      .whereRaw('? = ANY (child_contracts.acl_read)', [this.user.id])

    return this
  }
}
