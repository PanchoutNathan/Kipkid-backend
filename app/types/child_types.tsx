export type ChildInformation = {
  name: string
  description: string
}

export enum ChildSex {
  GIRL = 'girl',
  BOY = 'boy',
}

export type DTOCreateChild = {
  lastName: string
  firstName: string
  sex: string
  birth: Date
  color: string
  allergies?: ChildInformation[]
  handicaps?: ChildInformation[]
}

export type DTOUpdateChild = DTOCreateChild & {}
