import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import PortableText from "react-portable-text"
import Link from "next/link";

const State = ({states,placearray}) => {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2021-03-25",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  const router = useRouter();
  const { state } = router.query;
  
  // console.log('states', states)
  // console.log('placearray', placearray.place)
  // console.log('placearray p', placearray)

  return (
    <>
      <Head>
        <title>{state}</title>
        <meta name="description" content="Welcome to Visit India, your ultimate guide to exploring the rich culture and history of India. From the bustling cities to the tranquil countryside, India is a land of diversity and wonder." />
        <link rel="icon" href="/mountain.ico" />
      </Head>
      <div className="lg:pt-[2%] pt-[8%] bg-white text-black ">
        <div className="flex  transition-all duration-200 ease-linear items-center justify-center h-[68vh] bg-local bg-center bg-cover  "
        style={{backgroundImage: `url('${builder.image(states.mainImage).url()}')`}}
        >
          <div className='absolute top-[4%] h-[68vh] left-0 right-0 bottom-0 bg-black/20 z-[2]' />
          <div className="relative top-[1%] p-5 text-white z-[2] mt-[-10rem]">
            <h1 className="lg:text-8xl text-3xl font-bold">{states.title}</h1>
          </div>
        </div>
         <div className="max-w-7xl mx-auto px-4 py-9 sm:px-6 lg:px-8 text-black">
            <div className="py-10">
            <div className="py-4">
              <div className="text-sm breadcrumbs">
              <ul>
                  <li>
                <Link href="/">
                  <p className="text-gray-500 hover:text-gray-900">Home</p>
                </Link>
                </li>
                <li>
                <Link href="/explore">
                  <p className="text-gray-500 hover:text-gray-900">Explore</p>
                </Link>
                </li>
                <li>
                   {states.title}
                </li>
              </ul>
                </div>
                </div>
               <div className="lg:text-lg text-sm leading-7 font-medium pb-5 ">
               <PortableText
              // Pass in block content straight from Sanity.io
              content={states.body}
              projectId="itt58wsk"
              dataset="production"
              // Optionally override marks, decorators, blocks, etc. in a flat
              // structure without doing any gymnastics
              serializers={{
                h5: (props) => <h5 style={{ color: "red" }} {...props} />,
                li: ({ children }) => <li className="special-list-item">{children}</li>,
                ul: ({ children }) => <ul className="special-list">{children}</ul>,
                span: ({ children }) => <span className="special-span">{children}</span>,
              }}
            />
               </div>
            </div>
            <div className="pb-10">
                 <h2 className="lg:text-7xl text-xl flex justify-center leading-6 font-semibold "> 
                 Places to Visit
                  </h2>  

            </div>
            <div className="pb-10 ">

            <div className="max-w-7xl py-10  m-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 lg:gap-8 gap-24">
        {/* Card */}
        {
          placearray.place.map((t) => (
            <div className="rounded-md overflow-hidden shadow-lg card-size" key={t._id}>
          <Image
            className="w-full scale-100 hover:scale-110 duration-700 "
            src={builder.image(t.mainImage).url() || "/Home/Taj_mahal.avif"}
            alt={t.title}
            width={285}
            height={190}
            style={{height: '210px'}}
          />
          <Link href={`/explore/${state}/${t.slug.current}`}>
          <div className="px-6 py-8 cursor-pointer">
            <div className="font-bold text-xl mb-2">{
              t.title
            }</div>
            <p className="text-gray-700 text-base">
            {
              t.description
            }
            </p>
          </div>
          </Link>
        </div>
          ))
        }
      </div>

 
            </div>
          </div>

      </div>
    </>
  );
};

export default State;

export async function getServerSideProps(context) {
  const { state } = context.query;
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2021-03-25",
    useCdn: false,
  });
  // console.log('state', state)

  const Statequery = `*[_type == "states" && slug.current == '${state}'  ][0] `;
  const states = await client.fetch(Statequery);

  const placearray = await client.fetch(
    `*[_type=="states" && slug.current == '${state}'][0]{
      "place": *[_type=='place' && references(^._id)]{ 
        ...,
        slug
      }
      
    }`
  );
  // console.log('placearray p', placearray)
  // console.log('states q', states)

  return {
    props: {
      states,
      placearray
    },
  };
}



