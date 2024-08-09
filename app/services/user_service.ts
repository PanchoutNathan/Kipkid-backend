import User from '#models/user'
import { Nullable } from '#types/utils'
import { inject } from '@adonisjs/core'

@inject()
export default class UserService {
  async getUserByEmail(email: string): Promise<Nullable<User>> {
    return User.findBy('email', email)
  }

  async checkEmailExist(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email)
    return !!user
  }
}
