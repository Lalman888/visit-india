import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEO/SEOHead';
import { BreadcrumbSchema } from '../components/SEO/StructuredData';

const seasons = [
    {
        name: "Winter (Nov - Feb)",
        temp: "10°C - 25°C",
        highlight: "Best Overall",
        color: "bg-blue-500",
        description: "The most popular time to visit India. Pleasant weather across most of the country, perfect for sightseeing, beach holidays, and wildlife safaris.",
        bestFor: ["Rajasthan & Golden Triangle", "Goa Beaches", "Kerala Backwaters", "Wildlife Safaris"],
        festivals: ["Diwali (Oct/Nov)", "Christmas in Goa", "Republic Day (Jan 26)"]
    },
    {
        name: "Spring (Mar - Apr)",
        temp: "20°C - 35°C",
        highlight: "Holi Season",
        color: "bg-pink-500",
        description: "Warming temperatures but still comfortable in the north. The vibrant Holi festival makes this a colorful time to visit.",
        bestFor: ["Himachal Pradesh", "Uttarakhand", "Sikkim", "North East India"],
        festivals: ["Holi (March)", "Ugadi", "Baisakhi"]
    },
    {
        name: "Summer (May - Jun)",
        temp: "25°C - 45°C",
        highlight: "Hill Stations",
        color: "bg-orange-500",
        description: "Hot in the plains but ideal for exploring India's beautiful hill stations and the cooler Himalayan regions.",
        bestFor: ["Ladakh", "Kashmir", "Manali", "Darjeeling", "Ooty"],
        festivals: ["Buddha Purnima", "Rath Yatra"]
    },
    {
        name: "Monsoon (Jul - Sep)",
        temp: "25°C - 35°C",
        highlight: "Lush Landscapes",
        color: "bg-green-500",
        description: "The rainy season transforms India into a lush green paradise. Lower prices and fewer tourists, but expect rain and some travel disruptions.",
        bestFor: ["Kerala (Ayurveda)", "Meghalaya", "Valley of Flowers", "Rajasthan (post-monsoon)"],
        festivals: ["Onam (Kerala)", "Ganesh Chaturthi", "Janmashtami"]
    },
];

const BestTimeToVisit = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <SEOHead
                title="Best Time to Visit India - Season Guide & Festival Calendar"
                description="Plan your India trip with our comprehensive seasonal guide. Discover the best months to visit different regions, weather conditions, and major festivals throughout the year."
                canonical="/best-time-to-visit"
            />
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Best Time to Visit" }
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
                        Plan Your Perfect Trip
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white mb-6"
                    >
                        Best Time to Visit India
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl m-auto"
                    >
                        India is a year-round destination. Each season offers unique experiences, festivals, and landscapes.
                    </motion.p>
                </div>
            </section>

            {/* Season Cards */}
            <section className="max-w-[1400px] m-auto px-6 md:px-12 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {seasons.map((season, idx) => (
                        <motion.div
                            key={season.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100"
                        >
                            <div className={`${season.color} p-6 text-white`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-serif mb-1">{season.name}</h2>
                                        <p className="text-white/80 text-sm">{season.temp}</p>
                                    </div>
                                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                        {season.highlight}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-slate-700 mb-6 leading-relaxed">{season.description}</p>

                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Best Destinations</h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {season.bestFor.map(place => (
                                        <span key={place} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs">
                                            {place}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Major Festivals</h3>
                                <div className="flex flex-wrap gap-2">
                                    {season.festivals.map(fest => (
                                        <span key={fest} className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs">
                                            {fest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Quick Summary */}
            <section className="bg-slate-900 py-16">
                <div className="max-w-[1000px] m-auto px-6 text-center">
                    <h2 className="text-white text-3xl mb-8 font-serif">Quick Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="bg-slate-800 rounded-2xl p-6">
                            <h3 className="text-amber-500 font-bold mb-2">Best for First-Timers</h3>
                            <p className="text-slate-400 text-sm">October to March. Start with the Golden Triangle (Delhi, Agra, Jaipur).</p>
                        </div>
                        <div className="bg-slate-800 rounded-2xl p-6">
                            <h3 className="text-amber-500 font-bold mb-2">Best for Budget Travelers</h3>
                            <p className="text-slate-400 text-sm">Monsoon season (Jul-Sep). Lower prices, fewer crowds, lush scenery.</p>
                        </div>
                        <div className="bg-slate-800 rounded-2xl p-6">
                            <h3 className="text-amber-500 font-bold mb-2">Best for Adventure</h3>
                            <p className="text-slate-400 text-sm">May-June for Ladakh treks. September for Valley of Flowers.</p>
                        </div>
                        <div className="bg-slate-800 rounded-2xl p-6">
                            <h3 className="text-amber-500 font-bold mb-2">Best for Wildlife</h3>
                            <p className="text-slate-400 text-sm">November to April. Tiger reserves are open and animals congregate at waterholes.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BestTimeToVisit;
