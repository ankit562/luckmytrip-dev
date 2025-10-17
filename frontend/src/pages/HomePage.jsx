import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { OfferCard } from "../components/TripDetailsComponents";
import { fetchTickets } from '../features/tickets/ticketSlice'
import { useDispatch, useSelector } from 'react-redux'
import Footer from "../components/commonComponent/Footer";
import Header from "../components/commonComponent/Header";
import { fetchProducts } from "../features/products/productSlice"



const testimonials = [
  {
    id: "content1",
    name: "Priya Patel",
    country: "India",
    text: "Thank you for the amazing reward! I truly appreciate the generosity and effort behind this prize gift. It was a wonderful experience, and I look forward to more opportunities with your company in the future. Keep up the great work!",
    img: "/images/person1.png",
  },
  {
    id: "content2",
    name: "Arjun Sharma",
    country: "India",
    text: "I can't express how grateful I am for this incredible opportunity! The Dubai experience was absolutely fantastic. Every detail was perfectly planned, and the hospitality was beyond exceptional. This will remain a cherished memory forever!",
    img: "/images/Person2.png",
  },
  {
    id: "content3",
    name: "Kavya Mehta ",
    country: "India",
    text: "What an amazing surprise! I never expected to win such a fantastic prize. The entire journey was smooth, well-organized, and filled with memorable moments. Your team's dedication to customer satisfaction is truly commendable!",
    img: "/images/person3.png",
  },
  {
    id: "content4",
    name: "Rohit Singh",
    country: "India",
    text: "This experience exceeded all my expectations! From the moment I received the prize notification to the completion of the trip, everything was flawless. The attention to detail and personalized service made this journey absolutely unforgettable!",
    img: "/images/Person4.png",
  },
  {
    id: "content5",
    name: "Hrithik Kesarwani",
    country: "India",
    text: "Outstanding service and an incredible reward! The prize package was exactly as promised, and the execution was perfect. I'm impressed by the professionalism and genuine care shown throughout the entire process. Highly recommended!",
    img: "/images/Person5.png",
  },
  {
    id: "content6",
    name: "Vikram Kumar",
    country: "India",
    text: "I'm still in awe of this amazing experience! The prize was beyond my wildest dreams, and every aspect of the trip was meticulously planned. Your company's commitment to excellence truly shines through in everything you do!",
    img: "/images/Person6.png",
  },
];



