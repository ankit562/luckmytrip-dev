import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'
import TripCarosel from '../components/expolorePageComponents/TripCarosel'
import TravelCard from '../components/expolorePageComponents/TripInfo'
import { useRef } from 'react';

const options = [
  "VIP AIRPORT PICKUP",
  "PREMIUM LUXURY HOTEL",
  "CITY TOUR WITH MODEL",
  "RE-TURN TICKET",
  "DINNER WITH MODEL",
];

const ExplorePage = () => {

  
  
  const Logo = (
    "WIN"
  );
  
  const features = [
    "Return Ticket from India to Dubai",
    "3 Star hotel for 2 nights",
    "Breakfast",
    "Pick & drop from airport",
    "Basic City Tour",
  ];

  const restrictions = ["VISA", "Lunch & Dinner", "Alcohol"];

  const scrollRef = useRef(null);

  const slideLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#eaf8fd] min-h-screen">
      <Header />
      <TripCarosel />

      <section className="relative overflow-hidden mt-[-15%] sm:mt-0 md:mt-0 lg:mt-0 xl:mt-[-10%]">
        <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-10 xl:px-8 py-2 md:py-3 lg:py-4 relative z-10">
          <h2 className="text-[1.80rem] sm:text-3xl md:text-3xl lg:text-4xl xl:text-6xl font-berlin font-extrabold text-[#FF1744] text-center mb-1 md:mb-1.5 lg:mb-2 pt-4 sm:pt-8 md:pt-4 lg:pt-6 xl:pt-12 leading-tight">
            Explore The Possibilities!
          </h2>
          <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-2xl text-center font-medium py-1 sm:py-2 md:py-2 lg:py-2.5 xl:py-3 leading-snug text-gray-800 font-montserrat">
            Get ready for the adventure of a lifetime!
          </p>
        </div>
      </section>

      <section className="how-it-works w-full py-4 sm:py-5 md:py-8 lg:py-10 xl:py-8 mt-4 sm:mt-6 md:mt-10 lg:mt-12 xl:mt-20">
        <h2 className="text-[2.0rem] sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-extrabold mb-4 sm:mb-5 md:mb-8 lg:mb-10 xl:mb-8 px-4 font-berlin" style={{color: '#8BC34A'}}>
          HOW IT WORK?
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-3 lg:gap-8 xl:gap-16 2xl:gap-32 px-3 sm:px-4 md:px-4 lg:px-6 xl:px-4">

          <div className="flex items-center w-full max-w-[320px] md:w-auto justify-center">
            <span className="relative text-[7rem] sm:text-[9rem] md:text-[7rem] lg:text-[8rem] xl:text-[11rem] font-black mr-[-35px] sm:mr-[-50px] md:mr-[-38px] lg:mr-[-45px] xl:mr-[-55px] z-10"
              style={{
                color: '#7B1FA2',
                WebkitTextStroke: '5px #fff',
                textStroke: '1px #fff',
                borderRadius: '10px',
                background: 'transparent',
              }}>
              1
            </span>
            <span className="bg-[#7B1FA2] text-white text-sm sm:text-base md:text-sm 
            lg:text-base xl:text-xl font-bold rounded-r-[25px] sm:rounded-r-[40px] md:rounded-r-[30px] 
            lg:rounded-r-[35px] xl:rounded-r-[45px] py-5 sm:py-6 md:py-5 lg:py-6 xl:py-8 pl-9 
            sm:pl-12 md:pl-10 lg:pl-11 xl:pl-14 pr-6 sm:pr-12 md:pr-8 lg:pr-10 xl:pr-16 min-w-[165px] 
            sm:min-w-[200px] md:min-w-[155px] lg:min-w-[170px] xl:min-w-[220px] flex items-center 
            leading-tight font-montserrat"
              style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }}>
              REGISTERED<br />OR LOGIN
            </span>
          </div>

          <div className="flex items-center w-full max-w-[320px] md:w-auto justify-center">
            <span className="relative text-[7rem] sm:text-[9rem] md:text-[7rem] lg:text-[8rem] xl:text-[11rem] 
            font-black mr-[-35px] sm:mr-[-48px] md:mr-[-36px] lg:mr-[-43px] xl:mr-[-52px] z-10 "
              style={{
                color: '#00ACC1',
                WebkitTextStroke: '5px #fff',
                textStroke: '5px #fff',
                borderRadius: '30px',
                background: 'transparent',
              }}>
              2
            </span>
            <span className="bg-[#00ACC1] text-white text-sm sm:text-base md:text-sm 
            lg:text-base xl:text-xl font-bold rounded-r-[25px] sm:rounded-r-[40px] md:rounded-r-[30px] 
            lg:rounded-r-[35px] xl:rounded-r-[45px] py-5 sm:py-6 md:py-5 lg:py-7 xl:py-8 pl-9 sm:pl-12 
            md:pl-10 lg:pl-11 xl:pl-14 pr-6 sm:pr-12 md:pr-8 lg:pr-10 xl:pr-16 min-w-[165px] sm:min-w-[200px] 
            md:min-w-[155px] lg:min-w-[140px] xl:min-w-[220px] flex items-end leading-tight font-montserrat"
              style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }}>
              BUY<br />COUPONS
            </span>
          </div>

          <div className="flex items-center w-full max-w-[320px] md:w-auto justify-center">
            <span className="relative text-[7rem] sm:text-[9rem] md:text-[7rem] lg:text-[8rem] xl:text-[11rem] font-black mr-[-33px] sm:mr-[-45px] md:mr-[-34px] lg:mr-[-40px] xl:mr-[-48px] z-10"
              style={{
                color: '#1565C0',
                WebkitTextStroke: '5px #fff',
                textStroke: '5px #fff',
                borderRadius: '30px',
                background: 'transparent',
              }}>
              3
            </span>
            <span className="bg-[#1565C0] text-white text-sm sm:text-base 
            md:text-sm lg:text-base xl:text-xl font-bold rounded-r-[25px] sm:rounded-r-[40px] 
            md:rounded-r-[30px] lg:rounded-r-[35px] xl:rounded-r-[45px] py-5 sm:py-6 md:py-5 
            lg:py-6 xl:py-8 pl-9 sm:pl-12 md:pl-10 lg:pl-11 xl:pl-12 pr-6 sm:pr-12 md:pr-8 lg:pr-10 xl:pr-16 
            min-w-[165px] sm:min-w-[200px] md:min-w-[155px] lg:min-w-[170px] xl:min-w-[210px] 
            flex items-center leading-tight font-montserrat"
              style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }}>
              WAIT FOR<br />THE RESULTS
            </span>
          </div>
        </div>
      </section>

      <section className='w-full max-w-[92%] sm:max-w-[85%] md:max-w-[88%] lg:max-w-[85%] xl:max-w-[80%] px-2 sm:px-6 md:px-4 lg:px-6 xl:px-8 mx-auto flex flex-col mt-10 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-12'>
        <div
          ref={scrollRef}
          className='flex gap-3 sm:gap-6 md:gap-6 lg:gap-12 xl:gap-20 overflow-x-auto no-scrollbar py-4 md:py-5 lg:py-6'
          style={{ scrollSnapType: 'x mandatory' }} 
        >
          <TravelCard
            title={<span className="text-blue-900">DUBAI</span>}
            logo={Logo}
            features={features}
            restrictions={restrictions}
            buttonText="LEARN MORE"/>
       
          <TravelCard
            title={<span className="text-blue-900">Thailand</span>}
            logo={Logo}
            features={features}
            restrictions={restrictions}
            buttonText="LEARN MORE"/>
        </div>

        <div className="flex justify-end gap-2 sm:gap-3 md:gap-4 w-full mt-3 sm:mt-5 md:mt-6 pr-1">
          <button
            className="bg-green-300 px-3.5 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-lg sm:text-lg md:text-xl font-bold rounded-full hover:bg-green-500 transition-colors shadow-md"
            onClick={slideLeft}
          >
            ‹
          </button>
          <button
            className="bg-green-300 px-3.5 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-lg sm:text-lg md:text-xl font-bold rounded-full hover:bg-green-500 transition-colors shadow-md"
            onClick={slideRight}
          >
            ›
          </button>
        </div>
      </section>

      <section className="flex flex-col mx-auto mt-10 sm:mt-16 md:mt-16 lg:mt-20">
        <div className="container mx-auto py-6 sm:py-10 md:py-10 lg:py-12 xl:py-12 px-3 sm:px-6 md:px-8 lg:px-10 xl:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-6xl font-bold text-green-400 text-center mb-2 md:mb-3 lg:mb-4 font-berlin">ABOUT US</h2>
          <p className="text-sm sm:text-base md:text-base lg:text-xl xl:text-3xl 2xl:text-4xl text-justify sm:text-left md:text-justify mt-6 sm:mt-8 md:mt-8 lg:mt-12 xl:mt-16 px-2 sm:px-4 md:px-4 lg:px-6 xl:px-8 text-gray-700 leading-relaxed sm:leading-loose md:leading-relaxed lg:leading-loose xl:leading-loose font-montserrat">
            Here’s your chance to win an unforgettable trip to Dubai
            or Thailand, where luxury meets breathtaking experiences.
            Explore the futuristic skyline and golden deserts of Dubai
            or immerse yourself in Thailand’s tropical paradise, vibrant
            culture, and stunning beaches. Don’t miss out participate now
            and make your dream vacation a reality! Stay tuned for more
            details on how to enter and secure your spot in this incredible
            giveaway.
          </p>
        </div>
      </section>

      <section className='relative w-full max-w-[96%] sm:max-w-[90%] md:max-w-[90%]
       lg:max-w-[85%] xl:max-w-6xl px-2 sm:px-4 md:px-4 h-[320px] sm:h-[360px] md:h-[400px] 
       lg:h-[480px] xl:h-[480px] mx-auto mt-8 sm:mt-16 md:mt-16 lg:mt-20 overflow-hidden'>

        <img src="/images/beautifulview.jpg"
          alt='beautifulView'
          className='w-full h-full object-cover rounded-2xl md:rounded-3xl' />

        <Link  state={{ ticketType: "goldenwinner", qty: 1 , fromExplore: true  }}  to="/ticket"  ><div className='absolute z-20 flex justify-center items-end left-0 right-0 bottom-0 h-full px-2 sm:px-4'>
          <img
            src="/images/goldenwinner.png"
            alt="Jackpot"
            className="w-[38%] sm:w-[36%] md:w-[35%] lg:w-[40%] xl:w-[36%] 
            h-auto max-h-[70%] object-contain mb-2 sm:mb-3 md:mb-4 lg:mb-32 z-20 lg:top-0 top-[-100px] lg:left-20 left-[60px] relative" />
          <img
            src="/images/104-copy-3.png"
            alt="Lady with hat"
            className=" h-auto  w-full md:mr-[-80px]  mr-12  max-h-full object-contain object-bottom" />
        </div> </Link>
      </section>
      {/* w-[50%] sm:w-[48%] md:w-[50%] lg:w-[52%] xl:w-[45%] */}

      <div className="w-full max-w-[96%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] mx-auto px-2 sm:px-4 md:px-4 md:py-4 lg:p-4 mt-4 sm:mt-6 md:mt-6 lg:mt-8 xl:mt-10 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-3 lg:gap-3 xl:gap-4">
          {options.map((option, idx) => (
            <button
              key={option}
              
              className={`
              border-2 border-teal-500 rounded-lg px-1.5 sm:px-3 md:px-3 lg:px-4 py-3 sm:py-6 md:py-6 lg:py-7 xl:py-8 text-[10px] sm:text-sm md:text-xs lg:text-sm xl:text-base font-bold text-teal-900 text-center transition leading-tight font-montserrat
             hover:bg-teal-100 
            `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <Footer />
    </div >
  )
}

export default ExplorePage


