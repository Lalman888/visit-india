import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import Map from "../../../components/Map";
import { PortableText } from "@portabletext/react";
import { RichText } from "../../../components/Richtext";
import Link from "next/link";
import { motion } from "framer-motion";

const Place = ({ placearray, StateNamequery }) => {
  const [StateName, setStateName] = React.useState('')
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2021-03-25",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  const router = useRouter();
  const { place } = router.query;

  const location = {
    lat: placearray.location.lat,
    lng: placearray.location.lng,
  };

  useEffect(() => {
    setStateName(window.location.pathname.split('/')[2]);
  }, [StateName])

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <Head>
        <title>{placearray.title} | Visit India</title>
        <meta name="description" content={placearray.description} />
        <link rel="icon" href="/mountain.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={builder.image(placearray.mainImage).url()}
          layout="fill"
          objectFit="cover"
          alt={placearray.title}
          priority
          className="brightness-75"
        />
        <div className="absolute inset-0 jaali-overlay opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>

        <div className="absolute inset-x-0 bottom-0 py-12 px-6 md:px-12 max-w-[1400px] m-auto">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <ul className="flex items-center space-x-2 text-white/70 text-xs font-bold uppercase tracking-[0.2em]">
              <li><Link href="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li><span className="mx-1">/</span></li>
              <li><Link href="/explore" className="hover:text-amber-500 transition-colors">Explore</Link></li>
              <li><span className="mx-1">/</span></li>
              <li><Link href={`/explore/${StateName}`} className="hover:text-amber-500 transition-colors">{StateName}</Link></li>
            </ul>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-5xl md:text-7xl mb-0"
          >
            {placearray.title}
          </motion.h1>
        </div>
      </section>

      <div className="max-w-[1400px] m-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-16 py-20">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="prose prose-lg prose-slate max-w-none font-serif text-slate-800 leading-relaxed"
          >
            <PortableText value={placearray.body} components={RichText} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="text-3xl mb-8 font-serif border-b border-slate-200 pb-4">Location</h2>
            <div className="rounded-[32px] overflow-hidden shadow-2xl border-8 border-white">
              <Map location={location} zoomLevel={14} />
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 jaali-overlay opacity-10 -mr-16 -mt-16"></div>
            <h3 className="text-xl mb-6 font-serif">Plan Your Visit</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Best Time</p>
                  <p className="text-slate-900 font-medium">October to March</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ideal Duration</p>
                  <p className="text-slate-900 font-medium">2-3 Days</p>
                </div>
              </div>
            </div>
            <button className="btn-primary w-full mt-8">Register for Guide</button>
          </div>

          <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 jaali-overlay opacity-10"></div>
            <h3 className="text-xl mb-4 font-serif relative z-10">Need Assistance?</h3>
            <p className="text-slate-400 text-sm mb-6 relative z-10 leading-relaxed">
              Our travel specialists can help you customize your trip to {placearray.title}.
            </p>
            <Link href="/contact" className="text-amber-500 font-bold hover:text-amber-400 flex items-center relative z-10">
              Contact Us <span className="ml-2">→</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Place;

export async function getServerSideProps(context) {
  const { place } = context.query;
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2021-03-25",
    useCdn: false,
  });

  const Placequery = `*[_type == "place" && slug.current == '${place}'  ][0] `;
  const placearray = await client.fetch(Placequery);

  return {
    props: {
      placearray,
    },
  };
}
