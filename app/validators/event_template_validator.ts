import vine from '@vinejs/vine'

export const createEventTemplateValidator = vine.compile(
  vine.object({
    title: vine.string(),
    event: vine.array(
      vine.object({
        start: vine.object({ hour: vine.number(), minutes: vine.number() }),
        end: vine.object({ hour: vine.number(), minutes: vine.number() }),
      })
    ),
  })
)
