import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import SEOHead from '../../components/SEO/SEOHead';
import { BreadcrumbSchema } from '../../components/SEO/StructuredData';

const Temples = ({ temples }) => {
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
                title="Ancient Temples of India - Sacred Pilgrimage Sites"
                description="Explore India's magnificent temples, from the ancient rock-cut caves of Ellora to the towering gopurams of South India. Discover sacred sites spanning thousands of years of spiritual heritage."
                canonical="/explore/temples"
            />
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Explore", url: "/explore" },
                { name: "Temples" }
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
                        Sacred Architecture
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white mb-6"
                    >
                        Ancient Temples of India
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl m-auto"
                    >
                        From the intricate carvings of Khajuraho to the spiritual aura of Varanasi, discover India's most revered temples.
                    </motion.p>
                </div>
            </section>

            {/* Temples Grid */}
            <section className="max-w-[1400px] m-auto px-6 md:px-12 py-24">
                {temples && temples.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {temples.map((temple, index) => (
                            <motion.article
                                key={temple._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group bento-item !h-auto flex flex-col"
                            >
                                <div className="relative h-72 overflow-hidden">
                                    <Image
                                        className="group-hover:scale-110 transition-transform duration-700"
                                        src={builder.image(temple.mainImage).url() || "/Home/Taj_mahal.avif"}
                                        alt={temple.title}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-amber-500/90 backdrop-blur-sm text-slate-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                            Temple
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex-grow flex flex-col">
                                    <h3 className="text-2xl mb-4 font-serif text-slate-900 group-hover:text-amber-600 transition-colors">
                                        {temple.title}
                                    </h3>
                                    <p className="text-slate-600 mb-8 line-clamp-3 text-sm leading-relaxed">
                                        {temple.description}
                                    </p>
                                    <div className="mt-auto">
                                        <Link href={`/explore/${temple.stateSlug}/${temple.slug?.current}`} className="inline-flex items-center text-slate-900 font-bold group/link">
                                            Explore Temple
                                            <span className="ml-2 group-hover/link:translate-x-2 transition-transform">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-500">Loading temples...</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Temples;

export async function getServerSideProps() {
    const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: "2021-03-25",
        useCdn: false,
    });

    const temples = await client.fetch(`
    *[_type == "place" && popularCount == 9]{
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
            temples,
        },
    };
}
