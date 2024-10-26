type Props = {
  title: string
  subLabel?: string
}

export const GeneratePlanningHeader = ({ title, subLabel }: Props) => {
  return (
    <div className="flex flex-row justify-between items-center mb-4 px-[35px]">
      <div>
        <p className="text-h2  font-RecoletaAlt-SemiBold">{title}</p>
        {subLabel && <p className="text-p text-grey-400 font-Inter-Regular">{subLabel}</p>}
      </div>

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
  )
}
