import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.date('birthday')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.boolean('validated_email')
      table.string('first_name')
      table.string('last_name')
      table.string('phone_number')
      table.string('avatar_url')
      table.string('gender')
      table.string('birth_city')
      table.string('address')
      table.string('postal_code')
      table.string('city')
      table.string('paje_number')
      table.string('social_number')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
