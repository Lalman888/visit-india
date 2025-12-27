import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import SEOHead from '../../components/SEO/SEOHead';
import { BreadcrumbSchema } from '../../components/SEO/StructuredData';

const Nature = ({ mountains }) => {
    const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: "2021-03-25",
        useCdn: false,
    });
    const builder = imageUrlBuilder(client);

    return (
        <div className="bg-slate-50 min-h-screen">
            <SEOHead
                title="Natural Wonders of India - Mountains, Beaches & Wildlife"
                description="Experience India's breathtaking natural beauty. From the Himalayan peaks to tropical beaches, explore pristine landscapes, national parks, and diverse ecosystems."
                canonical="/explore/nature"
            />
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Explore", url: "/explore" },
                { name: "Natural Wonders" }
            ]} />

            {/* Hero */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 jaali-overlay opacity-10"></div>
                <div className="max-w-[1400px] m-auto px-6 md:px-12 relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-amber-500 font-medium tracking-widest uppercase text-sm mb-4 block"
                    >
                        Pristine Landscapes
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white mb-6"
                    >
                        Natural Wonders of India
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl m-auto"
                    >
                        From the snow-capped Himalayas to lush Western Ghats, discover India&apos;s extraordinary natural diversity.
                    </motion.p>
                </div>
            </section>

            {/* Nature Grid */}
            <section className="max-w-[1400px] m-auto px-6 md:px-12 py-24">
                {mountains && mountains.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {mountains.map((place, index) => (
                            <motion.article
                                key={place._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group bento-item !h-auto flex flex-col"
                            >
                                <div className="relative h-72 overflow-hidden">
                                    <Image
                                        className="group-hover:scale-110 transition-transform duration-700"
                                        src={builder.image(place.mainImage).url() || "/Home/Taj_mahal.avif"}
                                        alt={place.title}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-green-500/90 backdrop-blur-sm text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                            Nature
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex-grow flex flex-col">
                                    <h3 className="text-2xl mb-4 font-serif text-slate-900 group-hover:text-amber-600 transition-colors">
                                        {place.title}
                                    </h3>
                                    <p className="text-slate-600 mb-8 line-clamp-3 text-sm leading-relaxed">
                                        {place.description}
                                    </p>
                                    <div className="mt-auto">
                                        <Link href={`/explore/${place.stateSlug}/${place.slug?.current}`} className="inline-flex items-center text-slate-900 font-bold group/link">
                                            Explore Destination
                                            <span className="ml-2 group-hover/link:translate-x-2 transition-transform">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-500">Loading natural wonders...</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Nature;

export async function getServerSideProps() {
    const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: "2021-03-25",
        useCdn: false,
    });

    const mountains = await client.fetch(`
    *[_type == "place" && popularCount == 6]{
      _id,
      title,
      description,
      slug,
      mainImage,
      "stateSlug": *[_type == "states" && references(^._id)][0].slug.current
    }
  `);

    return {
        props: {
            mountains,
        },
    };
}
