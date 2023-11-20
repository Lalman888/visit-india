import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Navbar = ({loading}) => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState('transparent');
  const [textColor, setTextColor] = useState('white');
  const router = useRouter();
  const [logoAdd, setLogoAdd] = useState('/logo.png')
  
  

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90 && router.pathname === '/') {
        setColor('#ffffff');
        setTextColor('#000000');
        setLogoAdd('/logo_b.png')
      } else {
        
        setColor('transparent');
        setTextColor('#ffffff');
        setLogoAdd('/logo.png')
      }
    };
    window.addEventListener('scroll', changeColor);
    
    // console.log(router.pathname);
  }, [router.pathname]);

  return (
    <div
      style={{ backgroundColor: `${router.pathname === '/' ? color : 'black'} ` }}
      className='fixed left-0 top-0 w-full z-10 ease-in duration-300'
    >
      <div className='max-w-[1240px] m-auto flex justify-between items-center p-4 text-white'>
        <Link href='/'>
          {/* <h1 style={{ color: `${ loading && router.pathname === '/' ? 'black' : textColor }  ` }} className='font-bold cursor-pointer text-4xl'>
            Captur
          </h1> */}
          <Image className='cursor-pointer' src={logoAdd} width={110} height={30} alt="logo" />
        </Link>
        <ul style={{ color: `${ loading && router.pathname === '/' ? 'black' : textColor }` }} className='hidden sm:flex'>
          <li className='p-4 hover:opacity-70'>
            <Link href='/'>Home</Link>
          </li>
          <li className='p-4 hover:opacity-70'>
            <Link href='/explore'>Explore India</Link>
          </li>
          {/* <li className='p-4 hover:opacity-70'>
            <Link href='/temples-in-world'>Hindu Temples Outside India</Link>
          </li> */}
          {/* <li className='p-4 hover:opacity-70'>
            <Link href='/about'>About</Link>
          </li> */}
          <li className='p-4 hover:opacity-70'>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>

        {/* Mobile Button */}
        {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div onClick={handleNav} className='block sm:hidden z-10'>
          {nav ? (
            <AiOutlineClose size={20} style={{ color: 'white' }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: `${ loading && router.pathname === '/' ? 'black' : textColor }` }} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
              : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
          }
        >
          <ul>
            {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/'>Home</Link>
            </li>
            {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/explore'>Explore India</Link>
            </li>
            {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
            <Link href='/temples-in-world'>Hindu Temples Outside India</Link>
            </li>
            {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            {/* <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/work'>Work</Link>
            </li> */}
            {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;