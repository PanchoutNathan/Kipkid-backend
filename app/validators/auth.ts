import User from '#models/user'
import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(4).maxLength(32),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3).maxLength(64),
    email: vine
      .string()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),
    password: vine.string().minLength(4).maxLength(32),
  })
)

export const checkEmailExist = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),
  })
)

export const registerValidator2 = vine.compile(
  vine.object({
    firstName: vine.string().maxLength(64),
    lastName: vine.string().maxLength(64),
    phoneNumber: vine.string().maxLength(10),
    email: vine
      .string()
      .email()
      .unique(async (_query, field) => {
        const user = await User.findBy('email', field)
        console.log(user?.validatedEmail)
        return !user
        // const user = await User.findBy('email', field)
        // if (user && user.validatedEmail) {
        //   return false
        // }

        // await user?.delete()
        // return true
      }),
    password: vine.string().minLength(4).maxLength(32),
  })
)
