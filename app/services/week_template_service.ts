import NotFoundException from '#exceptions/not_found_exception'
import WeekTemplate from '#models/templates/week_template'
import User from '#models/user'
import WeekTemplateQuery from '#queries/week_template_query'
import { WeekEventsLight } from '#types/calendar_event'

export default class WeekTemplateTemplateService {
  constructor() {}

  async getUserWeekTemplates(user: User): Promise<WeekTemplate[]> {
    return await WeekTemplateQuery.new().fromUser(user).query
  }

  async getWeekTemplate(id: number): Promise<WeekTemplate> {
    const template = await WeekTemplate.find(id)

    if (!template) {
      throw new NotFoundException("this week template dosn't exist")
    }

    return template
  }

  async removeEventTemplate(id: number): Promise<void> {
    const template = await this.getWeekTemplate(id)
    await template.delete()
  }

  async creatWeekTemplate(
    user: User,
    title: string,
    event: WeekEventsLight
  ): Promise<WeekTemplate> {
    const newTemplate = new WeekTemplate()
    newTemplate.userId = user.id
    newTemplate.event = event
    newTemplate.title = title
    return newTemplate.save()
  }

  async updateWeekTemplate(
    id: number,
    title: string,
    event: WeekEventsLight
  ): Promise<WeekTemplate> {
    const template = await this.getWeekTemplate(id)
    template.event = event
    template.title = title
    return template.save()
  }
}
