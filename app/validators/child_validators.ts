import vine from '@vinejs/vine'

export const childInformationValidator = vine.object({
  name: vine.string(),
  description: vine.string(),
})

export const createChildValidator = vine.compile(
  vine.object({
    lastName: vine.string(),
    firstName: vine.string(),
    sex: vine.string(),
    birth: vine.date(),
    color: vine.string(),
    allergies: vine.array(childInformationValidator).optional(),
    handicaps: vine.array(childInformationValidator).optional(),
  })
)
