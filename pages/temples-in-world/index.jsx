import React from 'react'

const TemplesInWorld = () => {
  return (
    <>
    <div className={`flex  transition-all duration-200 ease-linear items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img-w `}>
      {/* Overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]' />
      <div className='relative top-[1%] p-5 text-white z-[2] mt-[-10rem]'>
        <h2 className='text-5xl font-bold'>
            {"Hindu Temples in World"}
        </h2>

      </div>
    </div>
    </>
  )
}

export default TemplesInWorld
