import WeekTemplate from '#models/templates/week_template'
import User from '#models/user'
import BaseQuery from '#queries/base_query'

export default class WeekTemplateQuery extends BaseQuery<typeof WeekTemplate, WeekTemplate> {
  constructor() {
    super(WeekTemplate)
  }

  static new() {
    return new WeekTemplateQuery()
  }

  fromUser(user: User) {
    this.query.where('user_id', user.id)
    return this
  }
}
