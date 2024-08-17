import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().maxLength(64),
    lastName: vine.string().maxLength(64),
    phoneNumber: vine.string().maxLength(10),
    email: vine.string().email(),
    gender: vine.string().optional(),
    postalCode: vine.string().maxLength(5).optional(),
    address: vine.string().optional(),
    birthday: vine.date().optional(),
    city: vine.string().optional(),
    socialNumber: vine.string().optional(),
    birthCity: vine.string().optional(),
  })
)
