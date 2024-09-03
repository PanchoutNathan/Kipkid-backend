import ChildContractService from '#services/child_contract_service'
import { createChildContractValidator } from '#validators/child_contract_validators'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ChildContractsController {
  constructor(protected childContractService: ChildContractService) {}

  /**
   * Display a list of resource
   */
  async index({ params }: HttpContext) {
    const childId = params.childId
    return this.childContractService.getAlLChildrenContracts(childId)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createChildContractValidator)
    return this.childContractService.create(payload, user)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const id = params.id
    console.log('---', id)
    return this.childContractService.getById(id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
