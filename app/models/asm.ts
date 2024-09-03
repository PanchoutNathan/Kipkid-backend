import { ASMSettings } from '#types/users'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Asm extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare phoneNumber: string

  @column()
  declare gender: string | null

  @column()
  declare birthCity: string | null

  @column()
  declare address: string | null

  @column()
  declare postalCode: string | null

  @column()
  declare city: string | null

  @column.date()
  declare birthday: DateTime | undefined

  @column()
  declare pajeNumber: string | null

  @column()
  declare socialNumber: string | null

  @column()
  declare email: string

  @column()
  declare settings?: Settings

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}

type Settings = ASMSettings & {
  [key: string]: any
}
