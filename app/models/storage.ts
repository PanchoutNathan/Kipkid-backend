import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Storage extends BaseModel {
  static TABLE = 'storages'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare value: string

  @column()
  declare target: string

  @column()
  declare targetId: number

  @column()
  declare discr: string

  @column()
  declare settings: any

  @column.dateTime()
  declare expireAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
