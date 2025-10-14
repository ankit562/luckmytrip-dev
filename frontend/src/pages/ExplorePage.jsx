import React, { useState } from 'react'
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
  const [selected, setSelected] = useState(1);
  
  
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
      {/* tripcarosel */}
      <TripCarosel />

      <section class=" relative overflow-hidden  sm:mt-0  mt-[-45%]">
        <div class="container mx-auto px-4 py-2 relative z-10">
          <h2 class="lg:text-7xl md:text-4xl text-2xl font-bold text-red-500 text-center mb-1 pt-12">Explore the Possibilities</h2>
          <p class="md:text-4xl  text-lg text-center font-semibold py-2">Get ready for the adventure of a lifetime!</p>
        </div>
      </section>

      <section className="how-it-works w-full py-2 mt-20">
        <h2 className="text-4xl lg:text-6xl text-center text-green-500 font-bold ">
          HOW IT WORK?
        </h2>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-center items-center lg:gap:12  gap-1 xl:gap-32">

          {/* Step 1 */}
          <div className="flex items-center">
            <span className="relative text-[12rem] lg:text-[13rem] font-extrabold mr-[-60px] z-10"
              style={{
                color: '#6a1b9a',
                WebkitTextStroke: '10px #fff',
                textStroke: '10px #fff',
                borderRadius: '30px',
                background: 'transparent',
                fontFamily: 'Poppins, sans-serif'
              }}>
              1
            </span>
            <span className="bg-[#6a1b9a] text-white text-xl lg:text-2xl 
      font-semibold rounded-r-[45px] py-9 pl-14 md:pr-16 min-w-[230px] 
      flex items-center"
              style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }}>
              REGISTERED<br />OR LOGIN
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex items-center">
            <span className="relative text-[12rem] lg:text-[13rem] font-extrabold mr-[-55px] z-10"
              style={{
                color: '#009688',
                WebkitTextStroke: '10px #fff',
                textStroke: '10px #fff',
                borderRadius: '30px',
                background: 'transparent',
                fontFamily: 'Poppins, sans-serif'
              }}>
              2
            </span>
            <span className="bg-[#009688] text-white text-xl lg:text-2xl 
      font-semibold rounded-r-[45px] py-10 pl-14 pr-16 min-w-[230px] 
       flex items-end"
              style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }}>
              BUY<br />COUPONS
            </span>
          </div>

          {/* Step 3 */}
          <div className="flex items-center">
            <span className="relative text-[12rem] lg:text-[13rem] font-extrabold mr-[-50px] z-10 "
              style={{
                color: '#0d47a1',
                WebkitTextStroke: '10px #fff',
                textStroke: '10px #fff',
                borderRadius: '30px',
                background: 'transparent',
                fontFamily: 'Poppins, sans-serif'
              }}>
              3
            </span>
            <span className="bg-[#0d47a1] text-white text-xl lg:text-2xl 
      font-semibold rounded-r-[45px] py-9 pl-14 pr-16 min-w-[220px] 
       flex items-center"
              style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }}>
              WAIT FOR<br />RESULTS
            </span>
          </div>
        </div>
      </section>

      <section className='md:max-w-[80%] w-full px-2 mx-auto flex flex-col'>
      <div
        ref={scrollRef}
        className='md:px-0 px-2 flex md:space-x-20 space-x-3 overflow-x-auto no-scrollbar'
        style={{ scrollSnapType: 'x mandatory' }} 
      >
         
          <TravelCard
            title={<span className="text-blue-900">DUBAI</span>}
            logo={Logo}
            features={features}
            restrictions={restrictions}
            buttonText="LEARN MORE"/>
       
          <TravelCard
            title={<span className="text-blue-900">DUBAI</span>}
            logo={Logo}
            features={features}
            restrictions={restrictions}
            buttonText="LEARN MORE"/>
      </div>

      <div className="flex justify-end gap-3 w-full mt-5 max-w-[90%]">
        <button
          className="bg-green-300 px-5 py-2 text-lg font-bold rounded-full hover:bg-green-500"
          onClick={slideLeft}
        >
          ‹
        </button>
        <button
          className="bg-green-300 px-5 py-2 text-lg font-bold rounded-full hover:bg-green-500"
          onClick={slideRight}
        >
          ›
        </button>
      </div>
    </section>
              


      <section class="flex flex-col  mx-auto mt-20">
        <div class="container mx-auto py-12">
          <h2 class=" text-4xl font-bold md:text-6xl text-green-400 text-center">ABOUT US</h2>
          <p class="md:text-5xl text-xl  text-justify mt-16  px-5 text-gray-700 leading-8 ">
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

      <section className='relative md:max-w-[80%] max-w-full px-2 h-[500px]  md:mx-auto  mt-20'>
        <img src="/images/beautifulview.jpg"
          alt='beautifulView'
          className='w-full h-[300px] md:w-[100%] md:h-[100%] object-cover] rounded-3xl' />

        <div className='absolute z-20 flex justify-center items-center ml-[5%]  md:bottom-0 bottom-[200px]'>
          <img
            src="/images/Jackpot.png"
            alt="Jackpot"
            className=" xl:w-[800px] xl:h-96 lg:w-[50%] lg:h-[50%] md:w-[35%] md:h-[35%]   w-[40%] h-[35%] object-cover top-16" />
          <img
            src="/images/104-copy-3.png"
            alt="Lady with hat"
            className="object-cover top-0 xl:right-10 mr-12 lg:right-28 right-2 lg:w-fit lg:h-fit  md:max-w-[80%]  md:h-[70%] max-w-[65%] h-[320px]  " />
        </div>
      </section>

      <div className="md:max-w-[80%] mx-auto p-4 md:mt-5 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:mt-0 mt-[-150px]">
          {options.map((option, idx) => (
            <button
              key={option}
              onClick={() => setSelected(idx)}
              className={`
              border-2 border-teal-500 rounded-lg px-3 py-8 font-bold text-teal-900 text-center transition
              ${selected === idx
                  ? "bg-teal-500 text-white"
                  : "bg-white hover:bg-teal-100"}
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


        //     {/* <img src="/images/Vector2.png" alt="avatar-line" class="  flex lg:w-fit lg:h-72  object-contain ml-[8px] absolute lg:left-[20%] z-10 
        // md:h-96  md:w-[80%] w-[80%] h-[370px] pr-2 " /> */}

        //             {/* <img src="/images/Vector2.png" alt="avatar-line" class=" flex lg:w-fit lg:h-72  object-contain ml-[8px] absolute lg:right-[20%] z-10 
        // md:h-96  md:w-[80%] w-[80%] h-[370px] pr-2 " /> */}