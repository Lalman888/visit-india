import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Analytics } from "@vercel/analytics/react";
import { ClipLoader } from "react-spinners";

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
            <ClipLoader
              size={100}
              color="#000000"
              loading={true}
              aria-label="Loading spinner"
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

