import NotFoundException from '#exceptions/not_found_exception'
import User from '#models/user'
import AuthService from '#services/auth_service'
import { registerValidator2 } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RegistersController {
  constructor(protected authService: AuthService) {}

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator2)
    const user = await this.authService.registerUser(payload)
    return response.created(user)
  }

  async editRegister({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator2)
    const userId = request.param('id')
    const user = await this.authService.editRegisterUser(userId, payload)
    return response.created(user)
  }

  async resendValidateEmail({ request, response }: HttpContext) {
    const userId = request.param('id')
    const user = await User.find(userId)
    if (!user) {
      throw new NotFoundException()
    }
    await this.authService.sendValidateEmail(user)
    return response.ok({})
  }

  async verifyEmailIsValidated({ request }: HttpContext) {
    const userId = request.param('id')
    const user = await User.find(userId)
    if (!user) {
      throw new NotFoundException()
    }

    return user.validatedEmail ?? false
  }
}
