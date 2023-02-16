import React from 'react'
import StateCard from '../../components/StateCard'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";


const Explore = ({states}) => {
  const client = createClient({
    projectId: "itt58wsk",
    dataset: "production",
    apiVersion: "2022-12-25",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  // console.log("places 1 ", states);
  return (
    <>
    <Head>
        <title>Explore India</title>
        <meta name='description' content='Welcome to Visit India, your ultimate guide to exploring the rich culture and history of India. From the bustling cities to the tranquil countryside, India is a land of diversity and wonder.' />
        <link rel='icon' href='/mountain.ico' />
      </Head>
      <div className='lg:pt-[7%] pt-[36%] bg-white text-black ' >
        <h1 className='text-5xl lg:pr-28 font-bold text-center'>Explore India</h1>
        <p className='text-center lg:pr-28 text-xl py-5'>Explore the beauty of India</p>
        <div className="max-w-[1240px] py-10 px-8 m-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 sm:gap-16 lg:gap-32">
          
          {/* <StateCard /> */}

          {
            states ? states.map((state) => (
              <article className='md:hover:shadow-xl md:duration-700 md:hover:scale-95' key={state._id} >
              <div className="mb-10 overflow-hidden rounded-lg state-size">
              <Image
            className="md:w-full"
            src={builder.image(state.mainImage).url() || "/Home/Taj_mahal.avif"}
            alt={state.title}
            width={326}
            height={217}
          />
                <div className='relative top-3 '>
                  <span className="text-primary bg-[#1324e4] px-3 py-1  text-white text-sm font-semibold">
                      {state.stateCategory}
                  </span>
                </div>
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h5>
                    <p
                      // href="/n"
                      className="text-dark hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                    >
                      {state.title}
                    </p>
                  </h5>
                  <p className="text-body-color mb-7 text-base leading-relaxed">
                    {state.description}
                  </p>
                  <Link href={`/explore/${state.slug.current}`} >
                         {/* rome-ignore lint/a11y/useValidAnchor: <explanation> */}
                         <a className="text-emerald-700 px-5 py-2 hover:text-white hover:bg-emerald-700 border text-base font-semibold cursor-pointer">Read More</a>
                  </Link>
                </div>
              </div>
              </article>
            )) : <h1>loading</h1>
          }
        </div>
      </div>
    </>
  )
}

export default Explore

export async function getServerSideProps(context) {
  console.log("context", context.query);
  const client = createClient({
    projectId: "itt58wsk",
    dataset: "production",
    apiVersion: "2022-12-26",
    useCdn: false,
  });

  const Statequery = `*[_type == "states"  ] | order(title asc)`;
  
  const states = await client.fetch(Statequery);
  // console.log("forts", states );
  return {
    props: {
      states,
    },
  };
}

