import React,{useEffect} from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import Map from "../../../components/Map";
import { PortableText } from "@portabletext/react";
import { RichText } from "../../../components/Richtext";
import Link from "next/link";

const Place = ({ placearray }) => {
  const [StateName, setStateName] = React.useState('')
  const client = createClient({
    projectId: "itt58wsk",
    dataset: "production",
    apiVersion: "2022-12-25",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  const router = useRouter();
  const { place } = router.query;
  // console.log('placearray  ', StateNamequery)
  console.log('place  ', placearray)
  const location = {
    lat: placearray.location.lat,
    lng: placearray.location.lng,
  };
  useEffect(() => {
    setStateName(window.location.pathname.split('/')[2]);
    console.log('StateName', StateName.toUpperCase())
  }, [StateName])

  return (
    <>
      <Head>
        <title>{place}</title>
        <meta name="description" content="Welcome to Visit India, your ultimate guide to exploring the rich culture and history of India. From the bustling cities to the tranquil countryside, India is a land of diversity and wonder." />
        <link rel="icon" href="/mountain.ico" />
      </Head>
      <div className="lg:pt-[2%] pt-[8%]  bg-white text-black">
        <div
          className="flex  transition-all duration-200 ease-linear items-center justify-center h-[68vh] bg-local bg-center bg-cover  "
          style={{
            backgroundImage: `url('${builder
              .image(placearray.mainImage)
              .url()}')`,
          }}
        >
          <div className="absolute top-[4%] h-[68vh] left-0 right-0 bottom-0 bg-black/20 z-[2]" />
          <div className="relative top-[1%] p-5 text-white z-[2] mt-[-10rem]">
            <h1 className="lg:text-8xl text-3xl font-bold text-center max-w-7xl">
              {placearray.title}
            </h1>
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
                    <Link href={`/explore/${StateName}`}>
                      <p className="text-gray-500 hover:text-gray-900">{StateName.charAt(0).toUpperCase() + StateName.slice(1)}</p>
                    </Link>
                  </li>
                  <li>
                    {placearray.title}
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:text-lg text-sm leading-7 font-medium pb-5 ">
              <PortableText value={placearray.body} components={RichText} />
            </div>
          </div>
          <div className="pb-10 ">
            <h1 className="lg:text-4xl text-xl font-bold pb-5">Location</h1>
            <Map location={location} zoomLevel={12} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Place;

export async function getServerSideProps(context) {
  const { place } = context.query;
  const client = createClient({
    projectId: "itt58wsk",
    dataset: "production",
    apiVersion: "2022-12-26",
    useCdn: false,
  });

  const Placequery = `*[_type == "place" && slug.current == '${place}'  ][0] `;
  const placearray = await client.fetch(Placequery);
  const StateNamequery =  await client.fetch(`*[_type == "place" && slug.current == '${place}'][0] {
    "stateName": *[_type == "state" && references(^._id)]{
      ...,
      title
    }
  } `);
  // console.log('placearray', StateNamequery)

  return {
    props: {
      placearray,
      StateNamequery
    },
  };
}
