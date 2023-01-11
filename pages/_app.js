import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import { useState } from 'react';
import Router from 'next/router';
import Loader from '../components/Loader'
// import {} from '@next/font/google'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', () => setLoading(true));
  Router.events.on('routeChangeComplete', () => setLoading(false));
  Router.events.on('routeChangeError', () => setLoading(false));
  return (
    <>
    <div className='bg-white text-black' >
      <Navbar loading={loading} />
      {
        loading ? <> <Loader/> </> : <Component {...pageProps} />
      }
      <Footer />
    </div>
    </>
  );
}

export default MyApp;