import vine from '@vinejs/vine'

export const mealsValidator = vine.object({
  breakfast: vine.boolean(),
  lunch: vine.boolean(),
  tea: vine.boolean(),
  dinner: vine.boolean(),
})

export const carValidator = vine.object({
  distance: vine.number(),
  childCount: vine.number(),
})

export const createCalendarEventValidator = vine.compile(
  vine.object({
    contracts: vine.array(vine.number()),
    dates: vine.array(vine.string()),
    events: vine.array(
      vine.object({
        start: vine.object({ hour: vine.number(), minute: vine.number() }),
        end: vine.object({ hour: vine.number(), minute: vine.number() }),
      })
    ),
    meals: mealsValidator.optional(),
    useTimezone: vine.string(),
  })
)

export const eventsDtoValidator = vine.object({
  start: vine.string(),
  validatedStart: vine.string().optional(),
  validatedEnd: vine.string().optional(),
  end: vine.string(),
})

export const clockInCalendarEventValidator = vine.compile(
  vine.object({
    events: vine.array(eventsDtoValidator),
    meals: mealsValidator.optional(),
  })
)

export const updateCalendarEventValidator = vine.compile(
  vine.object({
    events: vine.array(eventsDtoValidator).optional(),
    meals: mealsValidator.optional(),
    car: carValidator.optional(),
  })
)
