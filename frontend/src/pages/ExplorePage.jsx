import React from 'react'
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'
import TripCarosel from '../components/expolorePageComponents/TripCarosel'

const ExplorePage = () => {
  return (
    <div className="bg-[#eaf8fd] min-h-screen">
      <Header />
      {/* tripcarosel */}
      <TripCarosel />

      <section class=" relative overflow-hidden lg:mt-[-180px] md:mt-[-90px] mt-[-190px] mb-5">
        <div class="container mx-auto px-4 py-2 relative z-10">
          <h2 class="lg:text-7xl md:text-4xl text-3xl font-bold text-red-500 text-center mb-4 pt-12">Explore the Possibilities</h2>
          <p class="md:text-4xl  text-xl text-center font-bold py-2">Get ready for the adventure of a lifetime!</p>
        </div>
      </section>

      <section className="how-it-works w-full py-2 ">
        <h2 className="text-4xl lg:text-6xl text-center text-green-500 font-bold mb-12 mt-12">
          HOW IT WORK?
        </h2>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-evenly items-center md:gap-8">

          {/* Step 1 */}
          <div className="flex items-center">
            <span className="relative text-[12rem] lg:text-[12rem] font-extrabold mr-[-60px] z-10"
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
            <span className="relative text-[12rem] lg:text-[12rem] font-extrabold mr-[-50px] z-10"
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
      font-semibold rounded-r-[45px] py-8 pl-14 pr-16 min-w-[220px] 
       flex items-center"
              style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }}>
              BUY<br />COUPONS
            </span>
          </div>

          {/* Step 3 */}
          <div className="flex items-center">
            <span className="relative text-[12rem] lg:text-[12rem] font-extrabold mr-[-50px] z-10 "
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
      font-semibold rounded-r-[45px] py-8 pl-14 pr-16 min-w-[220px] 
       flex items-center"
              style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px' }}>
              WAIT FOR<br />RESULTS
            </span>
          </div>
        </div>
      </section>



      <section class="flex flex-col max-w-7xl mx-auto">
        <div class="container mx-auto py-12">
          <h2 class="about-heading text-4xl md:text-6xl text-green-400 text-center">ABOUT US</h2>
          <p class="md:text-4xl text-xl  text-center  mt-8 px-5 text-gray-700">
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

      <Footer />
    </div>
  )
}

export default ExplorePage
