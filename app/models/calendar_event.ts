import Contract from '#models/contract'
import type {
  CalendarEventEvent,
  CalendarEventKilometers,
  CalendarEventMeal,
} from '#types/calendar_event'
import { column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'

import { DateTime } from 'luxon'

export default class CalendarEvent {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare date: string

  @column()
  declare meal?: CalendarEventMeal

  @column()
  declare car?: CalendarEventKilometers

  @column({ serialize: (value) => value ?? [] })
  declare events: CalendarEventEvent[]

  @column()
  declare validated?: boolean

  @column()
  declare type: string

  @column()
  declare contractId: number

  @hasOne(() => Contract, { localKey: 'contractId' })
  declare contract: HasOne<typeof Contract>

  @column()
  declare settings?: any

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
