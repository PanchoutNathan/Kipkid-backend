import WeekTemplateTemplateService from '#services/week_template_service'
import { WeekEventsLight } from '#types/calendar_event'
import { createWeekTemplateValidator } from '#validators/week_template_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class WeekTemplatesController {
  constructor(protected weekTemplateService: WeekTemplateTemplateService) {}
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    const user = await auth.authenticate()
    return this.weekTemplateService.getUserWeekTemplates(user)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    const user = await auth.authenticate()

    const payload = await request.validateUsing(createWeekTemplateValidator)
    console.log('payload', payload)
    return this.weekTemplateService.creatWeekTemplate(
      user,
      payload.title,
      payload.event as WeekEventsLight
    )
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const id = params.id
    return this.weekTemplateService.getWeekTemplate(id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const id = params.id
    const payload = await request.validateUsing(createWeekTemplateValidator)
    return this.weekTemplateService.updateWeekTemplate(
      id,
      payload.title,
      payload.event as WeekEventsLight
    )
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const id = params.id
    await this.weekTemplateService.removeEventTemplate(id)
    return { id: id }
  }
}
