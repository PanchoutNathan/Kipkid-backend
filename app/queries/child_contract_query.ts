import ChildContract from '#models/child_contract'
import User from '#models/user'
import BaseQuery from '#queries/base_query'

export default class ChildContractQuery extends BaseQuery<typeof ChildContract, ChildContract> {
  constructor(protected user: User | undefined = undefined) {
    super(ChildContract)
  }

  static new(user: User | undefined = undefined) {
    return new ChildContractQuery(user)
  }

  canRead() {
    this.query.whereRaw('? = ANY (acl_read)', [this?.user?.id as number])
    return this
  }

  withChild() {
    this.query.preload('child')
    return this
  }

  withParent() {
    this.query.preload('asm')
    return this
  }

  withAsm() {
    this.query.preload('asm')
    return this
  }
}
