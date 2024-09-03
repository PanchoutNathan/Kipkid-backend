export type ASMSettings = {
  // Paje
  pajeId?: string
  pajeNumber?: string
  agreementNumber?: string
  agreementDate?: string
  renewAgreementDate?: string

  // Assurances
  civilAssuranceNumber?: string
  carAssuranceNumber?: string
}

export type ParentSettings = {
  pajeNumber?: string
  socialNumber?: string
}

export type UserSettings = {
  asm?: ASMSettings
  parent?: ParentSettings
  [key: string]: any
}

export enum Gender {
  BOY = 'boy',
  GIRL = 'girl',
}

export enum UserType {
  PARENT = 'parent',
  ASM = 'asm',
}

export type DTOUpdateUser = {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  gender?: string
  birthCity?: string
  birthday?: Date
  address?: string
  postalCode?: string
  city?: string
  socialNumber?: string
}

export type DTOUpdateParent = DTOUpdateUser & ParentSettings & {}
export type DTOUpdateASM = DTOUpdateUser & ASMSettings & {}
export type DTOCreateASM = DTOUpdateUser & ASMSettings & {}
