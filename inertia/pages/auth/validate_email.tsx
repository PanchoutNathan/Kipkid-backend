import { Head } from '@inertiajs/react'
import { useState } from 'react'

type Props = {
  uid: string
}

export default function Home({ uid }: Props) {
  const [count, setCount] = useState(0)
  return (
    <>
      <Head title="Homepage" />

      <div className="flex flex-col justify-center items-center h-full">
        <div className="">
          Email validé avec succès --- {uid} -- {count}
        </div>
        <button onClick={() => setCount(count + 1)}>Count</button>
      </div>
    </>
  )
}