const HomePage = () => {

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { tickets, loading } = useSelector((state) => state.tickets);


  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])


  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);


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
      <Header />

      <section className="py-4 relative overflow-hidden md:mb-4 ">
        <div className="container mx-auto px-4 relative z-10 mb-20">
          <h1 className="text-center text-[3rem] md:text-[6rem] font-bold mb-3 md:mb-12 pb-22 font-berlin">
            <span className="text-red-500">WIN</span>
            <span className="text-blue-900">&nbsp;YOUR DREAM&nbsp;</span>
            <span className="text-red-500">TRIP</span>
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-center relative md:mt-12 mt-2 md:pt-12 pt-6">
            <div className="relative mx-auto max-h-[28rem] z-20">
              <div className="absolute inset-0 z-10 h-84 pointer-events-none overflow-hidden">
                <img src={"/images/gold-confetti.png"} alt="Celebration confetti" className="w-full h-84 md:top-0 top-24 object-cover opacity-80" />
              </div>
              <img src={"/images/Header-Globe.png"} alt="Travel Map" className="rounded-full mx-auto absolute md:top-0 top-24" />
              <img src={"/images/Home-page-Girl.png"} alt="Person with arms spread" className=" relative lg:top-1 top-20 transform translate-y-[10%] z-40" />

              <div className="absolute w-32 h-42 md:w-64 md:top-[27%] top-[40%] left-14 md:left-32 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 z-30">
                <img src={"/images/shanghai-urban-architecture-1.png"} alt="Baku" className="rounded-lg w-32 h-42 md:w-64 object-cover" />
                <div className="text-red-500 text-center font-bold py-1 font-berlin">BAKU</div>
              </div>

              <div className="absolute w-32 h-42 md:w-64 md:bottom-[70%]  bottom-[40%] right-1/3 transform translate-x-1/2 bg-white rounded-lg shadow-lg p-2 z-30">
                <img src={"/images/shanghai-urban-architecture-1.png"} alt="Dubai" className="rounded-lg w-32 h-42 md:w-64 object-cover" />
                <div className="text-green-500 text-center font-bold py-1 font-berlin">DUBAI</div>
              </div>

              <div className="absolute w-32 h-42 md:w-64 top-[60%] md:top-[55%] right-20 md:right-48 translate-x-3/4 translate-y-1/4 bg-white rounded-lg shadow-lg p-2 z-30">
                <img src={"/images/shanghai-urban-architecture-1.png"} alt="Thailand" className="rounded-lg w-32 h-42 md:w-64 object-cover" />
                <div className="text-yellow-500 text-center font-bold py-1 font-berlin">THAILAND</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-4 bg-[#E9F2FF] relative">
        <div className="relative max-w-[90vw] mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-red-500 font-berlin">Start Your Journey</h1>
            <p className="text-base md:text-xl font-medium font-montserrat">Get ready for the adventure of a lifetime!</p>
          </div>

          {/* Loading and error states */}
          {loading && <div>Loading offers...</div>}


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

          {/* Navigation buttons below cards on the right */}
          <div className="flex justify-end gap-3 mt-6 pr-8">
            <button
              onClick={() => slideJourney(-1)}
              className="bg-gray-300 hover:bg-gray-400 rounded-full w-12 h-12 flex items-center justify-center text-2xl text-gray-700 transition-colors duration-200 shadow-md"
              aria-label="Previous Slide"
            >
              ‹
            </button>
            <button
              onClick={() => slideJourney(1)}
              className="bg-green-500 hover:bg-green-600 rounded-full w-12 h-12 flex items-center justify-center text-2xl text-white transition-colors duration-200 shadow-md"
              aria-label="Next Slide"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* Jackpot CTA */}
      {products.filter(items => items.name === "jackpot").map( imgs=> (
        <section key={imgs} className="max-w-7xl mx-auto py-8 relative overflow-hidden bg-[#E9F2FF]">
          <div className="container mx-auto px-4 relative z-10">
            <div className="mb-4">
              <p className="text-4xl text-center font-bold py-2">
              </p>
              <div className="text-center py-6 pb-4">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md w-48">
                  Click Here
                </button>
              </div>
              <div className="hero-container bg-blue-900 rounded-lg flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
                <div className="hero-text px-8 md:px-4 z-10 md:py-8 py-2">
                  <img
                    src={"/images/Jackpot.png"}
                    alt="Jackpot Logo"
                    className="md:w-72 w-48 mb-4"
                  />
                  <p className="text-white font-bold md:text-lg text-sm w-72 mb-3 md:mb-8 ml-0 md:ml-10">
                    {imgs.content || "Enter for your chance to win this amazing prize."}
                  </p>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 md:mb-2 px-6 rounded-md w-48 ml-0 md:ml-10">
                    Learn More
                  </button>
                </div>
                <div className="">
                <img
                  src={imgs.image}
                  alt={"Lady with city background"}
                  className="lady-image "
                />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Testimonials */}
      <section id="testimonials" className="py-12 bg-[#E9F2FF]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl text-black text-center mb-12 font-semibold font-montserrat">
            Feedback from Our Prize Winners
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-6xl mx-auto">

            {/* Person Images Grid */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className={`w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl overflow-hidden cursor-pointer border-4 transition-all duration-300 ${activeTestimonial === t.id
                    ? "border-blue-500 scale-110 shadow-lg"
                    : "border-gray-300 opacity-75 blur-[1px] hover:opacity-90"
                    }`}
                  onClick={() => setActiveTestimonial(t.id)}
                >
                  <img
                    src={t.img}
                    alt={t.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Active Testimonial Content */}
            <div className="flex-1 max-w-2xl">
              {testimonials
                .filter((t) => t.id === activeTestimonial)
                .map((t) => (
                  <div key={t.id} className="transition-all duration-500 ease-in-out">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-2 font-montserrat">
                      {t.name}
                    </h3>
                    <p className="text-gray-600 text-lg mb-4 font-montserrat">
                      {t.country}
                    </p>
                    <p className="text-gray-800 text-base md:text-lg leading-relaxed font-montserrat text-justify">
                      {t.text}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spin Luck */}
      <section className="md:py-8 py-4 min-h-96 bg-[#ffffff]">
        {products?.filter(prod => prod?.name === "spinluck").map(pro => (
          <div key={pro} className="container md:mx-auto md:px-16 px-5 flex flex-col md:flex-row justify-start md:justify-center items-center">
            <div className="flex flex-col">
              <h2 className="lg:text-7xl md:text-[50px] font-montserrat text-4xl font-extrabold text-green-500 flex justify-start">SPIN LUCK</h2>
              <div className="flex justify-end items-center">
                <div className="md:w-40 w-[39%] flex gap-1 justify-start items-center">
                  <div className="flex flex-col justify-start">
                    <span className="text-black font-montserrat xl:text-2xl lg:text-xl text-xs font-extrabold">IN</span>
                    <span className="text-red-500 font-montserrat xl:text-4xl lg:text-3xl md:text-2xl text-base font-medium">Rs.</span>
                  </div>
                  <div><span className="xl:text-[75px] lg:text-[70px] font-berlin md:text-[65px] text-[43px] font-bold text-red-500">{pro?.price || "0"}</span></div>
                </div>
                <div className="md:w-[60%] w-[61%]">
                  <p className="flex items-center justify-start lg:text-xl  text-xs text-gray-700 font-bold leading-[1] font-montserrat">iPhone 16, Premium <br />Luggage & More!</p>
                </div>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0 flex justify-center items-center">
              <img
                src={products?.length > 0 ? pro?.image : "/images/Spin-to-win.webp"}
                alt="Gift Box"
                loading="lazy"
                width="480"
                height="480"
                className="mx-auto lg:max-h-[30rem] md:max-h-[25rem] w-full object-contain"
              />
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
