import env from '#start/env'
import { render } from '@react-email/components'

import { inject } from '@adonisjs/core'
import React from 'react'
import VercelInviteUserEmail from '../../emails/vercel-invite-user.js'

export default class GetAllCalendarEventsController {
  @inject()
  async handle() {
    const html = render(<VercelInviteUserEmail />)
    // await mail.send((message) => {
    //   message
    //     .to('nathanpanchout@live.fr')
    //     .from('contact@kipcorp.fr')
    //     .subject('Verify your email address')
    //     .html(html)
    // })
    return env.get('RESEND_API_KEY')
  }
}
