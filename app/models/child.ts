import { ChildInformation } from '#types/child_types'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Child extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare sex: string

  @column.date({
    serialize: (value) => value.toFormat('dd LLL yyyy'),
  })
  declare birth: DateTime

  @column()
  declare color: string

  @column()
  declare allergies?: ChildInformation[]

  @column()
  declare handicaps?: ChildInformation[]

  @column()
  declare sharedUsers?: number[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare acl_read: number[]

  @column()
  declare acl_write: number[]
}
