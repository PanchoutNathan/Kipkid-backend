import { LightEventWithContractByDates } from '#types/calendar_event'
import dayjs from '#utils/custom_dayjs'
import { Head } from '@inertiajs/react'

import { useMemo } from 'react'
import { BaseGenerateLayout } from '~/components/generate/base_generate_layout'
import { GeneratePlanningHeader } from '~/components/generate/planning/generate_planning_header'
import { PlanningTableHeaderDays } from '~/components/generate/planning/planning_table_header_days'
import {
  PlanningRowData,
  PlanningTableRow,
} from '~/components/generate/planning/planning_table_row'

type Props = {
  year: number
  week: number
  allEvents: LightEventWithContractByDates
}
export default function PlanningGenerateWeek({ year, week, allEvents }: Props) {
  const monthStr = dayjs().year(year).week(week).startOf('week').format('MMMM YYYY')
  const data = useMemo(() => {
    let date = dayjs().year(year).week(week).startOf('week')

    const result = []
    const daysInWeek = [0, 1, 2, 3, 4, 5, 6]
    const row: PlanningRowData[] = []

    daysInWeek.map(() => {
      const dateString = date.format('YYYY-MM-DD')
      const dayEvents = allEvents?.[dateString] ?? []

      row.push({
        events: dayEvents,
        week: date.week(),
        day: date.date(),
        dateString,
        isConcerned: date.week() === week,
      })
      date = date.add(1, 'day')
    })
    result.push(row)

    return result[0]
  }, [])

  return (
    <>
      <Head title="Planning - week" />
      <BaseGenerateLayout>
        <GeneratePlanningHeader
          subLabel={`Semaine ${week}`}
          title={monthStr.charAt(0).toUpperCase() + monthStr.slice(1)}
        />

        <div className="mt-6">
          <table border={1}>
            <PlanningTableHeaderDays />
            <tbody>
              <PlanningTableRow weekNumberOfmonth={week} data={data} />
            </tbody>
          </table>
        </div>
      </BaseGenerateLayout>
    </>
  )
}
