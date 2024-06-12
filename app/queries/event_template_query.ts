import EventTemplate from '#models/event_template'
import User from '#models/user'
import BaseQuery from '#queries/base_query'

export default class EventTemplateQuery extends BaseQuery<typeof EventTemplate, EventTemplate> {
  constructor() {
    super(EventTemplate)
  }

  static new() {
    return new EventTemplateQuery()
  }

  fromUser(user: User) {
    this.query.where('user_id', user.id)
    return this
  }
}
