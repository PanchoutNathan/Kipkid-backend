import { ASMSettings, ParentSettings } from '#types/users'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare userType: string

  @column()
  declare phoneNumber: string

  @column()
  declare avatarUrl: string | null

  @column()
  declare gender: string | null

  @column()
  declare birthCity: string | null

  @column()
  declare address: string | null

  @column()
  declare postalCode: string | null

  @column()
  declare city: string | null

  @column.date()
  declare birthday: DateTime | undefined

  @column()
  declare pajeNumber: string | null

  @column()
  declare socialNumber: string | null

  @column()
  declare validatedEmail: boolean | null

  @column()
  declare email: string

  @column()
  declare settings?: UserSettings

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}

export type UserSettings = {
  asm?: ASMSettings
  parent?: ParentSettings
  [key: string]: any
}
