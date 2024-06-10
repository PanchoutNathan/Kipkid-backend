import { BaseModel, column } from '@adonisjs/lucid/orm'
import dayjs from 'dayjs'
import { DateTime } from 'luxon'

export default class Contract extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare sex?: string | undefined

  @column()
  declare settings?: object

  @column()
  declare color: string

  @column()
  declare acl_read: number[]

  @column()
  declare acl_write: number[]

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => dayjs(value.toISODate()).format('YYYY-MM-DD'),
  })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
