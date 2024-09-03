import { VALIDATE_EMAIL_DISCR } from '#constants/storage/storage-discr'
import Storage from '#models/storage'
import User from '#models/user'
import { inject } from '@adonisjs/core'
import mail from '@adonisjs/mail/services/main'
import { render } from '@react-email/components'
import { DateTime } from 'luxon'

import UserAlreadyExistException from '#exceptions/user_already_exist'
import env from '#start/env'
import { DTORegister } from '#types/auth'
import { UserType } from '#types/users'
import KipkidVerifyEmail from '../emails/kipkid-verify-email.js'

@inject()
export default class AuthService {
  async registerUser(payload: DTORegister): Promise<User> {
    const currentUser = await User.findBy('email', payload.email)
    if (currentUser && currentUser.validatedEmail) {
      throw new UserAlreadyExistException()
    } else if (currentUser && !currentUser.validatedEmail) {
      await currentUser.delete()
    }
    const user = await User.create({
      ...payload,
      validatedEmail: false,
      userType: payload.userType ?? UserType.PARENT,
    })
    this.sendValidateEmail(user)
    return user
  }

  async editRegisterUser(userId: number, payload: DTORegister): Promise<User> {
    const currentUser = await User.findBy('id', userId)
    if (currentUser && currentUser.validatedEmail) {
      throw new UserAlreadyExistException()
    }

    const user = await User.updateOrCreate({ id: userId }, payload)
    this.sendValidateEmail(user)
    return user
  }

  async sendValidateEmail(user: User): Promise<void> {
    if (user.validatedEmail) {
      return
    }

    let storage = new Storage()
    storage.expireAt = DateTime.now().plus({ days: 3 })
    storage.discr = VALIDATE_EMAIL_DISCR
    storage.target = 'users'
    storage.targetId = user.id
    storage = await storage.save()
    const url = `${env.get('HOST_URL')}/auth/validate-email/${storage.id}`
    const html = render(<KipkidVerifyEmail validateLink={url} />)
    await mail.send((message) => {
      message
        .to(user.email)
        .from('contact@kipcorp.fr')
        .subject('Verify your email address')
        .html(html)
    })
  }
}
