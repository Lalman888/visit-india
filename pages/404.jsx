import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEO/SEOHead';

const popularLinks = [
    { title: "Explore All States", href: "/explore" },
    { title: "About India", href: "/about" },
    { title: "Travel Tips", href: "/travel-tips" },
    { title: "Best Time to Visit", href: "/best-time-to-visit" },
];

const Custom404 = () => {
    return (
        <div className="bg-slate-900 min-h-screen flex items-center justify-center">
            <SEOHead
                title="Page Not Found - 404"
                description="The page you're looking for doesn't exist. Explore India's beautiful destinations instead."
                noIndex={true}
            />

            <div className="absolute inset-0 jaali-overlay opacity-10"></div>

            <div className="relative z-10 text-center px-6 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8"
                >
                    <span className="text-[150px] md:text-[200px] font-bold text-amber-500/20 leading-none block">404</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white text-4xl md:text-5xl font-serif mb-6 -mt-20"
                >
                    Lost in India?
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-400 text-lg mb-10"
                >
                    The path you seek does not exist. But don't worry—there are countless beautiful destinations waiting for you.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {popularLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors"
                        >
                            {link.title}
                        </Link>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link href="/" className="btn-accent">
                        Return Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Custom404;
