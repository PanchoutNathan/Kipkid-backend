import ContractNormalizer from '#normalizers/contract_normalizer'
import ContractService from '#services/contract_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GetContractsController {
  constructor(protected contractService: ContractService) {}

  async handle({ auth }: HttpContext) {
    const user = await auth.authenticate()
    const normalizer = new ContractNormalizer(user)
    const contracts = await this.contractService.getUserContracts()
    return normalizer.normalizeArray(contracts)
  }
}
