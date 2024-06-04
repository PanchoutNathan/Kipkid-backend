import Contract from '#models/contract'
import { BaseNormalizer } from '#normalizers/base_normalizer'

type NormalizedContract = Contract['$attributes'] & {
  canUpdate?: boolean
}

export default class ContractNormalizer extends BaseNormalizer<Contract, NormalizedContract> {
  normalize(contract: Contract): NormalizedContract {
    const { aclRead: aclR, aclWrite: aclW, ...obj } = contract.serialize()
    const aclRead: number[] = aclR ?? []
    const aclWrite: number[] = aclW ?? []
    return {
      ...obj,
      canUpdate: aclWrite.includes(this.currentUser.id),
      canRead: aclRead.includes(this.currentUser.id),
    }
  }
}
