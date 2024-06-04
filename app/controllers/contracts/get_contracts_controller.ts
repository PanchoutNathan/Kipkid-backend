import ContractNormalizer from '#normalizers/contract_normalizer'
import ContractQuery from '#queries/contract_query'
import type { HttpContext } from '@adonisjs/core/http'

export default class GetContractsController {
  async handle({ auth }: HttpContext) {
    const user = await auth.authenticate()
    const normalizer = new ContractNormalizer(user)
    const contracts = await ContractQuery.new(user).canRead().query
    return normalizer.normalizeArray(contracts)
  }
}
