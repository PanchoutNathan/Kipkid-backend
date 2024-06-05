import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('calendar_events', (table) => {
      table.index(['date'], 'event_calendar_date_index', 'btree')
    })
  }

  async down() {
    this.schema.alterTable('calendar_events', (table) => {
      table.dropIndex(['date'], 'event_calendar_date_index')
    })
  }
}
