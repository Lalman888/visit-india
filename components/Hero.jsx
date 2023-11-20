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
    }, 8000); // Change the interval to 8 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Preload the next image
    const nextImage = new Image();
    nextImage.src = `./Home/${images[(slide + 1) % images.length]}`;
    nextImage.onload = () => {
      setIsLoading(false);
    };
  }, [slide]);

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence exitBeforeEnter={false}>
        <motion.div
          key={slide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }} // Adjusted duration and added ease function
          className={`absolute inset-0 bg-fixed bg-center bg-cover transition-opacity duration-300 ease-in-out`}
          style={{ backgroundImage: `url('./Home/${images[slide]}')` }}
        />
      </AnimatePresence>
      {/* <motion.div
        key={slide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }} // Adjusted duration and added ease function
        className="absolute inset-0 bg-black/70 z-[2]"
      /> */}
      <div className="absolute inset-0 flex items-center  justify-center">
        <div className="text-center text-white/90">
          <h2 className="text-5xl font-bold">{heading}</h2>
          <p className="py-5 max-w-2xl text-xl">{message}</p>
          <Link href="/explore">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-14 py-4 border explore font-semibold text-white/90 hover:bg-white hover:text-black"
            >
              Explore
            </motion.button>
          </Link>
        </div>
      </div>
      {isLoading && (
        <div style={{ display: 'none' }}>
          {/* Preload the next image to avoid white screen */}
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={`./Home/${images[(slide + 1) % images.length]}`}
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default Hero;
