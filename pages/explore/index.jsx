import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import StateCard from "../../components/StateCard";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Explore = ({ states }) => {
  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2021-03-25",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Head>
        <title>Explore the States of India | Visit India</title>
        <meta
          name="description"
          content="Journey through the diverse states of India, from the majestic mountains to the serene shores."
        />
        <link rel="icon" href="/mountain.ico" />
      </Head>

      {/* Header Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 jaali-overlay opacity-10 pointer-events-none"></div>
        <div className="max-w-[1400px] m-auto px-6 md:px-12 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-amber-500 font-medium tracking-widest uppercase text-sm mb-4 block"
          >
            A Continent of Diversity
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white mb-6"
          >
            Explore India by States
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl m-auto mb-10"
          >
            Each state offers a unique tapestry of architecture, cuisine, and traditions.
            Begin your discovery below.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl m-auto"
          >
            <form onSubmit={handleSubmit} className="relative group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a state or destination..."
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-8 py-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white/15 transition-all backdrop-blur-sm"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-amber-500 rounded-xl text-slate-900 hover:bg-amber-400 transition-colors">
                <BsSearch size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* States Grid */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {states ? (
            states.map((state, index) => (
              <motion.article
                key={state._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bento-item !h-auto flex flex-col"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    className="group-hover:scale-110 transition-transform duration-700"
                    src={builder.image(state.mainImage).url() || "/Home/Taj_mahal.avif"}
                    alt={state.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500/90 backdrop-blur-sm text-slate-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {state.stateCategory || 'State'}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl mb-4 font-serif text-slate-900 group-hover:text-amber-600 transition-colors">
                    {state.title}
                  </h3>
                  <p className="text-slate-600 mb-8 line-clamp-3 text-sm leading-relaxed">
                    {state.description}
                  </p>
                  <div className="mt-auto">
                    <Link href={`/explore/${state.slug.current}`} className="inline-flex items-center text-slate-900 font-bold group/link">
                      Explore State
                      <span className="ml-2 group-hover/link:translate-x-2 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 m-auto mb-4"></div>
              <p className="text-slate-500">Loading states...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Explore;

export async function getServerSideProps(context) {
  // console.log("context", context.query);
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2021-03-25",
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
