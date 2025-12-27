import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEO/SEOHead';
import { FAQSchema, BreadcrumbSchema } from '../components/SEO/StructuredData';

const tips = [
    {
        category: "Visa & Entry",
        icon: "🛂",
        items: [
            { question: "Do I need a visa to visit India?", answer: "Most foreign nationals require a visa. The e-Visa is available for citizens of 150+ countries and can be obtained online in 3-5 days." },
            { question: "How long can I stay on an e-Visa?", answer: "Tourist e-Visas allow stays of up to 90 days (for most nationalities) or 180 days with multiple entries." },
        ]
    },
    {
        category: "Money & Payments",
        icon: "💳",
        items: [
            { question: "What currency is used in India?", answer: "The Indian Rupee (INR/₹). As of 2024, 1 USD ≈ 83 INR. Major cities accept credit cards, but carry cash for smaller vendors." },
            { question: "Should I tip in India?", answer: "Tipping is appreciated but not mandatory. 10% at restaurants is standard. Round up taxi fares." },
        ]
    },
    {
        category: "Health & Safety",
        icon: "🏥",
        items: [
            { question: "Is tap water safe to drink?", answer: "No. Always drink bottled or filtered water. Avoid ice in drinks from street vendors." },
            { question: "What vaccinations do I need?", answer: "Recommended: Hepatitis A & B, Typhoid, and routine vaccines. Consult your doctor 4-6 weeks before travel." },
        ]
    },
    {
        category: "Getting Around",
        icon: "🚂",
        items: [
            { question: "What's the best way to travel between cities?", answer: "India has an extensive railway network. Book trains via IRCTC. Domestic flights are affordable for longer distances." },
            { question: "How do I get around in cities?", answer: "Use Uber/Ola apps for taxis. Auto-rickshaws are cheap for short distances. Metro available in Delhi, Mumbai, Bangalore, etc." },
        ]
    },
    {
        category: "Culture & Etiquette",
        icon: "🙏",
        items: [
            { question: "What should I wear?", answer: "Dress modestly, especially at religious sites. Cover shoulders and knees. Remove shoes before entering temples." },
            { question: "Can I photograph everything?", answer: "Ask permission before photographing people. Photography is banned inside many heritage sites and all monuments." },
        ]
    },
];

const TravelTips = () => {
    const allFaqs = tips.flatMap(category => category.items);

    return (
        <div className="bg-slate-50 min-h-screen">
            <SEOHead
                title="Travel Tips for India - Essential Guide for Visitors"
                description="Everything you need to know before visiting India: visa requirements, money, health, safety, transportation, and cultural etiquette. Your complete travel preparation guide."
                canonical="/travel-tips"
            />
            <FAQSchema faqs={allFaqs} />
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Travel Tips" }
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
                        Prepare for Your Journey
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white mb-6"
                    >
                        Travel Tips for India
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl m-auto"
                    >
                        Essential information to make your Indian adventure smooth, safe, and unforgettable.
                    </motion.p>
                </div>
            </section>

            {/* Tips Grid */}
            <section className="max-w-[1400px] m-auto px-6 md:px-12 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tips.map((category, idx) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100"
                        >
                            <div className="text-4xl mb-4">{category.icon}</div>
                            <h2 className="text-2xl font-serif mb-6 text-slate-900">{category.category}</h2>
                            <div className="space-y-6">
                                {category.items.map((item, i) => (
                                    <div key={i}>
                                        <h3 className="text-slate-900 font-bold text-sm mb-2">{item.question}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{item.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Emergency Info Banner */}
            <section className="bg-slate-900 py-12">
                <div className="max-w-[1400px] m-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-amber-500 text-2xl font-bold mb-2">112</div>
                        <div className="text-slate-400 text-sm">Emergency Helpline</div>
                    </div>
                    <div>
                        <div className="text-amber-500 text-2xl font-bold mb-2">1363</div>
                        <div className="text-slate-400 text-sm">Tourist Helpline</div>
                    </div>
                    <div>
                        <div className="text-amber-500 text-2xl font-bold mb-2">100</div>
                        <div className="text-slate-400 text-sm">Police</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TravelTips;
