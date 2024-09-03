import ASMModel from '#models/asm'
import Child from '#models/child'
import User from '#models/user'
import { PaymentHolidayMode, RestDayMode } from '#types/contract'
import { MealsPrice } from '#types/meals'
import { BaseModel, column, computed, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'

import { DateTime } from 'luxon'

export default class ChildContract extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare childId: number

  @column()
  declare asmId?: number

  @hasOne(() => User, { localKey: 'userId', foreignKey: 'id' })
  declare user: HasOne<typeof User>

  @hasOne(() => Child, { localKey: 'childId', foreignKey: 'id' })
  declare child: HasOne<typeof Child>

  @hasOne(() => ASMModel, { localKey: 'asmId', foreignKey: 'id' })
  declare asm: HasOne<typeof ASMModel>

  @column.dateTime()
  declare startDate: DateTime

  @column.dateTime()
  declare endDate?: DateTime

  @column()
  declare isActive: boolean

  @column()
  declare adaptationWeeksCount: number

  @column()
  declare tryPeriod: number

  @column()
  declare weeksPerYear: number

  @column()
  declare schoolWeeksPerYear?: number

  @column()
  declare publicHolidaysWorked: string[]

  @column()
  declare minimalCutOffTime: string

  @column()
  declare maximalCutOffTime: string

  @column()
  declare hoursPerClassicWeek: number

  @column()
  declare hoursPerSchoolWeek?: number

  @column()
  declare usualCareDays: string[]

  @column()
  declare usualRestDay: string

  @column()
  declare maintenanceCost: number

  @column()
  declare mealCost: MealsPrice[]

  @column()
  declare paymentHolidayMode?: PaymentHolidayMode

  @column()
  declare brutSalary: number

  @column()
  declare netSalary: number

  @column()
  declare additionalHours: number

  @column()
  declare overtimeHours: number

  @column()
  declare restDayMode: RestDayMode

  @column()
  declare restDayHoursIncreased?: number

  @column()
  declare payDay: number

  @column()
  declare acl_read: number[]

  @column()
  declare acl_write: number[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @computed()
  get status() {
    if (this.isActive && !this.endDate) {
      return 'active'
    } else if (this.endDate) {
      return 'old'
    } else {
      return 'draft'
    }
  }
}
