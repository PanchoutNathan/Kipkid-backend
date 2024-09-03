import { PublicHoliday } from '#types/child_contract'
import { PaymentHolidayMode, RestDayMode } from '#types/contract'
import { asmSchema } from '#validators/user_validators'
import vine from '@vinejs/vine'

export const createChildContractValidator = vine.compile(
  vine.object({
    childId: vine.number(),
    asmData: asmSchema,
    startDate: vine.string(),
    adaptationWeeksCount: vine.number(),
    tryPeriod: vine.number(),
    weeksPerYear: vine.number(),
    schoolWeeksPerYear: vine.number().optional(),
    publicHolidaysWorked: vine.array(vine.enum(PublicHoliday)),
    minimalCutOffTime: vine.string(),
    maximalCutOffTime: vine.string(),
    hoursPerClassicWeek: vine.number(),
    hoursPerSchoolWeek: vine.number().optional(),
    usualCareDays: vine.array(vine.string()),
    usualRestDay: vine.string(),
    maintenanceCost: vine.number(),
    mealCost: vine.array(vine.any()),
    paymentHolidayMode: vine.enum(PaymentHolidayMode).optional(),
    brutSalary: vine.number(),
    netSalary: vine.number(),
    additionalHours: vine.number(),
    overtimeHours: vine.number(),
    restDayMode: vine.enum(RestDayMode),
    restDayHoursIncreased: vine.number().optional(),
    payDay: vine.number(),
  })
)
