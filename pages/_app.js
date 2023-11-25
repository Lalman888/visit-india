import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Analytics } from "@vercel/analytics/react";
import {  ThreeCircles } from "react-loader-spinner";
// import {} from '@next/font/google'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [pageload, setPageload] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setPageload(false);
    }, 1500);
  }, []);




  return (
    <>
   
      {pageload ? (
        <>
          <div className="w-full bg-white/90 h-screen flex items-center justify-center">
            <ThreeCircles
              height="100"
              width="100"
              color="#000000"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </div>
        </>
      ) : (
        <>
          <div className="bg-white text-black">
            <Navbar loading={loading} />
            {loading ? (
              <>
                {" "}
                <Loader />{" "}
              </>
            ) : (
              <>
                <Component {...pageProps} />
                <Analytics />
              </>
            )}
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default MyApp;
