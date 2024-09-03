import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'asms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('email', 254).notNullable()
      table.date('birthday')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.string('first_name')
      table.string('last_name')
      table.string('phone_number')
      table.string('gender')
      table.string('birth_city')
      table.string('address')
      table.string('postal_code')
      table.string('city')
      table.string('paje_number')
      table.string('social_number')
      table.jsonb('settings').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
