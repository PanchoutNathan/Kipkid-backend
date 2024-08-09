import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
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

  async down() {}
}
