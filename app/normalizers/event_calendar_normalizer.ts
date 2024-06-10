import CalendarEvent from '#models/calendar_event'
import Contract from '#models/contract'
import User from '#models/user'
import { BaseNormalizer } from '#normalizers/base_normalizer'
import dayjs from 'dayjs'

type NormalizedCalendarEvent = Contract['$attributes'] & {
  color?: string
}

export default class EventCalendarNormalizer extends BaseNormalizer<
  CalendarEvent,
  NormalizedCalendarEvent
> {
  contracts: Contract[]

  constructor(
    protected u: User,
    protected allContracts: Contract[]
  ) {
    super(u)
    this.contracts = allContracts
  }

  normalize(event: CalendarEvent): NormalizedCalendarEvent {
    const obj = event.serialize()

    let color: string | undefined
    if (this.contracts.length > 0) {
      this.contracts.forEach((contract) => {
        if (contract.id === event.contractId) {
          color = contract.color
        }
      })
    }

    const events = event.events.map((ev) => {
      const start = dayjs(ev.start)
      const end = dayjs(ev.end)
      return {
        start: {
          hour: start.hour(),
          minutes: start.minute(),
        },
        end: {
          hour: end.hour(),
          minutes: end.minute(),
        },
      }
    })

    return {
      ...obj,
      color,
      eventsLight: events,
    }
  }
}
