import vine from '@vinejs/vine'

export const createCalendarEventValidator = vine.compile(
  vine.object({
    contracts: vine.array(vine.number()),
    dates: vine.array(vine.string()),
    events: vine.array(
      vine.object({
        start: vine.object({ hour: vine.number(), minute: vine.number() }),
        end: vine.object({ hour: vine.number(), minute: vine.number() }),
      })
    ),
    useTimezone: vine.string(),
  })
)
