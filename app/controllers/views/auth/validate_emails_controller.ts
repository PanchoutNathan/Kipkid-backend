// import type { HttpContext } from '@adonisjs/core/http'

import Storage from '#models/storage'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class ValidateEmailsController {
  async index({ inertia, request }: HttpContext) {
    const uid = request.param('storage')

    const storage = await Storage.find(uid)

    if (!storage) {
      return inertia.render('auth/validate_email_expired')
    }

    const isExpired = storage.expireAt < DateTime.now()
    if (isExpired) {
      return inertia.render('auth/validate_email_expired')
    }

    const user = await User.find(storage.targetId)

    if (user) {
      user.validatedEmail = true
      user.save()
    }

    return inertia.render('auth/validate_email', { uid })
  }
}
