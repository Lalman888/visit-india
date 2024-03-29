import Head from 'next/head';
import Hero from '../components/Hero';
import Image from 'next/image';
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity"; 
import Link from 'next/link';

export default function Home({placed,temples,forts,mountains,states}) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2021-03-25",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  // console.log("places 1 ", placed);
  return (
    <div className='bg-white text-black' >
      <Head>
        <title>Visit India</title>
        <meta name='description' content='Welcome to Visit India, your ultimate guide to exploring the rich culture and history of India. From the bustling cities to the tranquil countryside, India is a land of diversity and wonder.' />
        
        <link rel='icon' href='/mountain.ico' />
      </Head>
      <Hero heading='Travel India' message='India establishes its identity as the country of architectural masterpieces, making it an ideal travel destination to plan a heritage tour in the world' />
      <div className='max-w-[1240px] py-10 px-8 m-auto'>
          <h1 className='text-4xl font-bold text-center mt-10 mb-16'>About India</h1>
          <p className='text-lg leading-7 font-medium md:pl-10 pb-5' >
          One of the oldest civilisations in the world, India is a mosaic of multicultural experiences. With a rich heritage and myriad attractions, the country is among the most popular tourist destinations in the world. It covers an area of 32, 87,263 sq. km, extending from the snow-covered Himalayan heights to the tropical rain forests of the south. As the 7th largest country in the world, India stands apart from the rest of Asia, marked off as it is by mountains and the sea, which give the country a distinct geographical entity.

          </p>
          <p className='text-lg leading-7 idden md:block font-medium md:pl-10 pb-5' >
          According to the writings known as the Puranas (historical texts written down in the 5th century CE), Bharata conquered the whole subcontinent of India and ruled the land in peace and harmony. The land was, therefore, known as Bharatavarsha {"(`the subcontinent of Bharata')"}. Hominid activity in the Indian subcontinent stretches back over 250,000 years, and it is  one of the oldest inhabited regions on the planet.
          </p>

          <p className='text-lg leading-7 hidden md:block font-medium md:pl-10 pb-5'  >
          The earliest known human remains in South Asia date to about 30,000 years ago; Indus Valley Civilisation sites are from about 3300 BCE. The earliest authenticated human remains in the Indian subcontinent come from the Ochre Cave site in the Bhimbetka rock shelters in Madhya Pradesh, and are estimated to be about 30,000 years old. The Indus Valley Civilisation, one of the oldest civilisations in the world, flourished in the northwestern part of the Indian subcontinent from 3300 BCE to 1300 BCE. The earliest authenticated human remains in South Asia date to about 30,000 years ago; Indus Valley Civilisation sites are from about 3300 BCE. The earliest authenticated human remains in the Indian subcontinent come from the Ochre Cave site in the Bhimbetka rock shelters in Madhya Pradesh, and are estimated to be about 30,000 years old. The Indus Valley Civilisation, one of the oldest civilisations in the world, flourished in the northwestern part of the Indian subcontinent from 3300 BCE to 1300 BCE.
          </p>
          <p className='text-lg leading-7 font-medium md:pl-10 pb-5' >
          It is the birthplace of four great world religions - Hinduism, Jainism, Buddhism, and Sikhism - as well as the philosophical school of Charvaka which influenced the development of scientific thought and inquiry. The inventions and innovations of the people of ancient India include many aspects of modern life taken for granted today including the flush toilet, drainage and sewer systems, public pools, mathematics, veterinary science, plastic surgery, board games, yoga and meditation, as well as many more.
          </p>
      </div>
      {/* <PopularPlaces place={placed} /> */}

      <div className="max-w-[1240px] px-8 m-auto">
        <h1 className="text-4xl font-bold text-center mt-10 mb-16">
          Popular Destinations
        </h1>
      </div>
      <div className="max-w-[1240px] py-10 px-8 m-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5 gap-24">
        {/* Card */}
        
        { 
          placed.map((p) => (
            <Link href={`/explore/${p.stateslug}/${p.slug.current}`} key={p._id}>
            <div className="rounded-md overflow-hidden shadow-lg cursor-pointer card-size lg:min-h-[640px]" >
          <Image
            className="md:w-full scale-100 hover:scale-110 duration-700 "
            src={builder.image(p.mainImage).url() || "/Home/Taj_mahal.avif"}
            alt={p.title}
            width={285}
            height={190}
            style={{height: '198px'}}
          />
          <div className="px-6 py-8">
            <div className="font-bold text-xl mb-2">
              {p.title}
            </div>
            <p className="text-gray-700 text-base">
              {p.description.slice(0, 300)} 
            </p>
          </div>
        </div>
        </Link>
          ))
            
        }
      </div>

      {/* < PopularTemples /> */}

        
      <div className='max-w-[1240px] px-8 m-auto'>
            <h1 className='text-4xl font-bold text-center mt-10 mb-16'>Ancient Temples</h1>
        </div>
        <div className="max-w-[1240px] py-10 px-8 m-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5 gap-24">
        {/* Card */}
        {
          temples.map((t) => (
            <Link href={`/explore/${t.stateslug}/${t.slug.current}`} key={t._id}>
            <div className="rounded-md overflow-hidden shadow-lg cursor-pointer card-size lg:min-h-[640px]" >
          <Image
            className="w-full scale-100 hover:scale-110 duration-700 "
            src={builder.image(t.mainImage).url() || "/Home/Taj_mahal.avif"}
            alt={t.title}
            width={285}
            height={190}
            style={{height: '198px'}}
          />
          <div className="px-6 py-8">
            <div className="font-bold text-xl mb-2">{
              t.title
            }</div>
            <p className="text-gray-700 text-base">
            {
              t.description
            }
            </p>
          </div>
        </div>
        </Link>
          ))
        }
      </div>


      {/* <FamousFort /> */}


      <div className='max-w-[1240px] px-8 m-auto'>
            <h1 className='text-4xl font-bold text-center mt-10 mb-16'>Famous Forts</h1>
        </div>
        <div className="max-w-[1240px] py-10 px-8 m-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5 gap-24">
        {/* Card */}
        {
          forts.map((f) => (
            <Link href={`/explore/${f.stateslug}/${f.slug.current}`} key={f._id}>
            <div className="rounded-md overflow-hidden shadow-lg cursor-pointer card-size lg:min-h-[640px]" >
          <Image
            className="w-full scale-100 hover:scale-110 duration-700 "
            src={builder.image(f.mainImage).url() || "/Home/Taj_mahal.avif"}
            alt={f.title}
            width={285}
            height={190}
            style={{height: '198px'}}
          />
          <div className="px-6 py-8">
            <div className="font-bold text-xl mb-2">{
              f.title
            }</div>
            <p className="text-gray-700 text-base">
            {
              f.description
            }
            </p>
          </div>
        </div>
        </Link>
          ))
        }
      </div>



      {/* <FamousMountains /> */}


      <div className='max-w-[1240px] px-8 m-auto'>
            <h1 className='text-4xl font-bold text-center mt-10 mb-16'>Famous Mountains</h1>
        </div>
        <div className="max-w-[1240px] py-10 px-8 m-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5 gap-24">
        {/* Card */}
        {
          mountains.map((m) => (
            <Link href={`/explore/${m.stateslug}/${m.slug.current}`} key={m._id}>
            <div className="rounded-md overflow-hidden shadow-lg cursor-pointer card-size lg:min-h-[640px]" >
          <Image
            className="w-full scale-100 hover:scale-110 duration-700 "
            src={builder.image(m.mainImage).url() || "/Home/Taj_mahal.avif"}
            alt={m.title}
            width={285}
            height={190}
            style={{height: '198px'}}
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
        </Link>
          ))
        }
      </div>


      {/* Popluar States */}


      <div className='max-w-[1240px] px-8 m-auto'>
            <h1 className='text-4xl font-bold text-center mt-10 mb-16'> Popular States </h1>
        </div>
        <div className="max-w-[1240px] py-10 px-8 m-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5 gap-24">
        {/* Card */}
        {
          states.map((s) => (
            <Link href={`/explore/${s.slug.current}`} key={s._id}>
            <div className="rounded-md overflow-hidden shadow-lg cursor-pointer card-size lg:min-h-[640px]" >
          <Image
            className="w-full scale-100 hover:scale-110 duration-700 "
            src={builder.image(s.mainImage).url() || "/Home/Taj_mahal.avif"}
            alt={s.title}
            width={285}
            height={190}
            style={{height: '198px'}}
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
        </Link>
          ))
        }
      </div>




      



      {/* Blogs */}

      
      
      
    </div>
  );
}

export async function getServerSideProps(context) {
  // console.log("context", context);
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2021-03-25",
    useCdn: false,
  });

  const PopularPlacequery = `*[_type == "place" && popularCount >9 && popularCount < 90 ]`;
  
  const placed = await client.fetch(PopularPlacequery);

  const PopularTemplesquery = `*[_type == "place" && popularCount ==9 ]`;
  const temples = await client.fetch(PopularTemplesquery);

  const PopularFortsquery = `*[_type == "place" && popularCount ==8 ]`;
  const forts = await client.fetch(PopularFortsquery);

  const PopularMountainsquery = `*[_type == "place" && popularCount ==6 ]`;
  const mountains = await client.fetch(PopularMountainsquery);

  const Statequery = `*[_type == "states" && visitedRank < 5 ] | order(visitedRank asc) `;
  const states = await client.fetch(Statequery);
  // console.log("forts", mountains );
  return {
    props: {
      placed,
      temples,
      forts,
      mountains,
      states,

    },
  };
}