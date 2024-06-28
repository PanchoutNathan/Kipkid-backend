import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'calendar_events'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('validated')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
