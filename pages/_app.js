import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import { useState,useRef,useEffect } from 'react';
import Router from 'next/router';
import Loader from '../components/Loader'
import { Analytics } from '@vercel/analytics/react';
import { gsap } from "gsap";
// import {} from '@next/font/google'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const cursor = useRef(null);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const onMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    setMousePosition({ x: mouseX, y: mouseY });
  };
  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);
  useEffect(() => {
    // gsap.to(cursor.current, 0.3, {
    //   left: mousePosition.x - 15,
    //   top: mousePosition.y - 15,
    // });
    gsap.set(cursor.current, {
      x: mousePosition.x ,
      y: mousePosition.y ,
      })
  }, [mousePosition]);



  Router.events.on('routeChangeStart', () => setLoading(true));
  Router.events.on('routeChangeComplete', () => setLoading(false));
  Router.events.on('routeChangeError', () => setLoading(false));
  return (
    <>
    <div className='cursor'
      ref={cursor}
    />
    <div className='bg-white text-black' >
      <Navbar loading={loading} />
      {
        loading ? <> <Loader/> </> : <>
        <Component {...pageProps} />
        <Analytics />
        </> 
      }
      <Footer />
    </div>
    </>
  );
}

export default MyApp;