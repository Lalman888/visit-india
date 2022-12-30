import React from 'react'
import { useRouter } from 'next/router'

const Place = () => {
    const router = useRouter()
    const { place } = router.query
  return (
    <>
     <div className='lg:pt-[7%] pt-[18%] ' >
        <h1 className='text-5xl lg:pr-28 font-bold text-center'>Place: {place}</h1>
        <h1>Place: {place}</h1>
    </div> 
    </>
  )
}

export default Place
