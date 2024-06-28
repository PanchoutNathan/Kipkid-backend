export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  TEA = 'tea',
  DINNER = 'dinner',
}

export const getOrderedMealType = () => {
  return [
    {
      type: MealType.BREAKFAST,
      icon: 'food-petit-dej',
      label: 'Petit-dejeuné',
    },
    {
      type: MealType.LUNCH,
      icon: 'food-dej',
      label: 'Dejeuné',
    },
    {
      type: MealType.TEA,
      icon: 'food-gouter',
      label: 'Petit-dejeuné',
    },
    {
      type: MealType.DINNER,
      icon: 'food-dinner',
      label: 'Dinner',
    },
  ]
}

export type SelectedMeals = {
  [MealType.BREAKFAST]: boolean
  [MealType.LUNCH]: boolean
  [MealType.TEA]: boolean
  [MealType.DINNER]: boolean
}

export const getDefaultSelectedMeal = (): SelectedMeals => {
  return {
    [MealType.BREAKFAST]: false,
    [MealType.LUNCH]: false,
    [MealType.TEA]: false,
    [MealType.DINNER]: false,
  }
}
