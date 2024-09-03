import ChildContract from '#models/child_contract'
import { ChildInformation } from '#types/child_types'
import { BaseModel, column, computed, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import { DateTime } from 'luxon'

export default class Child extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare sex: string

  @column.date()
  declare birth: DateTime

  @column()
  declare color: string

  @column()
  declare sticker: string

  @hasMany(() => ChildContract, { serializeAs: null })
  declare contracts: HasMany<typeof ChildContract>

  @column()
  declare allergies?: ChildInformation[]

  @column()
  declare handicaps?: ChildInformation[]

  @column()
  declare sharedUsers?: number[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare acl_read: number[]

  @column()
  declare acl_write: number[]

  @computed()
  get allContracts() {
    const contracts = this.contracts
    if (!contracts) {
      return undefined
    }

    return {
      active: contracts.filter((contract) => contract.status === 'active'),
      old: contracts.filter((contract) => contract.status === 'old'),
      draft: contracts.filter((contract) => contract.status === 'draft'),
    }
  }
}
