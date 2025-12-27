import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SEOHead from '../../components/SEO/SEOHead';
import { BreadcrumbSchema } from '../../components/SEO/StructuredData';
import { getMultipleWikipediaSummaries } from '../../lib/wikipedia';

// Blog posts content
const blogContent = {
    "top-10-places-to-visit-in-india": {
        title: "Top 10 Must-Visit Places in India 2025",
        excerpt: "From the iconic Taj Mahal to the backwaters of Kerala, discover the most breathtaking destinations.",
        image: "/Home/Taj_mahal.avif",
        category: "Destinations",
        readTime: "8 min read",
        date: "December 28, 2024",
        author: "Visit India Team",
        authorImage: "/logo.png",
        tableOfContents: [
            { id: "taj-mahal", title: "1. Taj Mahal, Agra" },
            { id: "jaipur", title: "2. Jaipur, Rajasthan" },
            { id: "varanasi", title: "3. Varanasi" },
            { id: "kerala", title: "4. Kerala Backwaters" },
            { id: "ladakh", title: "5. Ladakh" },
            { id: "goa", title: "6. Goa" },
            { id: "jaisalmer", title: "7. Jaisalmer" },
            { id: "hampi", title: "8. Hampi" },
            { id: "darjeeling", title: "9. Darjeeling" },
            { id: "ranthambore", title: "10. Ranthambore" },
            { id: "planning", title: "Planning Your Trip" },
        ],
        sections: [
            {
                type: 'lead',
                content: "India is a land of incredible diversity, where ancient history meets vibrant modernity. With countless destinations to explore, choosing where to go can be overwhelming. Here's our curated list of the top 10 places you absolutely must visit in 2025.",
            },
            {
                id: 'taj-mahal',
                title: '1. Taj Mahal, Agra',
                search: 'Taj Mahal',
                content: "No visit to India is complete without seeing the <strong>Taj Mahal</strong>. This ivory-white marble mausoleum, built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal, is widely considered the greatest architectural achievement in the world.",
                tip: "Pro Tip: The best time to visit is at sunrise when the monument glows pink and orange.",
            },
            {
                id: 'jaipur',
                title: '2. Jaipur, Rajasthan',
                search: 'Hawa Mahal',
                content: "The \"Pink City\" is a photographer's paradise. Explore the magnificent <strong>Amber Fort</strong>, the astronomical marvel of Jantar Mantar, and the stunning Hawa Mahal (Palace of Winds). Don't miss the vibrant bazaars selling traditional textiles and jewelry.",
            },
            {
                id: 'varanasi',
                title: '3. Varanasi, Uttar Pradesh',
                search: 'Varanasi',
                content: "One of the world's oldest continuously inhabited cities, Varanasi is India's spiritual heart. Witness the mesmerizing <strong>Ganga Aarti ceremony</strong> at sunset, take a boat ride at dawn, and explore the labyrinthine old city lanes.",
            },
            {
                id: 'kerala',
                title: '4. Kerala Backwaters',
                search: 'Kerala backwaters',
                content: "Cruise through the serene backwaters on a traditional houseboat. The palm-fringed waterways of <strong>Alleppey and Kumarakom</strong> offer a glimpse into timeless Kerala village life.",
            },
            {
                id: 'ladakh',
                title: '5. Ladakh',
                search: 'Ladakh',
                content: "For adventure seekers, Ladakh offers dramatic high-altitude landscapes, ancient Buddhist monasteries, and some of the world's most challenging mountain passes. The best time to visit is May to September.",
            },
            {
                id: 'goa',
                title: '6. Goa',
                search: 'Goa beach',
                content: "India's beach paradise offers something for everyone – from party beaches in the north to serene coves in the south. Explore Portuguese heritage in Old Goa and enjoy world-class seafood.",
            },
            {
                id: 'jaisalmer',
                title: '7. Jaisalmer, Rajasthan',
                search: 'Jaisalmer Fort',
                content: "The \"Golden City\" rises from the Thar Desert like a mirage. Stay in the stunning Jaisalmer Fort, one of the few living forts in the world, and experience a camel safari in the sand dunes.",
            },
            {
                id: 'hampi',
                title: '8. Hampi, Karnataka',
                search: 'Hampi',
                content: "This UNESCO World Heritage Site is the ruined capital of the Vijayanagara Empire. Explore hundreds of temples, monuments, and sculptures scattered across a surreal boulder-strewn landscape.",
            },
            {
                id: 'darjeeling',
                title: '9. Darjeeling, West Bengal',
                search: 'Darjeeling Himalayan Railway',
                content: "Famous for its tea plantations and views of Kanchenjunga, the world's third-highest peak, Darjeeling is a charming hill station with colonial-era architecture and the iconic toy train.",
            },
            {
                id: 'ranthambore',
                title: '10. Ranthambore National Park',
                search: 'Ranthambore National Park',
                content: "One of the best places in India to spot tigers in the wild. This former royal hunting ground is now a premier wildlife sanctuary home to leopards, crocodiles, and hundreds of bird species.",
            },
            {
                id: 'planning',
                title: 'Planning Your Trip',
                search: 'Tourism in India',
                content: "The best time to visit most of India is from <strong>October to March</strong> when the weather is pleasant. Book accommodations and train tickets well in advance, especially during peak season. Consider hiring a local guide to get deeper insights into each destination's history and culture.",
            }
        ],
        relatedPosts: ["golden-triangle-india-itinerary", "best-hill-stations-india"],
    },
    "golden-triangle-india-itinerary": {
        title: "Golden Triangle India: Complete 7-Day Itinerary",
        excerpt: "The ultimate guide to exploring Delhi, Agra, and Jaipur.",
        image: "/Home/jal-mahal-bg2.jpg",
        category: "Itineraries",
        readTime: "12 min read",
        date: "December 25, 2024",
        author: "Visit India Team",
        authorImage: "/logo.png",
        tableOfContents: [
            { id: "delhi", title: "Day 1-2: Delhi" },
            { id: "agra", title: "Day 3-4: Agra" },
            { id: "jaipur", title: "Day 5-7: Jaipur" },
            { id: "tips", title: "Pro Tips" },
        ],
        content: `
      <p class="lead">The Golden Triangle is India's most famous tourist circuit, connecting Delhi, Agra, and Jaipur. This 7-day itinerary will help you experience the best of each city without feeling rushed.</p>
      
      <h2 id="delhi">Day 1-2: Delhi</h2>
      <h3>Old Delhi</h3>
      <p>Start with a rickshaw ride through <strong>Chandni Chowk</strong>, visit the magnificent Jama Masjid, and explore the Red Fort. End with street food at Paranthe Wali Gali.</p>
      <h3>New Delhi</h3>
      <p>Visit India Gate, <strong>Humayun's Tomb</strong> (a precursor to the Taj Mahal), and the Lotus Temple. Don't miss Qutub Minar, the tallest brick minaret in the world.</p>
      
      <h2 id="agra">Day 3-4: Agra</h2>
      <h3>Taj Mahal</h3>
      <p>Arrive early for sunrise views. Spend at least 2-3 hours exploring the complex.</p>
      <blockquote>💡 Tip: Friday is closed for visitors due to prayers at the mosque.</blockquote>
      <h3>Agra Fort</h3>
      <p>This massive red sandstone fort offers stunning views of the Taj Mahal from across the river.</p>
      <h3>Fatehpur Sikri</h3>
      <p>A half-day trip to this abandoned Mughal city is highly recommended.</p>
      
      <h2 id="jaipur">Day 5-7: Jaipur</h2>
      <h3>Amber Fort</h3>
      <p>Take an elephant or jeep ride up to this majestic fort. The mirror work in Sheesh Mahal is breathtaking.</p>
      <h3>City Palace</h3>
      <p>Still home to the royal family, this palace complex showcases Rajasthani architecture and art.</p>
      <h3>Hawa Mahal</h3>
      <p>Visit early morning for the best photos without crowds.</p>
      <h3>Nahargarh Fort</h3>
      <p>Perfect for sunset views over the city.</p>
      
      <h2 id="tips">Pro Tips</h2>
      <ul>
        <li>Hire a guide at major monuments to understand the history</li>
        <li>Carry water bottles – it can get very hot</li>
        <li>Dress modestly at religious sites</li>
        <li>Book trains on the IRCTC website in advance</li>
      </ul>
    `,
        relatedPosts: ["top-10-places-to-visit-in-india", "india-travel-guide-2025"],
    },
    "best-hill-stations-india": {
        title: "15 Best Hill Stations in India for a Perfect Getaway",
        excerpt: "Escape the heat and discover India's most scenic mountain retreats.",
        image: "/Home/munnar.webp",
        category: "Nature",
        readTime: "10 min read",
        date: "December 20, 2024",
        author: "Visit India Team",
        authorImage: "/logo.png",
        tableOfContents: [
            { id: "north-india", title: "North India" },
            { id: "south-india", title: "South India" },
            { id: "east-india", title: "East India" },
            { id: "best-time", title: "Best Time to Visit" },
        ],
        content: `
      <p class="lead">India's hill stations offer a perfect escape from the summer heat, with cool climes, stunning views, and colonial-era charm. Here are the best hill stations to visit.</p>
      
      <h2 id="north-india">North India</h2>
      <h3>1. Shimla, Himachal Pradesh</h3>
      <p>The former summer capital of British India, Shimla offers colonial architecture, scenic toy train rides, and pine-covered hills.</p>
      
      <h3>2. Manali, Himachal Pradesh</h3>
      <p>A backpacker's paradise with adventure sports, ancient temples, and proximity to the Rohtang Pass.</p>
      
      <h3>3. Mussoorie, Uttarakhand</h3>
      <p>Known as the "Queen of Hills," Mussoorie offers stunning views of the Himalayas and charming colonial heritage.</p>
      
      <h3>4. Nainital, Uttarakhand</h3>
      <p>Built around a pristine lake, Nainital is perfect for boating, trekking, and temple visits.</p>
      
      <h2 id="south-india">South India</h2>
      <h3>5. Munnar, Kerala</h3>
      <p>Famous for its tea plantations, Munnar offers misty hills, spice gardens, and wildlife sanctuaries.</p>
      
      <h3>6. Ooty, Tamil Nadu</h3>
      <p>The "Queen of the Nilgiris" features botanical gardens, a historic toy train, and tea estates.</p>
      
      <h3>7. Coorg, Karnataka</h3>
      <p>Coffee plantations, waterfalls, and Tibetan monasteries make Coorg a unique hill station experience.</p>
      
      <h2 id="east-india">East India</h2>
      <h3>8. Darjeeling, West Bengal</h3>
      <p>World-famous tea, the iconic toy train, and views of Kanchenjunga await in Darjeeling.</p>
      
      <h3>9. Shillong, Meghalaya</h3>
      <p>The "Scotland of the East" offers living root bridges, stunning caves, and the cleanest village in Asia.</p>
      
      <h2 id="best-time">Best Time to Visit</h2>
      <p>Most hill stations are best visited between <strong>March and June</strong>, and <strong>September to November</strong>. Avoid monsoon season (July-August) due to landslides in some areas.</p>
    `,
        relatedPosts: ["top-10-places-to-visit-in-india", "india-travel-guide-2025"],
    },
    "india-travel-guide-2025": {
        title: "Complete India Travel Guide 2025",
        excerpt: "Everything you need to know about traveling to India.",
        image: "/Home/varanasi.webp",
        category: "Guides",
        readTime: "15 min read",
        date: "December 15, 2024",
        author: "Visit India Team",
        authorImage: "/logo.png",
        tableOfContents: [
            { id: "visa", title: "Visa Requirements" },
            { id: "best-time", title: "Best Time to Visit" },
            { id: "transport", title: "Getting Around" },
            { id: "health", title: "Health & Safety" },
            { id: "culture", title: "Cultural Tips" },
        ],
        content: `
      <p class="lead">Planning a trip to India can seem daunting, but this comprehensive guide covers everything you need to know for a smooth and unforgettable journey.</p>
      
      <h2 id="visa">Visa Requirements</h2>
      <p>Most nationalities can apply for an <strong>e-Visa</strong> online. Tourist e-Visas are typically valid for 30 days, 1 year, or 5 years. Apply at least 7 days before your trip.</p>
      
      <h2 id="best-time">Best Time to Visit</h2>
      <p><strong>October to March:</strong> Best overall weather for most of India.</p>
      <p><strong>April to June:</strong> Hot, but ideal for hill stations and Ladakh.</p>
      <p><strong>July to September:</strong> Monsoon – lush landscapes but some travel disruptions.</p>
      
      <h2 id="transport">Getting Around</h2>
      <p><strong>Flights:</strong> Domestic flights are affordable. Book via MakeMyTrip or Ixigo.</p>
      <p><strong>Trains:</strong> The extensive rail network is the best way to see the country. Book on IRCTC.</p>
      <p><strong>Local Transport:</strong> Use Uber/Ola in cities. Auto-rickshaws for short distances.</p>
      
      <h2 id="health">Health & Safety</h2>
      <ul>
        <li>Drink only bottled or filtered water</li>
        <li>Carry hand sanitizer</li>
        <li>Travel insurance is essential</li>
        <li>Keep copies of important documents</li>
      </ul>
      
      <h2>Money</h2>
      <p>Currency is Indian Rupee (INR). ATMs are widely available in cities. Credit cards accepted in major hotels and restaurants. Carry cash for smaller vendors.</p>
      
      <h2 id="culture">Cultural Tips</h2>
      <ul>
        <li>Remove shoes before entering temples and homes</li>
        <li>Dress modestly, especially at religious sites</li>
        <li>Ask permission before photographing people</li>
        <li>Bargain at markets but be respectful</li>
      </ul>
    `,
        relatedPosts: ["golden-triangle-india-itinerary", "best-hill-stations-india"],
    },
    "best-beaches-in-india": {
        title: "12 Best Beaches in India for Sun, Sand & Serenity",
        excerpt: "Explore India's most beautiful coastal destinations.",
        image: "/Home/goa.webp",
        category: "Beaches",
        readTime: "9 min read",
        date: "December 10, 2024",
        author: "Visit India Team",
        authorImage: "/logo.png",
        tableOfContents: [
            { id: "goa", title: "Goa Beaches" },
            { id: "andaman", title: "Andaman Islands" },
            { id: "kerala", title: "Kerala Coast" },
            { id: "best-time", title: "Best Time to Visit" },
        ],
        content: `
      <p class="lead">India has over 7,500 km of coastline, offering diverse beach experiences from party hotspots to secluded paradises.</p>
      
      <h2 id="goa">Goa</h2>
      <h3>1. Palolem Beach</h3>
      <p>A crescent-shaped bay with calm waters, perfect for swimming and kayaking.</p>
      
      <h3>2. Anjuna Beach</h3>
      <p>Famous for its flea market and vibrant nightlife scene.</p>
      
      <h2 id="andaman">Andaman Islands</h2>
      <h3>3. Radhanagar Beach</h3>
      <p>Consistently ranked among <strong>Asia's best beaches</strong>, with pristine white sand and turquoise waters.</p>
      
      <h3>4. Neil Island</h3>
      <p>Perfect for snorkeling with coral reefs just offshore.</p>
      
      <h2 id="kerala">Kerala</h2>
      <h3>5. Varkala Beach</h3>
      <p>Dramatic cliffs overlooking a golden beach, with healing mineral springs nearby.</p>
      
      <h2>Karnataka</h2>
      <h3>6. Gokarna</h3>
      <p>A spiritual town with several unspoiled beaches, popular with backpackers.</p>
      
      <h2 id="best-time">Best Time to Visit</h2>
      <p>October to March is ideal for most Indian beaches. The Andamans are best visited between November and May.</p>
    `,
        relatedPosts: ["top-10-places-to-visit-in-india", "india-travel-guide-2025"],
    },
    "spiritual-india-temples-guide": {
        title: "Spiritual India: A Guide to the Most Sacred Temples",
        excerpt: "Embark on a spiritual journey through India's most revered temples.",
        image: "/Home/Konarka_Temple.jpg",
        category: "Spirituality",
        readTime: "11 min read",
        date: "December 5, 2024",
        author: "Visit India Team",
        authorImage: "/logo.png",
        tableOfContents: [
            { id: "north", title: "Northern India" },
            { id: "south", title: "Southern India" },
            { id: "east", title: "Eastern India" },
            { id: "etiquette", title: "Temple Etiquette" },
        ],
        content: `
      <p class="lead">India is the birthplace of several major world religions, and its temples are among the most architecturally stunning and spiritually significant in the world.</p>
      
      <h2 id="north">Northern India</h2>
      <h3>Kashi Vishwanath Temple, Varanasi</h3>
      <p>One of the 12 Jyotirlingas, this temple dedicated to Lord Shiva is the <strong>holiest of Hindu pilgrimage sites</strong>.</p>
      
      <h3>Golden Temple, Amritsar</h3>
      <p>The holiest Sikh gurdwara, featuring a stunning golden-plated dome and free community kitchen serving 100,000 meals daily.</p>
      
      <h2 id="south">Southern India</h2>
      <h3>Meenakshi Temple, Madurai</h3>
      <p>A masterpiece of Dravidian architecture with <strong>14 towering gopurams</strong> covered in colorful sculptures.</p>
      
      <h3>Tirupati Balaji Temple</h3>
      <p>The richest temple in the world, attracting 50,000 pilgrims daily to worship Lord Venkateswara.</p>
      
      <h2 id="east">Eastern India</h2>
      <h3>Jagannath Temple, Puri</h3>
      <p>One of the Char Dham pilgrimage sites, famous for the annual Rath Yatra chariot festival.</p>
      
      <h3>Konark Sun Temple</h3>
      <p>A UNESCO World Heritage Site designed as a giant chariot of the Sun God, with exquisite stone carvings.</p>
      
      <h2 id="etiquette">Temple Etiquette</h2>
      <ul>
        <li>Remove shoes before entering</li>
        <li>Dress conservatively (cover shoulders and knees)</li>
        <li>Photography is often restricted inside</li>
        <li>Follow queue systems respectfully</li>
      </ul>
    `,
        relatedPosts: ["top-10-places-to-visit-in-india", "india-travel-guide-2025"],
    },
};

