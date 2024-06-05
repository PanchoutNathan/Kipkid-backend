import Contract from '#models/contract'
import type {
  CalendarEventEvent,
  CalendarEventKilometers,
  CalendarEventMeal,
} from '#types/calendar_event'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'

import { DateTime } from 'luxon'

export default class CalendarEvent extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare date: string

  @column()
  declare meal?: CalendarEventMeal

  @column()
  declare kilometers?: CalendarEventKilometers

  @column({ serialize: (value) => value ?? [] })
  declare events: CalendarEventEvent[]

  @column()
  declare type: string

  @column()
  declare contractId: number

  @hasOne(() => Contract)
  declare profiles: HasOne<typeof Contract>

  @column()
  declare settings?: any

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
