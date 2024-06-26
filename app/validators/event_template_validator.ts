import { calendarEventLightValidator } from '#validators/events'
import vine from '@vinejs/vine'

export const createEventTemplateValidator = vine.compile(
  vine.object({
    title: vine.string(),
    event: vine.array(calendarEventLightValidator),
  })
)
