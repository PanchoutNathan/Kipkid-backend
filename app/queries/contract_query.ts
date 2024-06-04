import Contract from '#models/contract'
import User from '#models/user'
import BaseQuery from '#queries/base_query'

export default class ContractQuery extends BaseQuery<typeof Contract, Contract> {
  constructor(protected user: User | undefined = undefined) {
    super(Contract)
  }

  static new(user: User | undefined = undefined) {
    return new ContractQuery(user)
  }

  canRead() {
    this.query.whereRaw('? = ANY (acl_read)', [this?.user?.id as number])
    return this
  }
}
