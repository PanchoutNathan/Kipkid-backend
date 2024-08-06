import NotFoundException from '#exceptions/not_found_exception'
import Child from '#models/child'
import User from '#models/user'
import ChildQuery from '#queries/child_query'
import { DTOCreateChild, DTOUpdateChild } from '#types/child_types'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

@inject()
export default class ChildService {
  constructor(protected ctx: HttpContext) {}

  get user() {
    return this.ctx.auth.user
  }

  async getAllChilds(): Promise<Child[]> {
    const user = await this.ctx.auth.authenticate()
    const result = await ChildQuery.new(user).canRead()?.query
    return result ?? []
  }

  async getById(id: number): Promise<Child> {
    const child = await Child.find(id)

    if (!child) {
      throw new NotFoundException("this child dosn't exist")
    }

    return child
  }

  async create(payload: DTOCreateChild, user: User): Promise<Child> {
    const child = new Child()
    child.firstName = payload.firstName
    child.lastName = payload.lastName
    child.sex = payload.sex
    child.color = payload.color
    child.allergies = payload.allergies
    child.handicaps = payload.handicaps
    child.acl_read = [user.id]
    child.acl_write = [user.id]
    child.birth = DateTime.fromJSDate(payload.birth)
    return child
  }

  async update(id: number, payload: DTOUpdateChild): Promise<Child> {
    const child = await this.getById(id)
    child.firstName = payload.firstName
    child.lastName = payload.lastName
    child.sex = payload.sex
    child.color = payload.color
    child.allergies = payload.allergies
    child.handicaps = payload.handicaps
    child.birth = DateTime.fromJSDate(payload.birth)
    return child
  }

  async remove(id: number): Promise<Child> {
    const child = await this.getById(id)
    await child.delete()
    return child
  }
}
