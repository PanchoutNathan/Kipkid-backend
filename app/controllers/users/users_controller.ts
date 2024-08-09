import { checkEmailExist } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async handle({ request }: HttpContext) {
    console.log('toto')
    try {
      await request.validateUsing(checkEmailExist)
      return true
    } catch (e) {
      console.log(e)
      return true
    }
  }
}
