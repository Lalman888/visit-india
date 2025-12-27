import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  'Konarka_Temple.jpg',
  'Taj_mahal.avif',
  'golden_temple.webp',
  'Hampi_virupaksha_temple.jpg',
  'mahadev-1008-shivlinga-khajuraho.jpg',
  'Wat-Thai-Temple-Kushinagar.webp',
];

const Hero = ({ heading, message }) => {
  const [slide, setSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef();

  const heroSlide = () => {
    setSlide((prevSlide) => (prevSlide + 1) % images.length);
    setIsLoading(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      heroSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nextImage = new Image();
    nextImage.src = `./Home/${images[(slide + 1) % images.length]}`;
    nextImage.onload = () => {
      setIsLoading(false);
    };
  }, [slide]);

  return (
    <div className="relative h-screen min-h-[700px] overflow-hidden bg-slate-900">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url('./Home/${images[slide]}')` }}
        />
      </AnimatePresence>

      {/* Unique Indian Accent: Jaali Overlay */}
      <div className="absolute inset-0 jaali-overlay opacity-30 pointer-events-none"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-amber-500 font-medium tracking-[0.3em] uppercase text-sm mb-6"
        >
          Discover the Soul of
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-white mb-8 max-w-5xl leading-tight"
        >
          {heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="text-slate-300 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-12"
        >
          {message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex space-x-4"
        >
          <Link href="/explore" className="btn-accent">
            Start Your Journey
          </Link>
          <Link href="/about" className="px-8 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-all">
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent"></div>
      </motion.div>
    </div>
  );
};

export default Hero;
