import EventTemplateService from '#services/event_template_service'
import { createEventTemplateValidator } from '#validators/event_template_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EventTemplatesController {
  constructor(protected eventTemplateService: EventTemplateService) {}
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    const user = await auth.authenticate()
    return this.eventTemplateService.getUserTemplates(user)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    const user = await auth.authenticate()
    const payload = await request.validateUsing(createEventTemplateValidator)
    return this.eventTemplateService.createUserTemplate(user, payload.title, payload.event)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const id = params.id
    return this.eventTemplateService.getEventTemplate(id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const id = params.id
    const payload = await request.validateUsing(createEventTemplateValidator)
    return this.eventTemplateService.updateEventTemplate(id, payload.title, payload.event)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const id = params.id
    return this.eventTemplateService.removeEventTemplate(id)
  }
}
