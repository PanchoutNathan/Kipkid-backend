import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'calendar_events'

  //  "id" uuid not null default gen_random_uuid(),
  // "created_at" timestamp with time zone not null default now(),
  // "events" jsonb[],
  // "date" date,
  // "meal" jsonb,
  // "kilometers" jsonb,
  // "settings" jsonb,
  // "contract" uuid not null
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.specificType('events', 'jsonb[]')
      table.string('date')
      table.jsonb('meal')
      table.jsonb('car')
      table.jsonb('settings')
      table.text('type')
      table.integer('contract_id').unsigned().references('id').inTable('child_contracts')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
