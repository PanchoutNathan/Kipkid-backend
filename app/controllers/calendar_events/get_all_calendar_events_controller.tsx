import Contract from '#models/contract'
import { inject } from '@adonisjs/core'

export default class GetAllCalendarEventsController {
  @inject()
  async handle() {
    let contract = new Contract()

    contract.merge({
      lastName: 'ee',
      firstName: 'EE',
      sex: 'mal',
      color: 'black',
      acl_read: [1],
      acl_write: [1],
      start_hour: '07:00:00',
    })
    contract = await contract.save()
    return contract
    // const url = env.get('HOST_URL')
    // const html = render(<StripeWelcomeEmail validateLink={url} />)
    // await mail.send((message) => {
    //   message
    //     .to('nathanpanchout@live.fr')
    //     .from('contact@kipcorp.fr')
    //     .subject('Verify your email address')
    //     .html(html)
    // })
    // return env.get('RESEND_API_KEY')
  }
}
