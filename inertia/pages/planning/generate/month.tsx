import { LightEventWithContractByDates } from '#types/calendar_event'
import { Head } from '@inertiajs/react'
import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'

import localizedFormat from 'dayjs/plugin/localizedFormat'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { useMemo } from 'react'
import { BaseGenerateLayout } from '~/components/generate/base_generate_layout'

import { GeneratePlanningHeader } from '~/components/generate/planning/generate_planning_header'
import { PlanningTableHeaderDays } from '~/components/generate/planning/planning_table_header_days'
import {
  PlanningRowData,
  PlanningTableRow,
} from '~/components/generate/planning/planning_table_row'

dayjs.extend(localizedFormat)
dayjs.extend(weekOfYear)

dayjs.locale(fr)
type Props = {
  year: number
  month: number
  allEvents: LightEventWithContractByDates
}
export default function PlanningGenerateMonth({ year, month, allEvents }: Props) {
  const monthStr = dayjs().year(year).month(month).format('MMMM YYYY')

  const data = useMemo(() => {
    let day = dayjs().year(year).month(month).startOf('month')

    let week = day.startOf('week')
    const result = []
    let count = 0
    const daysInWeek = [0, 1, 2, 3, 4, 5, 6]

    const hasContinue = () => {
      if (month === 11 && week.month() === 0) return false
      else if (month === 0 && week.month() === 11) return true
      else if (week.month() <= month) return true
      else {
        console.log(month, week.month())
        return false
      }
    }

    let continueWhile = hasContinue()
    console.log(continueWhile)
    while (continueWhile) {
      const row: PlanningRowData[] = []
      daysInWeek.map(() => {
        const dateString = week.format('YYYY-MM-DD')
        const dayEvents = allEvents?.[dateString] ?? []
        row.push({
          events: dayEvents,
          week: week.week(),
          day: week.date(),
          dateString,
          isConcerned: week.month() === month,
        })
        week = week.add(1, 'day')
        console.log(week.format('MMMM DDDD'))
        count++
      })
      continueWhile = hasContinue()
      result.push(row)
    }

    return result
  }, [])

  return (
    <>
      <Head title="Planning - Mois" />
      <BaseGenerateLayout>
        <GeneratePlanningHeader title={monthStr.charAt(0).toUpperCase() + monthStr.slice(1)} />

        <table border={1}>
          <PlanningTableHeaderDays />
          <tbody>
            {data.map((da, weekNumberOfmonth) => {
              return (
                <PlanningTableRow
                  key={weekNumberOfmonth}
                  weekNumberOfmonth={weekNumberOfmonth}
                  data={da}
                />
              )
            })}
          </tbody>
        </table>
      </BaseGenerateLayout>
    </>
  )
}
