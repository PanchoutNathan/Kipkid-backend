import NotFoundException from '#exceptions/not_found_exception'
import EventTemplate from '#models/event_template'
import User from '#models/user'
import EventTemplateQuery from '#queries/event_template_query'
import { CalendarEventLight } from '#types/calendar_event'

export default class EventTemplateService {
  constructor() {}

  async getUserTemplates(user: User): Promise<EventTemplate[]> {
    return await EventTemplateQuery.new().fromUser(user).query
  }

  async getEventTemplate(id: number): Promise<EventTemplate> {
    const template = await EventTemplate.find(id)

    if (!template) {
      throw new NotFoundException("this event template dosn't exist")
    }

    return template
  }

  async removeEventTemplate(id: number): Promise<void> {
    const template = await this.getEventTemplate(id)
    await template.delete()
  }

  async createUserTemplate(
    user: User,
    title: string,
    event: CalendarEventLight[]
  ): Promise<EventTemplate> {
    const newTemplate = new EventTemplate()
    newTemplate.userId = user.id
    newTemplate.event = event
    newTemplate.title = title
    return newTemplate.save()
  }

  async updateEventTemplate(
    id: number,
    title: string,
    event: CalendarEventLight[]
  ): Promise<EventTemplate> {
    const template = await this.getEventTemplate(id)

    template.event = event
    template.title = title
    return template.save()
  }
}
