import Contract from '#models/contract'
import ContractQuery from '#queries/contract_query'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ContractService {
  constructor(protected ctx: HttpContext) {}

  get user() {
    return this.ctx.auth.user
  }

  async getUserContracts(): Promise<Contract[]> {
    const user = await this.ctx.auth.authenticate()
    return await ContractQuery.new(user).canRead().query
  }
}
