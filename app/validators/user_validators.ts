import vine from '@vinejs/vine'

export const basicUserSchema = vine.object({
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

export const updateUserValidator = vine.compile(basicUserSchema)

export const asmSchema = vine.object({
  ...basicUserSchema.getProperties(),
  pajeNumber: vine.string().optional(),
  agreementNumber: vine.string().optional(),
  agreementDate: vine.string().optional(),
  renewAgreementDate: vine.string().optional(),
  civilAssuranceNumber: vine.string().optional(),
  carAssuranceNumber: vine.string().optional(),
})
