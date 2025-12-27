import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ loading }) => {
  const [nav, setNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Explore', path: '/explore' },
    { title: 'Plan Trip', path: '/plan-trip' },
    { title: 'Blog', path: '/blog' },
    { title: 'Contact', path: '/contact' },
  ];

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = router.pathname === '/';

  return (
    <nav
      className={`fixed left-0 top-0 w-full z-50 transition-all duration-500 ${isScrolled || !isHome ? 'glass py-3 shadow-md' : 'py-6'
        }`}
    >
      <div className='max-w-[1400px] m-auto flex justify-between items-center px-6 md:px-12'>
        <Link href='/' className='flex items-center space-x-2'>
          <span className={`text-2xl md:text-3xl font-serif font-bold tracking-tight transition-colors duration-300 ${isScrolled || !isHome ? 'text-slate-900' : 'text-white'
            }`}>
            Visit India
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className={`hidden md:flex items-center space-x-10 font-medium transition-colors duration-300 ${isScrolled || !isHome ? 'text-slate-900' : 'text-white/90'
          }`}>
          {navLinks.map((link) => (
            <li key={link.path} className='relative group'>
              <Link href={link.path} className='hover:text-amber-500 transition-colors'>
                {link.title}
              </Link>
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full'></span>
            </li>
          ))}
          <li>
            <Link href='/explore' className={`btn-accent !px-6 !py-2 !text-sm ${!isScrolled && isHome ? 'bg-white !text-slate-900 hover:bg-slate-100' : ''
              }`}>
              Plan Your Trip
            </Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className='md:hidden z-50 cursor-pointer'>
          {nav ? (
            <AiOutlineClose size={24} className='text-white' />
          ) : (
            <AiOutlineMenu size={24} className={isScrolled || !isHome ? 'text-slate-900' : 'text-white'} />
          )}
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {nav && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='fixed top-0 left-0 w-full h-screen bg-slate-900 flex flex-col items-center justify-center space-y-8 z-40'
            >
              <div className='absolute inset-0 jaali-overlay opacity-20'></div>
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    href={link.path}
                    onClick={handleNav}
                    className='text-3xl font-serif text-white hover:text-amber-500 transition-colors'
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link href='/explore' onClick={handleNav} className='btn-accent'>
                  Plan Your Trip
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;