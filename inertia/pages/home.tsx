import { LightEventWithContract, LightEventWithContractByDates } from '#types/calendar_event'
import { Head } from '@inertiajs/react'
import dayjs from 'dayjs'

import fr from 'dayjs/locale/fr'

import localizedFormat from 'dayjs/plugin/localizedFormat'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { useEffect, useMemo, useState } from 'react'

dayjs.extend(localizedFormat)
dayjs.extend(weekOfYear)

dayjs.locale(fr)
type Props = {
  year: number
  month: number
  allEvents: LightEventWithContractByDates
}
export default function Home({ year, month, allEvents }: Props) {
  const [a, setA] = useState(false)
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  const monthStr = dayjs().year(year).month(month).format('MMMM YYYY')

  const data = useMemo(() => {
    let day = dayjs().year(year).month(month).startOf('month')
    let week = day.startOf('week')
    const result = []
    const daysInWeek = [0, 1, 2, 3, 4, 5, 6]
    while (week.month() <= month) {
      const row: {
        week: number
        day: number
        isMonth: boolean
        dateString: string
        events: LightEventWithContract[]
      }[] = []
      daysInWeek.map(() => {
        const dateString = week.format('YYYY-MM-DD')
        const dayEvents = allEvents?.[dateString] ?? []

        row.push({
          events: dayEvents,
          week: week.week(),
          day: week.date(),
          dateString,
          isMonth: week.month() === month,
        })
        week = week.add(1, 'day')
      })
      result.push(row)
    }

    return result
  }, [])

  const getContent = (eventsData: LightEventWithContract[]) => {
    return (
      <div className="p-3">
        {eventsData.map((ev) => {
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

  useEffect(() => {
    setA(true)
  }, [])

  if (!a) {
    return <></>
  }

  return (
    <>
      <Head title="Homepage" />

      <div className="relative w-[297mm] mt-3 h-[210mm] p-3">
        <div className="flex flex-row justify-between mb-4 px-[35px]">
          <p className="text-h2  font-RecoletaAlt-SemiBold">
            {monthStr.charAt(0).toUpperCase() + monthStr.slice(1)}
          </p>

          <div className="gap-1">
            <p className="text-s3 font-Inter-Regular text-grey-700">Gardé par Annabella</p>
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-2 items-center">
                <div className="w-[6px] h-[8px] bg-cerise-500 rounded-lg" />
                <p suppressHydrationWarning className="text-cerise-500 text-s3 font-Inter-Bold ">
                  Dimitri
                </p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-[6px] h-[8px] bg-blue-500 rounded-lg" />
                <p suppressHydrationWarning className="text-blue-500 text-s3 font-Inter-Bold ">
                  Dimitri
                </p>
              </div>
            </div>
          </div>
        </div>

        <table border={1}>
          <thead className="text-grey-600">
            <tr>
              <th className="border-0 text-center w-[35px] text-grey-300" />
              {days.map((day) => (
                <th key={day} className="text-s2 pb-4 font-Inter-Regular text-grey-600">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((da, weekNumberOfmonth) => {
              return (
                <tr key={`week-${weekNumberOfmonth}`} className="text-grey-600">
                  <td className="border-0 text-s3 font-Inter-Bold text-center w-[35px] text-grey-300">
                    {da[0].week}
                  </td>
                  {da.map((day) => {
                    if (day.isMonth) {
                      return (
                        <td key={day.dateString} data-day={day.day}>
                          {getContent(day.events)}
                        </td>
                      )
                    }

                    return <td key={day.dateString}></td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="flex justify-center items-center w-full absolute bottom-[29px]">
          <img width={77} src={'/assets/logotype-houpette.svg'} />
        </div>
      </div>
    </>
  )
}
