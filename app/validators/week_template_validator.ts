import { calendarEventLightValidator } from '#validators/events'
import vine from '@vinejs/vine'

export const createWeekTemplateValidator = vine.compile(
  vine.object({
    title: vine.string(),
    event: vine.record(vine.array(calendarEventLightValidator)),
  })
)
