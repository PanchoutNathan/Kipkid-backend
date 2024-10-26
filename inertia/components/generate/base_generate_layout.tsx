import { PropsWithChildren, useEffect, useState } from 'react'

type Props = {}

export const BaseGenerateLayout = (props: PropsWithChildren<Props>) => {
  const [isInit, setInit] = useState(false)

  useEffect(() => {
    setInit(true)
  }, [])

  if (!isInit) {
    return null
  }

  return (
    <div className="relative w-[297mm] mt-3 h-[210mm] p-3">
      {props.children}
      <div className="flex justify-center items-center w-full absolute bottom-[29px]">
        <img width={77} src={'/assets/logotype-houpette.svg'} />
      </div>
    </div>
  )
}
