import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEO/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '../components/SEO/StructuredData';

const stats = [
  { number: "29", label: "States" },
  { number: "8", label: "Union Territories" },
  { number: "40+", label: "UNESCO Sites" },
  { number: "1.4B", label: "People" },
];

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <SEOHead
        title="About India - A Land of Timeless Heritage"
        description="Discover why India is the world's most fascinating destination. From ancient civilizations to modern marvels, explore the soul of a nation with over 5,000 years of history."
        canonical="/about"
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "About India" }
      ]} />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="/Home/Taj_mahal.avif"
          layout="fill"
          objectFit="cover"
          alt="Taj Mahal at Sunrise"
          priority
          className="brightness-75"
        />
        <div className="absolute inset-0 jaali-overlay opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-amber-500 font-medium tracking-widest uppercase text-sm mb-4 block"
          >
            5,000 Years of Civilization
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-5xl md:text-7xl mb-4"
          >
            About India
          </motion.h1>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-slate-900 py-12">
        <div className="max-w-[1400px] m-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-amber-500 text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-slate-400 uppercase tracking-widest text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-[1000px] m-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="prose prose-lg prose-slate max-w-none"
        >
          <h2 className="font-serif text-4xl mb-8">A Tapestry of Cultures</h2>
          <p className="text-xl leading-relaxed text-slate-700 mb-8">
            India is not just a country—it is a <strong>civilization</strong>. Spanning over 5,000 years, India has been the birthplace of major world religions, groundbreaking scientific discoveries, and a cultural heritage that continues to inspire the world.
          </p>
          <p className="text-lg leading-relaxed text-slate-600 mb-8">
            From the snow-capped peaks of the Himalayas to the tropical beaches of Goa, from the bustling streets of Delhi to the serene backwaters of Kerala, India offers an unparalleled diversity of experiences. Every state, every city, every village has its own story to tell.
          </p>

          <h3 className="font-serif text-3xl mt-16 mb-6">Why Visit India?</h3>
          <ul className="space-y-4 text-slate-700">
            <li><strong>Heritage & History:</strong> Home to 40+ UNESCO World Heritage Sites, including the Taj Mahal, Jaipur, and Hampi.</li>
            <li><strong>Spiritual Journey:</strong> The birthplace of Hinduism, Buddhism, Jainism, and Sikhism. Explore ashrams, temples, and meditation retreats.</li>
            <li><strong>Culinary Adventure:</strong> A food lover&apos;s paradise with cuisines that vary every 100 kilometers.</li>
            <li><strong>Natural Wonders:</strong> From the Thar Desert to the lush Western Ghats, experience breathtaking landscapes.</li>
            <li><strong>Warm Hospitality:</strong> &quot;Atithi Devo Bhava&quot; (The guest is God) - experience the legendary Indian hospitality.</li>
          </ul>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-500 py-20 relative overflow-hidden">
        <div className="absolute inset-0 jaali-overlay opacity-20"></div>
        <div className="max-w-[800px] m-auto px-6 text-center relative z-10">
          <h2 className="text-slate-900 text-4xl md:text-5xl mb-6">Ready to Experience India?</h2>
          <p className="text-slate-800 text-lg mb-10">
            Start planning your journey today and discover why millions of travelers choose India every year.
          </p>
          <Link href="/explore" className="btn-primary !bg-slate-900 !text-white hover:!bg-slate-800">
            Explore Destinations
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;