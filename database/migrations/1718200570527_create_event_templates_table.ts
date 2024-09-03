import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'event_templates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('title')
      table.specificType('event', 'jsonb[]')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
    this.schema.alterTable('event_templates', (table) => {
      table.index(['user_id'], 'event_template_user_idindex', 'hash')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
