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

  canRead() {
    this.query
      .join('contracts', (query) => {
        return query.on('calendar_events.contract', '=', 'contracts.id')
      })
      .whereRaw('? = ANY (contracts.acl_read)', [1])

    return this
  }
}
