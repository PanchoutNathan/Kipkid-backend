import { Head } from '@inertiajs/react'
import { useState } from 'react'

export default function ValidateEmailExpired() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Head title="Homepage" />

      <div className="flex flex-col justify-center items-center h-full">
        <div className="">L'email est expiré en vrai wesh {count}</div>
        <button onClick={() => setCount(count + 1)}>Count</button>
      </div>
    </>
  )
}
