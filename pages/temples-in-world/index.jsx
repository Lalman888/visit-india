import React from 'react'
import Head from 'next/head'

const TemplesInWorld = () => {
  return (
    <>
    <Head>
        <title>Hindu Temples in World</title>
        <meta name="description" content="Hindu Temples in World" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={`flex  transition-all duration-200 ease-linear items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img-w `}>
      {/* Overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/30 z-[2]' />
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
