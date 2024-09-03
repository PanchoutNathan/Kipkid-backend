import { Head } from '@inertiajs/react'
import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'

import localizedFormat from 'dayjs/plugin/localizedFormat'
import { useMemo } from 'react'
// import localizedFormat from 'dayjs/plugin/localizedFormat' // ES 2015

dayjs.extend(localizedFormat)

dayjs.locale(fr)

export default function Home(props: { version: number }) {
  const days = [0, 1, 2, 3, 4, 5, 6]
  const weeks = [0, 1, 2, 3, 5]

  const year = 2024
  const month = 8

  const data = useMemo(() => {
    let day = dayjs().year(year).month(month).startOf('month')
    let week = day.startOf('week')
    const result = []
    const daysInWeek = [0, 1, 2, 3, 4, 5, 6]
    while (week.month() <= month) {
      const row: { day: number; isMonth: boolean }[] = []
      daysInWeek.map(() => {
        row.push({ day: week.date(), isMonth: week.month() === month })
        week = week.add(1, 'day')
      })
      result.push(row)
    }

    console.log(result)
    return result
  }, [])

  const getContent = () => {
    return (
      <div className="p-3">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-[6px] h-[8px] bg-blue-500 rounded-lg" />
          <p className="text-[7px] text-blue-500">10h00 - 12h00</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="w-[6px] h-[8px] bg-butter-500 rounded-lg" />
          <p className="text-[7px] text-butter-500">9h00 - 16h00</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="w-[6px] h-[8px] bg-cerise-500 rounded-lg" />
          <p className="text-[7px] text-cerise-500">13h00 - 18h30</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="w-[6px] h-[8px] bg-green-500 rounded-lg" />
          <p className="text-[7px] text-green-500">13h00 - 18h30</p>
        </div>
      </div>
    )
  }
  return (
    <>
      <Head title="Homepage" />

      <div className="">
        <table border={1}>
          <thead className="text-grey-600">
            <tr>
              <th className="border-0 text-center w-[35px] text-grey-300"></th>
              <th>Lun</th>
              <th>Mar</th>
              <th>Mer</th>
              <th>Jeu</th>
              <th>Ven</th>
              <th>Sam</th>
              <th>Dim</th>
            </tr>
          </thead>
          <tbody>
            {data.map((da, weekNumberOfmonth) => {
              return (
                <tr key={`week-${weekNumberOfmonth}`} className="text-grey-600">
                  <td className="border-0 text-center w-[35px] text-grey-300">5</td>
                  {da.map((day, index) => {
                    if (day.isMonth) {
                      return (
                        <td key={day.day} data-day={day.day}>
                          {index === 3 ? getContent() : undefined}
                        </td>
                      )
                    }

                    return <td></td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
