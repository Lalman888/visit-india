import Link from 'next/link';
import React,{useState,useEffect} from 'react';

const Hero = ({heading, message}) => {
   const [slide, setSlide] = useState(1);

   const heroSlide = () => {
    
      if (slide === 1) {
          setSlide(2);
      } else if (slide === 2) {
          setSlide(3);
      } else if (slide === 3) {
          setSlide(4);
      } else if (slide === 4) {
          setSlide(5);
      } else if (slide === 5) {
          setSlide(6);
      } else if (slide === 6) {
          setSlide(1);
      }
   }

    useEffect(() => {
        const interval = setInterval(() => {
          if(window.scrollY <= 90) {
            heroSlide();
          } 
        }, 5000);
        return () => clearInterval(interval);
    }, [slide]);
    


   

  return (
    <div 
    loading = 'lazy'
    className={`flex   transition-all duration-300 ease-in-out items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img-${slide} `}>
      {/* Overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]' />
      <div className='relative top-[1%] p-5 text-white z-[2] mt-[-10rem]'>
        <h2 className='text-5xl font-bold'>{heading}</h2>
        <p className='py-5 max-w-2xl text-xl'>{message}</p>
        <Link href='/explore'>

        <button className='px-16 ml-[25%] md:ml-0 py-4 border hover:bg-white explore hover:font-semibold hover:text-black'>Explore </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
