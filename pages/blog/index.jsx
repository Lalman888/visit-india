import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEO/SEOHead';
import { BreadcrumbSchema } from '../../components/SEO/StructuredData';

// Static blog posts data (can be moved to CMS later)
const blogPosts = [
    {
        slug: "top-10-places-to-visit-in-india",
        title: "Top 10 Must-Visit Places in India 2025",
        excerpt: "From the iconic Taj Mahal to the backwaters of Kerala, discover the most breathtaking destinations that should be on every traveler's bucket list.",
        image: "/Home/Taj_mahal.avif",
        category: "Destinations",
        readTime: "8 min read",
        date: "2024-12-28",
        featured: true,
    },
    {
        slug: "golden-triangle-india-itinerary",
        title: "Golden Triangle India: Complete 7-Day Itinerary",
        excerpt: "The ultimate guide to exploring Delhi, Agra, and Jaipur - India's most famous tourist circuit with day-by-day planning tips.",
        image: "/Home/jal-mahal-bg2.jpg",
        category: "Itineraries",
        readTime: "12 min read",
        date: "2024-12-25",
        featured: true,
    },
    {
        slug: "best-hill-stations-india",
        title: "15 Best Hill Stations in India for a Perfect Getaway",
        excerpt: "Escape the heat and discover India's most scenic hill stations, from Shimla to Munnar, each offering unique mountain experiences.",
        image: "/Home/munnar.webp",
        category: "Nature",
        readTime: "10 min read",
        date: "2024-12-20",
        featured: false,
    },
    {
        slug: "india-travel-guide-2025",
        title: "Complete India Travel Guide 2025",
        excerpt: "Everything you need to know about traveling to India - visas, best time to visit, safety tips, and cultural insights.",
        image: "/Home/varanasi.webp",
        category: "Guides",
        readTime: "15 min read",
        date: "2024-12-15",
        featured: true,
    },
    {
        slug: "best-beaches-in-india",
        title: "12 Best Beaches in India for Sun, Sand & Serenity",
        excerpt: "From Goa's party beaches to Andaman's pristine shores, explore India's most beautiful coastal destinations.",
        image: "/Home/goa.webp",
        category: "Beaches",
        readTime: "9 min read",
        date: "2024-12-10",
        featured: false,
    },
    {
        slug: "spiritual-india-temples-guide",
        title: "Spiritual India: A Guide to the Most Sacred Temples",
        excerpt: "Embark on a spiritual journey through India's most revered temples, from Varanasi to Tirupati.",
        image: "/Home/Konarka_Temple.jpg",
        category: "Spirituality",
        readTime: "11 min read",
        date: "2024-12-05",
        featured: false,
    },
];

const Blog = () => {
    const featuredPosts = blogPosts.filter(p => p.featured);
    const regularPosts = blogPosts.filter(p => !p.featured);

    return (
        <div className="bg-slate-50 min-h-screen">
            <SEOHead
                title="India Travel Blog - Tips, Guides & Inspiration"
                description="Explore our travel blog for in-depth guides, destination tips, and inspiration for your India adventure. From itineraries to cultural insights."
                canonical="/blog"
            />
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Blog" }
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
                        Stories & Guides
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white mb-6"
                    >
                        India Travel Blog
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl m-auto"
                    >
                        In-depth guides, travel tips, and inspiration to help you plan your perfect Indian adventure.
                    </motion.p>
                </div>
            </section>

            {/* Featured Posts */}
            <section className="max-w-[1400px] m-auto px-6 md:px-12 py-20">
                <h2 className="text-3xl font-serif mb-10">Featured Stories</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {featuredPosts.map((post, index) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <div className={`relative overflow-hidden rounded-3xl ${index === 0 ? 'h-[500px]' : 'h-64'}`}>
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8">
                                        <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                            {post.category}
                                        </span>
                                        <h3 className={`text-white mt-4 ${index === 0 ? 'text-3xl' : 'text-xl'} font-serif group-hover:text-amber-400 transition-colors`}>
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-300 text-sm mt-2">{post.readTime}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* All Posts */}
            <section className="max-w-[1400px] m-auto px-6 md:px-12 pb-24">
                <h2 className="text-3xl font-serif mb-10">All Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100"
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">{post.category}</span>
                                        <span className="text-slate-400 text-xs">{post.readTime}</span>
                                    </div>
                                    <h3 className="text-xl font-serif text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm line-clamp-2">{post.excerpt}</p>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Blog;
