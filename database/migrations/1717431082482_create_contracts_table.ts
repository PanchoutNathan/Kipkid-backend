import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contracts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('last_name').notNullable()
      table.string('first_name').nullable()
      table.string('sex').notNullable()
      table.string('color').nullable()
      table.jsonb('settings').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at')
      table.specificType('acl_read', 'integer[]')
      table.specificType('acl_write', 'integer[]')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
