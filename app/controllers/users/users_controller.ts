import { checkEmailExist } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async checkIfAlreadyExist({ request }: HttpContext) {
    try {
      await request.validateUsing(checkEmailExist)
      return true
    } catch (e) {
      return true
    }
  }

  async checkIfAlreadyExist({ request }: HttpContext) {
    try {
      await request.validateUsing(checkEmailExist)
      return true
    } catch (e) {
      return true
    }
  }
}
