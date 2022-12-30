import React from 'react'
import Link from 'next/link'

const StateCard = () => {
  return (
    <>
    <article className='hover:shadow-2xl duration-700 hover:scale-105' >
        <div className="mb-10 overflow-hidden rounded-lg">
          <img
            src="/Home/Konarka_Temple.jpg"
            alt="image"
            className="w-full hover:scale-105 duration-500"
          />
          <div className='relative top-3 '>
            <span className="text-primary bg-[#1324e4] px-3 py-1  text-white text-sm font-semibold">
                Uttar Pradesh
            </span>
          </div>
          <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
            <h3>
              <a
                href="/n"
                className="text-dark hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
              >
                The ultimate UX and UI guide to card design
              </a>
            </h3>
            <p className="text-body-color mb-7 text-base leading-relaxed">
              Lorem ipsum dolor sit amet pretium consectetur adipiscing elit.
              Lorem consectetur adipiscing elit.
            </p>
            <Link href="/" >
                   {/* rome-ignore lint/a11y/useValidAnchor: <explanation> */}
                   <a className="text-primary px-5 py-2 hover:text-white hover:bg-black border text-base font-semibold cursor-pointer">Read More</a>
            </Link>
          </div>
        </div>
        </article>
      
    </>
  )
}

export default StateCard
