type Props = {}

export const PlanningTableHeaderDays = (props: Props) => {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  return (
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
  )
}
