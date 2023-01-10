import React from 'react'
import Hero from '../components/Hero'
import Portfolio from '../components/Portfolio'

const work = () => {
  return (
    <div className='bg-white text-black'>
        <Hero heading='My Work' message='This is some of my recent work traveling the world.' />
        <Portfolio />
    </div>
  )
}

export default work