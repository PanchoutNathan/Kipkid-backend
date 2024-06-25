import { BaseTemplate } from '#models/templates/base_template'
import { CalendarEventLight } from '#types/calendar_event'
import { column } from '@adonisjs/lucid/orm'

export default class EventTemplate extends BaseTemplate {
  @column()
  declare event: CalendarEventLight[]
}
