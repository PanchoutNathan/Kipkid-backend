import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('birthday')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
