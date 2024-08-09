import { VALIDATE_EMAIL_DISCR } from '#constants/storage/storage-discr'
import Storage from '#models/storage'
import User from '#models/user'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import mail from '@adonisjs/mail/services/main'
import { render } from '@react-email/components'
import { DateTime } from 'luxon'
import StripeWelcomeEmail from '../../emails/stripe-welcome.js'

export default class GetAllCalendarEventsController {
  @inject()
  async handle() {
    let storage = new Storage()
    storage.expireAt = DateTime.now().plus({ days: 3 })
    storage.discr = VALIDATE_EMAIL_DISCR
    storage.target = User.table
    storage.targetId = 1
    storage = await storage.save()
    return storage
    const url = env.get('HOST_URL')
    const html = render(<StripeWelcomeEmail validateLink={url} />)
    await mail.send((message) => {
      message
        .to('nathanpanchout@live.fr')
        .from('contact@kipcorp.fr')
        .subject('Verify your email address')
        .html(html)
    })
    return env.get('RESEND_API_KEY')
  }
}
