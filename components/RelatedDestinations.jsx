import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Displays related destinations to improve internal linking and reduce bounce rate
 */
const RelatedDestinations = ({ destinations, currentSlug, builder }) => {
    if (!destinations || destinations.length === 0) return null;

    // Filter out current destination and limit to 3
    const related = destinations
        .filter(d => d.slug?.current !== currentSlug)
        .slice(0, 3);

    if (related.length === 0) return null;

    return (
        <section className="mt-20 pt-16 border-t border-slate-200">
            <h2 className="text-3xl font-serif mb-10 text-center">
                You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((place, index) => (
                    <motion.article
                        key={place._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                    >
                        <Link href={`/explore/${place.stateSlug}/${place.slug?.current}`}>
                            <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                                <Image
                                    src={builder?.image(place.mainImage).url() || "/Home/Taj_mahal.avif"}
                                    alt={place.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-lg font-serif text-slate-900 group-hover:text-amber-600 transition-colors">
                                {place.title}
                            </h3>
                            <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                                {place.description}
                            </p>
                        </Link>
                    </motion.article>
                ))}
            </div>
        </section>
    );
};

export default RelatedDestinations;
