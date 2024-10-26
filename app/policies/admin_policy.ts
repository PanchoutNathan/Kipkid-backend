import env from '#start/env'
import { allowGuest, BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'

@inject()
export default class AdminPolicy extends BasePolicy {
  constructor(protected ctx: HttpContext) {
    super()
  }

  @allowGuest()
  canGeneratePDF(): AuthorizerResponse {
    const { token } = this.ctx.request.qs()

    if (!token) {
      return false
    }

    try {
      jwt.verify(token, env.get('ADMIN_SECRET'))
    } catch (e) {
      return false
    }
    return true
  }
}
