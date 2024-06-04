import { HttpContext } from '@adonisjs/core/http'

export default class TotoController {
  async handle(ctx: HttpContext) {
    console.log('ici')

    return [
      {
        id: 11,
        username: ctx.request.url(true),
      },
      {
        id: 2,
        username: 'romain',
      },
    ]
  }
}
