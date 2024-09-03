import ChildContractService from '#services/child_contract_service'
import ContractService from '#services/contract_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GetContractsController {
  constructor(
    protected contractService: ContractService,
    protected childContractService: ChildContractService
  ) {}

  async handle({ auth }: HttpContext) {
    const user = await auth.authenticate()

    const contracts = await this.childContractService.getChildContractCanUpdate(user)
    return contracts
  }
}
