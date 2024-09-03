import { PaymentHolidayMode, RestDayMode } from '#types/contract'
import { MealsPrice } from '#types/meals'
import { DTOCreateASM } from '#types/users'

export type ChildContractType = {
  //base
  id: number
  isActive: boolean

  // concerned
  childId: number
  userId: number
  asmId?: number

  //calendar
  startDate: string
  adaptationWeeksCount: number
  tryPeriod: number
  weeksPerYear: number
  schoolWeeksPerYear?: number
  publicHolidaysWorked: PublicHoliday[]

  // Schedule
  minimalCutOffTime: string
  maximalCutOffTime: string
  hoursPerClassicWeek: number
  hoursPerSchoolWeek?: number
  usualCareDays: string[]
  usualRestDay: string

  //allowances
  maintenanceCost: number
  mealCost: MealsPrice[]
  paymentHolidayMode?: PaymentHolidayMode

  //Salary
  brutSalary: number
  netSalary: number
  additionalHours: number
  overtimeHours: number
  restDayMode: RestDayMode
  restDayHoursIncreased?: number
  payDay: number
}

export enum PublicHoliday {
  PENTECOTE = 'pentecote',
  NATIONAL_DAY = 'nationalDay',
  ASSOMPTION = 'assomption',
  TOUSSAINT = 'toussaint',
  ARMISTICE_1918 = 'armistice1918',
  NEW_YEAR_DAY = 'newYearDay',
  EASTER_MONDAY = 'easterMonday',
  LABOR_DAY = 'laborDay',
  WIN_1945 = 'win1945',
  ASCENSION = 'ascension',
}

export type DTOContract = Omit<ChildContractType, 'id' | 'isActive'>
export type DTOContractCreate = Omit<ChildContractType, 'id' | 'isActive' | 'userId'> & {
  asmData: DTOCreateASM
}
export type ContractSlug = Omit<ChildContractType, 'id' | 'isActive'> & {
  id?: number
  isActive?: boolean
}
