import Child from '#models/child'
import User from '#models/user'
import BaseQuery from '#queries/base_query'

export default class ChildQuery extends BaseQuery<typeof Child, Child> {
  constructor(protected user: User | undefined = undefined) {
    super(Child)
  }

  static new(user: User | undefined = undefined) {
    return new ChildQuery(user)
  }

  canRead() {
    if (!this.user) {
      return this
    }
    super.canView(this.user)
    return this
  }

  withContract() {
    // this.query.preload('contracts')
    return this
  }
}
