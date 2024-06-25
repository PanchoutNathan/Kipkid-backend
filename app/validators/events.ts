import vine from '@vinejs/vine'

export const calendarEventLightValidator = vine.object({
  start: vine.object({ hour: vine.number(), minutes: vine.number() }),
  end: vine.object({ hour: vine.number(), minutes: vine.number() }),
})
