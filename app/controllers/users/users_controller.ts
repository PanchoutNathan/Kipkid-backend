import UserService from '#services/user_service'
import { checkEmailExist } from '#validators/auth'
import { updateUserValidator } from '#validators/user_validators'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}

  /**
   * Return list of all posts or paginate through
   * them
   */
  async index({}: HttpContext) {}

  /**
   * Handle form submission to create a new post
   */
  async store({ request }: HttpContext) {}

  /**
   * Display a single post by id.
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle the form submission to update a specific post by id
   */
  async update({ params, request }: HttpContext) {
    const id = params.id
    const payload = await request.validateUsing(updateUserValidator)

    return this.userService.updateUser(id, payload)
  }

  /**
   * Handle the form submission to delete a specific post by id.
   */
  async destroy({ params }: HttpContext) {}

  async checkIfAlreadyExist({ request }: HttpContext) {
    try {
      await request.validateUsing(checkEmailExist)
      return false
    } catch (e) {
      return true
    }
  }
}
