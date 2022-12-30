import React from 'react'
import { useRouter } from 'next/router'

const State = () => {
    const router = useRouter()
    const { state } = router.query
    // console.log(state)

  return (
    <div className='lg:pt-[7%] pt-[18%] ' >
        <h1 className='text-5xl lg:pr-28 font-bold text-center '>Place: {state}</h1>
    </div>
  )
}

export default State
