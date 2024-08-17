import User from '#models/user'
import { DTOUpdateUser } from '#types/users'
import { Nullable } from '#types/utils'
import { removeEmpty } from '#utils/clean'

import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'

@inject()
export default class UserService {
  async getUserByEmail(email: string): Promise<Nullable<User>> {
    return User.findBy('email', email)
  }

  async updateUser(id: number, payload: DTOUpdateUser): Promise<User> {
    const user = await User.findOrFail(id)
    console.log(removeEmpty(payload))
    user.merge(removeEmpty(payload))
    if (payload.birthday) {
      user.birthday = DateTime.fromJSDate(payload.birthday)
    }
    await user.save()
    return user
  }

  async checkEmailExist(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email)
    return !!user
  }
}
