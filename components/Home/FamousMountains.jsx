import React from 'react'
import Image from 'next/image'
import { urlFor } from '../../sanity';


const FamousMountains = ({fmountains: mountains }) => {
  return (
    <>
      <div className='max-w-[1240px] px-8 m-auto'>
            <h1 className='text-4xl font-bold text-center mt-10 mb-16'>Famous Mountains</h1>
        </div>
        <div className="max-w-[1240px] py-10 px-8 m-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5 gap-24">
        {/* Card */}
        {
          mountains.map((m) => (
            <div className="rounded-md overflow-hidden shadow-lg cursor-pointer card-size" key={m._id}>
          <Image
            className="w-full scale-100 hover:scale-110 duration-700 "
            src={urlFor(m?.mainImage).url() || "/Home/Taj_mahal.avif"}
            alt={m.title}
            width={285}
            height={190}
          />
          <div className="px-6 py-8">
            <div className="font-bold text-xl mb-2">{
              m.title
            }</div>
            <p className="text-gray-700 text-base">
            {
              m.description
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

export default FamousMountains