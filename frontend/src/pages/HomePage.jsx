import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { OfferCard } from "../components/TripDetailsComponents";
import { fetchTickets } from '../features/tickets/ticketSlice'
import { useDispatch, useSelector } from 'react-redux'
import Footer from "../components/commonComponent/Footer";
import Header from "../components/commonComponent/Header";


const jackpotData = {
  id: "jackpot-id",
  title: "Mega Dubai Jackpot",
  description: "Win an extravagant all-expense-paid trip to Dubai!",
  price: 99,
  image: "",
  category: "jackpot",
  createdAt: new Date(),
};

const testimonials = [
  {
    id: "content1",
    name: "Bardia Adibi",
    country: "India",
    text: "I still can't believe I won! The Dubai trip exceeded all my expectations...",
    img: "/images/bardia-adibi.jpg",
  },
  {
    id: "content2",
    name: "Amit Sharma",
    country: "India",
    text: "A fantastic experience from start to finish. Highly recommended!",
    img: "/images/bardia-adibi.jpg",
  },
  {
    id: "content3",
    name: "Pooja Rani",
    country: "India",
    text: "The trip was a dream. Everything was perfectly organized. Thank you!",
    img: "/images/bardia-adibi.jpg",
  },

];

const HomePage = () => {

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);


  const { tickets, loading, error } = useSelector((state) => state.tickets);

  const [activeTestimonial, setActiveTestimonial] = useState("content1");


  const sliderTrackRef = useRef(null);
  const slideJourney = (direction) => {
    if (!sliderTrackRef.current) return;
    const cardWidth = 550 + 40; 
    sliderTrackRef.current.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth',
    });
  };


  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-10 min-h-screen">
      <Header/>
      
      <section className="py-4 relative overflow-hidden md:mb-4 ">
        <div className="container mx-auto px-4 relative z-10 mb-20">
          <h1 className="text-center text-[3rem] md:text-[7rem] font-bold mb-12 pb-22">
            <span className="text-red-500">WIN</span>
            <span className="text-blue-900">&nbsp;YOUR DREAM&nbsp;</span>
            <span className="text-red-500">TRIP</span>
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-center relative mt-12 md:pt-12 pt-6">
            <div className="relative mx-auto max-h-[28rem] z-20">
              <div className="absolute inset-0 z-10 h-84 pointer-events-none overflow-hidden">
                <img src={"/images/gold-confetti.png"} alt="Celebration confetti" className="w-full h-84 object-cover opacity-80" />
              </div>
              <img src={"/images/Header-Globe.png"} alt="Travel Map" className="rounded-full mx-auto absolute" />
              <img src={"/images/Home-page-Girl.png"} alt="Person with arms spread" className=" relative lg:top-1 top-20 transform translate-y-[10%] z-40" />

              <div className="absolute w-32 h-42 md:w-64 md:top-[27%] top-[40%] left-14 md:left-32 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 z-30">
                <img src={"/images/shanghai-urban-architecture-1.png"} alt="Baku" className="rounded-lg w-32 h-42 md:w-64 object-cover" />
                <div className="text-red-500 text-center font-bold py-1">BAKU</div>
              </div>

              <div className="absolute w-32 h-42 md:w-64 md:bottom-[70%]  bottom-[60%] right-1/3 transform translate-x-1/2 bg-white rounded-lg shadow-lg p-2 z-30">
                <img src={"/images/shanghai-urban-architecture-1.png"} alt="Dubai" className="rounded-lg w-32 h-42 md:w-64 object-cover" />
                <div className="text-green-500 text-center font-bold py-1">DUBAI</div>
              </div>

              <div className="absolute w-32 h-42 md:w-64 top-[60%] md:top-[55%] right-20 md:right-48 translate-x-3/4 translate-y-1/4 bg-white rounded-lg shadow-lg p-2 z-30">
                <img src={"/images/shanghai-urban-architecture-1.png"} alt="Thailand" className="rounded-lg w-32 h-42 md:w-64 object-cover" />
                <div className="text-yellow-500 text-center font-bold py-1">THAILAND</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-4 bg-[#E9F2FF] relative">
        <div className="relative max-w-[90vw] mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-red-500">Start Your Journey</h1>
            <p className="text-base md:text-xl font-medium">Get ready for the adventure of a lifetime!</p>
          </div>

          {/* Loading and error states */}
          {loading && <div>Loading offers...</div>}
          {error && <div className="text-red-600">Error: {error}</div>}

          <div
            ref={sliderTrackRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth md:px-8 px-1 gap-10 w-full max-w-full"
            style={{ scrollbarWidth: 'none' }}
          >
            {(tickets || []).map(item => (
              <div key={item._id} className="slide snap-center flex-shrink-0 w-[550px]">
                <OfferCard
                  mainImage={item.image}
                  shadeImage={"/images/shade.png"}
                  mainText="WIN"
                  location={item.name}
                  subtitle={item.description}
                  price={item.price}
                  currency={item.currency}
                  fromLocation={item.fromLocation}
                  drawDate={new Date(item.date).toLocaleDateString()}   //new Date(date).toLocaleDateString()
                  totalTickets={item.ticket}
                  
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => slideJourney(-1)}
            className="absolute md:top-[60%] top-[65%] md:left-7 left-0 -translate-y-1/2 z-40 bg-white/50 hover:bg-white rounded-full w-10 h-10 text-2xl"
            aria-label="Previous Slide"
          >
            ‹
          </button>
          <button
            onClick={() => slideJourney(1)}
            className="absolute top-[65%] md:top-[60%] right-0 -translate-y-1/2 z-40 bg-white/50 hover:bg-white rounded-full w-10 h-10 text-2xl"
            aria-label="Next Slide"
          >
            ›
          </button>
        </div>
      </section>

      {/* Jackpot CTA */}
      <section className="py-8 relative overflow-hidden bg-[#E9F2FF]">
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-12">
            <p className="text-4xl text-center font-bold py-2">
              Buy a ₹{jackpotData.price} ticket, win a jackpot!
            </p>
            <div className="text-center py-6 pb-16">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md w-48">
                Click Here
              </button>
            </div>
            <div className="hero-container bg-blue-900 rounded-lg flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
              <div className="hero-text px-8 md:px-16 z-10 md:py-8 py-2">
                <img
                  src={"/images/Jackpot.png"}
                  alt="Jackpot Logo"
                  className="w-48 mb-4"
                />
                <h2 className="text-white text-3xl font-bold">{jackpotData.title}</h2>
                <p className="text-white font-bold text-lg w-72 mb-8 mt-2">
                  {jackpotData.description || "Enter for your chance to win this amazing prize."}
                </p>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 mb-8 px-6 rounded-md w-48">
                  Learn More
                </button>
              </div>
              <img
                src={"/images/portrait-woman-visiting-luxurious-city-dubai-2.png"}
                alt={jackpotData.title}
                className="relative felx justify-end items-end bottom-0 lg:right-0  
                md:right-6 right-0 lg:max-h-[390px] md:max-h-[425px] lady-image max-h-72"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-8 bg-[#E9F2FF]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl text-red-500 text-center mb-5 py-8 font-semibold">
            Feedback From Our Prize Winners
          </h2>

          <div className="flex flex-col items-center flex-wrap justify-center md:flex-row gap-3 md:gap-8">


            <div className="grid grid-cols-3 gap-2">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className={`w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-4 transition-all ${activeTestimonial === t.id
                    ? "border-blue-500 scale-110"
                    : "border-transparent"
                    }`}
                  onClick={() => setActiveTestimonial(t.id)}
                >
                  <img
                    src={t.img}
                    alt={t.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    width="96"
                    height="96"
                  />
                </div>
              ))}
            </div>

            {/* ✅ Render only active testimonial (not all) */}
            <div className=" p-6 md:p-8 rounded-lg min-h-[150px] relative w-full md:w-[40%] ">
              {testimonials
                .filter((t) => t.id === activeTestimonial)
                .map((t) => (
                  <div key={t.id} className="transition-opacity duration-300 opacity-100 bg-[#E9F2FF] p-4">
                    <h4 className="font-bold text-lg sm:text-xl md:text-2xl">{t.name}</h4>
                    <p className="text-gray-500 text-sm sm:text-base">{t.country}</p>
                    <p className="text-justify mt-2 text-sm sm:text-base md:text-lg">{t.text}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spin Luck */}
      <section className="md:py-8 py-4 min-h-96 ">
        <div className="container md:mx-auto  md:px-16 px-5 flex flex-col md:flex-row justify-start md:justify-center items-center ">
          <div className=" flex flex-col ">
            <h2 className="lg:text-7xl md:text-[50px] text-4xl font-extrabold text-green-500  flex justify-start ">SPIN LUCK</h2>
            <div className="flex justify-end items-center ">
              <div className="md:w-40 w-[39%] flex gap-1  justify-start items-center  ">
                <div className="flex flex-col justify-start ">
                  <span className="text-black xl:text-2xl  lg:text-xl text-xs font-extrabold">IN</span>
                  <span className="text-red-500 xl:text-4xl lg:text-3xl md:text-2xl text-base font-medium">Rs.</span>
                </div>
                <div><span className="xl:text-[75px]  lg:text-[70px] md:text-[65px] text-[43px] font-bold text-red-500">49</span></div>
              </div>
              <div className=" md:w-[60%] w-[61%] ">
                <p className="flex items-center justify-start lg:text-xl  text-xs   text-gray-700  font-bold leading-[1] ">iPhone 16, Premium <br />Luggage &amp; More!</p>
              </div>
            </div>
          </div>
          <div className="relative mt-8 md:mt-0 flex justify-center items-center ">
            <img
              src="/images/Spin-to-win.webp"
              alt="Gift Box"
              loading="lazy"
              width="480"
              height="480"
              className="mx-auto lg:max-h-[30rem] md:max-h-[25rem] w-full object-contain"
            />
          </div>
        </div>
      </section>

     <Footer/>
    </div>
  );
};

export default HomePage;
