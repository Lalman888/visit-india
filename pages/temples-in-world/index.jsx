/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";

const TemplesInWorld = () => {
  return (
    <>
      <Head>
        <title>Hindu Temples in World</title>
        <meta name="description" content="Hindu Temples in World" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`flex  transition-all duration-200 ease-linear items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img-w `}
      >
        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/30 z-[2]" />
        <div className="relative top-[1%] p-5 text-white z-[2] mt-[-10rem]">
          <h1 className="text-5xl lg:text-8xl font-bold">
            {"Hindu Temples in World"}
          </h1>
        </div>
      </div>

      {/* Country wise */}

      <div className="font-semibold text-black text-3xl lg:text-6xl text-center py-5 md:py-8">
        <h2> Country wise </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-10 lg:gap-12 px-5 md:px-10 lg:px-12 lg:pl-16 py-5 md:py-10 lg:py-20">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <div className="group relative xl:w-110 max-w-xs sm:max-w-md h-96 my-5 rounded-md" key={item+1}>
            <img
              className=" object-cover rounded-xl xl:w-110 max-w-md   xl:h-96 "
              src="/Angkorvat.jpg"
            />
            <div className="absolute rounded-xl top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-black/60 opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
              <Link href="/explore">
              <h1 className="text-3xl cursor-pointer lg:text-4xl font-semibold text-white">
                Cambodia
              </h1>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TemplesInWorld;
