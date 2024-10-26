import { LightEventWithContract } from '#types/calendar_event'
import dayjs from '#utils/custom_dayjs'

type Props = {
  data: LightEventWithContract[]
}

export const PlanningContentCell = ({ data }: Props) => {
  return (
    <div className="p-3">
      {data.map((ev) => {
        return ev.events.map((dayEvent) => {
          const startHour = dayjs(dayEvent.start).format('HH:mm')
          const endHour = dayjs(dayEvent.end).format('HH:mm')
          return (
            <div key={dayEvent.start} className="flex flex-row gap-1 item-">
              <div
                style={{ backgroundColor: ev.contract.child.color }}
                className="w-[6px] h-[9px] rounded-lg"
              />
              <p
                suppressHydrationWarning
                style={{ color: ev.contract.child.color }}
                className="text-[7.8px] text-center"
              >
                {startHour} - {endHour}
              </p>
            </div>
          )
        })
      })}
    </div>
  )
}
