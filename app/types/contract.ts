import { colors } from '#constants/Colors'

export type Contract = {
  id: string
  firstName: string
  lastName: string
  sex: ContractSex
  color: string
  settings?: any
}

export enum ContractSex {
  BOY = 'boy',
  GIRL = 'girl',
}

export const BOY_CONTRACT: Contract = {
  id: '1',
  firstName: 'Dimitri',
  lastName: 'Delavega',
  color: colors.blue['500'],
  sex: ContractSex.BOY,
}
export const GIRL_CONTRACT: Contract = {
  id: '2',
  firstName: 'Mavis',
  lastName: 'Delavega',
  color: Colors.cerise['500'],
  sex: ContractSex.GIRL,
}

export const ALL_CONTRACTS: Contract[] = [BOY_CONTRACT, GIRL_CONTRACT]
