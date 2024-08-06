import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'children'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('firstName')
      table.string('lastName')
      table.string('sex')
      table.string('color')
      table.date('birth')
      table.specificType('allergies', 'jsonb[]').nullable()
      table.specificType('handicaps', 'jsonb[]').nullable()
      table.specificType('sharedUsers', 'integer[]').nullable()
      table.specificType('acl_read', 'integer[]')
      table.specificType('acl_write', 'integer[]')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
