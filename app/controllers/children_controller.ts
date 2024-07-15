import ChildService from '#services/child_service'
import { createChildValidator } from '#validators/child_validators'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ChildrenController {
  constructor(protected childService: ChildService) {}
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return this.childService.getAllChilds()
  }

  /**
   * Display form to create a new record
   */
  async store({ request, auth }: HttpContext) {
    const user = await auth.authenticate()
    const payload = await request.validateUsing(createChildValidator)
    return this.childService.create(payload, user)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const id = params.id
    return this.childService.getById(id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const id = params.id
    const payload = await request.validateUsing(createChildValidator)
    return this.childService.update(id, payload)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const id = params.id
    return this.childService.remove(id)
  }
}
