import { LightEventWithContract } from '#types/calendar_event'
import { PlanningContentCell } from '~/components/generate/planning/planning_content_cell'

export type PlanningRowData = {
  week: number
  day: number
  isConcerned: boolean
  dateString: string
  events: LightEventWithContract[]
}

type Props = {
  data: PlanningRowData[]
  weekNumberOfmonth: number
}

export const PlanningTableRow = ({ data, weekNumberOfmonth }: Props) => {
  return (
    <tr key={`week-${weekNumberOfmonth}`} className="text-grey-600">
      <td className="border-0 text-s3 font-Inter-Bold text-center w-[35px] text-grey-300">
        {data[0].week}
      </td>
      {data.map((day) => {
        if (day.isConcerned) {
          return (
            <td key={day.dateString} data-day={day.day}>
              <PlanningContentCell data={day.events} />
            </td>
          )
        }

        return <td key={day.dateString}></td>
      })}
    </tr>
  )
}
