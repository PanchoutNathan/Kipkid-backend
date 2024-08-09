import type { HttpContext } from '@adonisjs/core/http'

export default class MeController {
  async handle({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    return response.ok(user)
  }
}
