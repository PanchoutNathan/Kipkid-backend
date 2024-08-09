import { HttpContext } from '@adonisjs/core/http'

export default class TotoController {
  async handle(ctx: HttpContext) {
    console.log('dsds')
    return [
      {
        id: 12,
        username: ctx.request.url(true),
      },
      {
        id: 2,
        username: 'romain',
      },
    ]
  }
}