// Reading Progress Bar Component
const ReadingProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (scrollTop / docHeight) * 100;
            setProgress(scrollProgress);
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
            <motion.div
                className="h-full bg-amber-500"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

// Table of Contents Component
const TableOfContents = ({ items }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 sticky top-24">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                In This Article
            </h4>
            <nav>
                <ul className="space-y-3">
                    {items.map((item, index) => (
                        <li key={index}>
                            <a
                                href={`#${item.id}`}
                                className="text-slate-600 hover:text-amber-600 text-sm transition-colors flex items-center group"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-amber-500 mr-3 transition-colors"></span>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

// Share Buttons Component
const ShareButtons = ({ title, url }) => {
    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    return (
        <div className="flex items-center space-x-3">
            <span className="text-slate-400 text-sm">Share:</span>
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
        </div>
    );
};

// Related Post Card
const RelatedPostCard = ({ post }) => (
    <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative h-32 rounded-xl overflow-hidden mb-3">
            <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">{post.category}</span>
        <h4 className="text-slate-900 font-serif text-lg group-hover:text-amber-600 transition-colors line-clamp-2 mt-1">
            {post.title}
        </h4>
    </Link>
);

const BlogPost = ({ post, relatedPosts }) => {
    if (!post) {
        return <div>Post not found</div>;
    }

    const shareUrl = `https://visitindia.com/blog/${post.slug}`;

    // Custom renderer for structured content
    const renderSections = (sections) => {
        return (
            <div className="space-y-12">
                {sections.map((section, index) => {
                    if (section.type === 'lead') {
                        return (
                            <p key={index} className="text-xl text-slate-600 leading-relaxed mb-8">
                                {section.content}
                            </p>
                        );
                    }

                    return (
                        <div key={index} id={section.id} className="scroll-mt-24">
                            <h2 className="text-3xl font-serif text-slate-900 mb-6 pb-2 border-b border-slate-200">
                                {section.title}
                            </h2>

                            {section.imageUrl && (
                                <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-lg">
                                    <Image
                                        src={section.imageUrl}
                                        alt={section.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 bg-black/60 text-white text-xs px-3 py-1 rounded-tr-lg">
                                        Image: Wikipedia
                                    </div>
                                </div>
                            )}

                            <div
                                className="prose prose-lg prose-slate text-slate-700 max-w-none"
                                dangerouslySetInnerHTML={{ __html: section.content }}
                            />

                            {section.tip && (
                                <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                                    <p className="text-amber-900 font-medium">{section.tip}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <ReadingProgress />

            <SEOHead
                title={post.title}
                description={post.excerpt}
                canonical={`/blog/${post.slug}`}
                ogImage={post.image}
                ogType="article"
            />
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Blog", url: "/blog" },
                { name: post.title }
            ]} />

            {/* Hero */}
            <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
                <Image
                    src={post.image}
                    layout="fill"
                    objectFit="cover"
                    alt={post.title}
                    priority
                    className="brightness-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                <div className="absolute inset-0 jaali-overlay opacity-15"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-16 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-amber-500 text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        {post.category}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white text-4xl md:text-6xl max-w-4xl mb-6 leading-tight"
                    >
                        {post.title}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center space-x-6 text-slate-300"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-sm">
                                VI
                            </div>
                            <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <span className="text-slate-500">•</span>
                        <span className="text-sm">{post.date}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-sm">{post.readTime}</span>
                    </motion.div>
                </div>
            </section>

            {/* Content Grid */}
            <div className="max-w-[1400px] m-auto px-6 md:px-12 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Table of Contents - Left Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <TableOfContents items={post.tableOfContents} />
                    </aside>

                    {/* Main Content */}
                    <article className="lg:col-span-6">
                        {post.sections ? renderSections(post.sections) : (
                            <div
                                className="prose prose-lg prose-slate max-w-none 
                        prose-headings:font-serif prose-headings:scroll-mt-24
                        prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-200
                        prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
                        prose-p:leading-loose prose-p:text-slate-700 prose-p:mb-6
                        prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline
                        prose-blockquote:bg-amber-50 prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-amber-900 prose-blockquote:my-10
                        prose-li:text-slate-700 prose-li:mb-2
                        prose-strong:text-slate-900
                        [&_.lead]:text-xl [&_.lead]:text-slate-600 [&_.lead]:leading-relaxed [&_.lead]:mb-10"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        )}

                        {/* Author Box */}
                        <div className="mt-16 p-8 bg-white rounded-3xl shadow-lg border border-slate-100 flex items-center space-x-6">
                            <div className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-2xl shrink-0">
                                VI
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Written by</p>
                                <h4 className="text-xl font-serif text-slate-900">{post.author}</h4>
                                <p className="text-slate-500 text-sm mt-1">Helping travelers discover the magic of India since 2020.</p>
                            </div>
                        </div>

                        {/* Share & Tags */}
                        <div className="mt-10 pt-10 border-t border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <ShareButtons title={post.title} url={shareUrl} />
                            <div className="flex items-center space-x-2">
                                <span className="text-slate-400 text-sm">Tags:</span>
                                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs">{post.category}</span>
                                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs">India Travel</span>
                            </div>
                        </div>
                    </article>

                    {/* Right Sidebar */}
                    <aside className="lg:col-span-3 space-y-8">
                        {/* Related Posts */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                                Related Articles
                            </h4>
                            <div className="space-y-6">
                                {relatedPosts && relatedPosts.map((relPost) => (
                                    <RelatedPostCard key={relPost.slug} post={relPost} />
                                ))}
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                            <div className="absolute inset-0 jaali-overlay opacity-10"></div>
                            <div className="relative z-10">
                                <h4 className="text-xl font-serif mb-3">Ready to Explore?</h4>
                                <p className="text-slate-400 text-sm mb-5">Start planning your India adventure today.</p>
                                <Link href="/explore" className="btn-accent !py-3 !text-sm block text-center">
                                    View Destinations
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;

export async function getStaticPaths() {
    const paths = Object.keys(blogContent).map(slug => ({
        params: { slug }
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const post = blogContent[params.slug];

    if (!post) {
        return { notFound: true };
    }

    // Optimize: Fetch standard wikipedia images for standard items
    // We do this at build time to avoid client-side waterfalls
    let enhancedPost = { ...post };

    if (post.sections) {
        // Collect search terms
        const termsToFetch = post.sections
            .filter(section => section.search)
            .map(section => section.search);

        if (termsToFetch.length > 0) {
            try {
                // Fetch in parallel
                const wikiData = await getMultipleWikipediaSummaries(termsToFetch);

                // Inject images back into sections
                enhancedPost.sections = post.sections.map(section => {
                    if (section.search && wikiData[section.search]) {
                        // Prefer original image for high quality, fallback to thumbnail
                        const img = wikiData[section.search].originalImage || wikiData[section.search].thumbnail;
                        if (img) {
                            return { ...section, imageUrl: img };
                        }
                    }
                    return section;
                });

            } catch (error) {
                console.error("Error fetching wiki images:", error);
                // Fallback: proceed without images if build fails
            }
        }
    }

    // Get related posts
    const relatedPosts = post.relatedPosts?.map(slug => ({
        slug,
        ...blogContent[slug]
    })) || [];

    return {
        props: {
            post: {
                ...enhancedPost,
                slug: params.slug,
            },
            relatedPosts,
        },
    };
}
