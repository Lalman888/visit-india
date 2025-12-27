import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import PortableText from "react-portable-text"
import Link from "next/link";
import { motion } from "framer-motion";

const State = ({ states, placearray }) => {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2021-03-25",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  const router = useRouter();
  const { state } = router.query;

  return (
    <div className="bg-slate-50 min-h-screen">
      <Head>
        <title>{states.title} | Discover India</title>
        <meta name="description" content={states.description} />
        <link rel="icon" href="/mountain.ico" />
      </Head>

      {/* State Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src={builder.image(states.mainImage).url()}
          layout="fill"
          objectFit="cover"
          alt={states.title}
          priority
          className="brightness-75"
        />
        <div className="absolute inset-0 jaali-overlay opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <ul className="flex items-center space-x-2 text-white/70 text-sm font-medium uppercase tracking-widest">
              <li><Link href="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link href="/explore" className="hover:text-amber-500 transition-colors">Explore</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-amber-500">{states.title}</li>
            </ul>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-6xl md:text-8xl mb-4"
          >
            {states.title}
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-amber-500"
          ></motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-[1000px] m-auto px-6 py-24">
        <div className="prose prose-lg prose-slate max-w-none">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-700 leading-relaxed font-serif text-xl md:text-2xl"
          >
            <PortableText
              content={states.body}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              serializers={{
                h5: (props) => <h5 className="text-amber-600 font-bold mt-12 mb-4 uppercase tracking-widest text-sm" {...props} />,
                li: ({ children }) => <li className="mb-2 list-disc ml-6">{children}</li>,
                ul: ({ children }) => <ul className="my-6">{children}</ul>,
                normal: ({ children }) => <p className="mb-8">{children}</p>,
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Places to Visit Grid */}
      <section className="bg-slate-900 py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 jaali-overlay opacity-5 pt-32"></div>

        <div className="max-w-[1400px] m-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-medium tracking-widest uppercase text-sm mb-4 block">Unforgettable Experiences</span>
            <h2 className="text-white">Places to Visit in {states.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placearray.place.map((t, index) => (
              <motion.article
                key={t._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bento-item !bg-slate-800 border-slate-700 relative overflow-hidden rounded-3xl"
              >
                <Link href={`/explore/${state}/${t.slug.current}`}>
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      className="group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                      src={builder.image(t.mainImage).url() || "/Home/Taj_mahal.avif"}
                      alt={t.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-white text-2xl mb-4 font-serif group-hover:text-amber-500 transition-colors">
                      {t.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                      {t.description}
                    </p>
                    <div className="flex items-center text-amber-500 font-bold group/btn">
                      Discover Details
                      <span className="ml-2 group-hover/btn:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
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

  return {
    props: {
      states,
      placearray
    },
  };
}
