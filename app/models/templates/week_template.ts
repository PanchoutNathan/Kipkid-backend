import { BaseTemplate } from '#models/templates/base_template'
import type { WeekEventsLight } from '#types/calendar_event'
import { column } from '@adonisjs/lucid/orm'

export default class WeekTemplate extends BaseTemplate {
  @column()
  declare event: WeekEventsLight
}
