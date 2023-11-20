import React from 'react'
import Image from 'next/image'
import { urlFor } from '../../sanity';

const PopularStates = ({ppstates: states}) => {
    // console.log("pstates ",states)
  return (
    <>
    <div className='max-w-[1240px] px-8 m-auto'>
            <h1 className='text-4xl font-bold text-center mt-10 mb-16'> Popluar States </h1>
        </div>
        <div className="max-w-[1240px] py-10 px-8 m-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5 gap-24">
        {/* Card */}
         {
          states.map((s) => (
            <div className="rounded-md overflow-hidden shadow-lg cursor-pointer card-size lg:min-h-[640px]" key={s._id}>
          <Image
            className="w-full scale-100 hover:scale-110 duration-700 "
            src={urlFor(s?.mainImage).url() || "/Home/Taj_mahal.avif"}
            alt={s.title}
            width={285}
            height={190}
          />
          <div className="px-6 py-8">
            <div className="font-bold text-xl mb-2">{
              s.title
            }</div>
            <p className="text-gray-700 text-base">
            {
              s.description
            }
            </p>
          </div>
        </div>
          ))
        } 
      </div>

      
    </>
  )
}

export default PopularStates
