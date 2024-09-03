import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'child_contracts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      // Concerned
      table.integer('child_id').unsigned().references('id').inTable('children')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('asm_id').unsigned().references('id').inTable('asms')

      //Calendar
      table.date('start_date')
      table.date('end_date').nullable()
      table.integer('adaptation_weeks_count')
      table.integer('try_period')
      table.integer('weeks_per_year')
      table.float('school_weeks_per_year')
      table.specificType('public_holidays_worked', 'integer[]')

      //Schedule
      table.time('minimal_cut_off_time')
      table.time('maximal_cut_off_time')
      table.float('hours_per_classic_week')
      table.float('hours_per_school_week')
      table.specificType('usual_care_days', 'text[]')
      table.text('usual_rest_day')

      // Allowances
      table.float('maintenance_cost')
      table.specificType('meal_cost', 'jsonb[]')
      table.enum('payment_holiday_mode', ['monthly', 'yearly', 'full_year_contract'])

      // Salary
      table.float('brut_salary')
      table.float('net_salary')
      table.float('additional_hours')
      table.float('overtime_hours')
      table.enum('rest_day_mode', ['pay', 'rest'])
      table.float('rest_day_hours_increased')
      table.integer('pay_day')

      table.specificType('acl_read', 'integer[]')
      table.specificType('acl_write', 'integer[]')

      // extra
      table.boolean('is_active').nullable()

      table.jsonb('complements')
      table.jsonb('settings')
    })

    this.schema.alterTable('asms', (table) => {
      table.integer('child_contract_id').unsigned().references('child_contracts.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
