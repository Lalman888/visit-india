import Head from 'next/head';
import Hero from '../components/Hero';
import Image from 'next/image';
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home({ placed, temples, forts, mountains, states }) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2021-03-25",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  // console.log("places 1 ", placed);
  return (
    <div className='bg-slate-50 min-h-screen font-sans selection:bg-amber-200'>
      <Head>
        <title>Visit India | Experience the Soul of Bharat</title>
        <meta name='description' content='Discover the timeless heritage, vibrant culture, and breathtaking landscapes of India. A journey through the soul of Bharat.' />
        <link rel='icon' href='/mountain.ico' />
      </Head>

      <Hero
        heading='Unveil the Timeless Heritage of India'
        message='From the snow-capped peaks of the Himalayas to the tranquil backwaters of Kerala, discover a land where every stone tells a story of millennia.'
      />

      {/* Intro Section - Storytelling */}
      <section className='relative py-24 px-6 md:px-12 overflow-hidden'>
        <div className="absolute top-0 right-0 w-1/3 h-full jaali-overlay opacity-10 -scale-x-100"></div>

        <div className='max-w-[1400px] m-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm mb-4 block">The Essence of Bharat</span>
            <h2 className='mb-8 leading-tight'>A Mosaic of Ancient <br /><span className="italic text-slate-400">Civilization & Future</span></h2>
            <div className='space-y-6 text-slate-600 text-lg leading-relaxed'>
              <p>
                India is one of the oldest living civilizations in the world—a cultural mosaic that seamlessly blends millennia-old traditions with modern dynamism. It covers an area of 3.28 million sq. km, extending from the majestic Himalayan heights to the tropical rainforests of the South.
              </p>
              <p className='hidden md:block'>
                The land of Bharatavarsha has been a cradle of profound philosophies, four major world religions, and scientific wonders that have shaped human history. From the architectural marvels of the Mughals to the spiritual depth of the Ganges, India invites you to lose yourself and find your soul.
              </p>
            </div>
            <motion.div
              whileHover={{ x: 10 }}
              className="mt-10"
            >
              <Link href="/about" className="text-slate-900 font-bold flex items-center group">
                Deep Dive into History
                <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Overlapping Image Composition */}
          <div className="relative h-[500px] md:h-[600px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute top-0 right-0 w-4/5 h-4/5 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <Image
                src="/Home/Taj_mahal.avif"
                layout="fill"
                objectFit="cover"
                alt="Taj Mahal"
                className="hover:scale-110 transition-transform duration-1000"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl z-20 border-8 border-slate-50"
            >
              <Image
                src="/Home/golden_temple.webp"
                layout="fill"
                objectFit="cover"
                alt="Golden Temple"
                className="hover:scale-110 transition-transform duration-1000"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Destinations - Bento Grid */}
      <section className="bg-slate-900 py-24 px-6 md:px-12 text-white overflow-hidden relative">
        <div className="absolute inset-0 jaali-overlay opacity-5 pt-20"></div>

        <div className="max-w-[1400px] m-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4">
            <div>
              <span className="text-amber-500 font-medium tracking-widest uppercase text-xs mb-4 block">Curated Collections</span>
              <h2 className="text-white">Popular Destinations</h2>
            </div>
            <Link href="/explore" className="text-slate-400 hover:text-white transition-colors">
              View All Locations <span className="ml-1 text-amber-500">↗</span>
            </Link>
          </div>

          <div className="bento-grid">
            {placed.slice(0, 5).map((p, index) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bento-item group cursor-pointer ${index === 0 ? 'bento-item-large' : index === 1 ? 'bento-item-tall' : ''
                  }`}
              >
                <Link href={`/explore/${p.stateslug}/${p.slug.current}`}>
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={builder.image(p.mainImage).url() || "/Home/Taj_mahal.avif"}
                      layout="fill"
                      objectFit="cover"
                      alt={p.title}
                      className="group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-90"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-8 z-10 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2 block">Destination</span>
                    <h3 className="text-white text-2xl mb-2 font-serif group-hover:translate-x-2 transition-transform">{p.title}</h3>
                    <p className="text-slate-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {p.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured State - Large Showcase */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1400px] m-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="rounded-[40px] overflow-hidden aspect-square relative shadow-3xl"
          >
            <Image
              src={builder.image(states[0]?.mainImage).url() || "/Home/Taj_mahal.avif"}
              layout="fill"
              objectFit="cover"
              alt={states[0]?.title}
              className="hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute top-8 left-8 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-white font-medium border border-white/30">
              Featured State: {states[0]?.title}
            </div>
          </motion.div>

          <div>
            <h2 className="mb-8 font-serif">A Land of Wonders: <br />{states[0]?.title}</h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              {states[0]?.description}
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="border-l-2 border-amber-500 pl-6">
                <span className="text-3xl font-bold text-slate-900 block font-serif">95%</span>
                <span className="text-slate-500 text-sm uppercase tracking-wider">Visitor Satisfaction</span>
              </div>
              <div className="border-l-2 border-slate-200 pl-6">
                <span className="text-3xl font-bold text-slate-900 block font-serif">Top 5</span>
                <span className="text-slate-500 text-sm uppercase tracking-wider">Most Visited Regions</span>
              </div>
            </div>
            <Link href={`/explore/${states[0]?.slug.current}`} className="btn-primary">
              Explore {states[0]?.title}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-[1400px] m-auto bg-amber-500 rounded-[50px] p-12 md:p-24 text-center text-slate-900 relative overflow-hidden group">
          <div className="absolute inset-0 jaali-overlay opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl mb-8">Ready for an adventure <br />of a lifetime?</h2>
            <p className="text-slate-800 text-xl max-w-2xl m-auto mb-12">
              Join thousands of travelers exploring the hidden gems of the Indian subcontinent. Plan your custom journey today.
            </p>
            <Link href="/contact" className="px-12 py-5 bg-slate-900 text-white rounded-full text-lg font-bold hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-2xl">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
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