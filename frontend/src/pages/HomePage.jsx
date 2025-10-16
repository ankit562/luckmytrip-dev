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
          <h1 className="text-center text-[3rem] md:text-[7rem] font-bold mb-12 pb-22 font-berlin">
            <span className="text-red-500">WIN</span>
            <span className="text-blue-900">&nbsp;YOUR DREAM&nbsp;</span>
            <span className="text-red-500">TRIP</span>
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-center relative mt-12 md:pt-12 pt-6">
            <div className="relative mx-auto max-h-[49rem] z-20">
              <div className="absolute inset-0 z-10 h-84 pointer-events-none overflow-hidden">
                <img src={"/images/gold-confetti.png"} alt="Celebration confetti" className="w-full h-84 object-cover opacity-80" />
              </div>
              <img src={"/images/Header-Globe.png"} alt="Travel Map" className="rounded-full mx-auto absolute" />
              <img src={"/images/Home-page-Girl.png"} alt="Person with arms spread" className=" relative lg:top-1 top-20 transform translate-y-[10%] z-40" />

              <div className="absolute w-40 h-52 md:w-72 md:h-80 md:top-[27%] top-[40%] left-14 md:left-32 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 z-30">
                <img src={"/images/shanghai-urban-architecture-1.png"} alt="Baku" className="rounded-lg w-full h-40 md:h-64 object-cover" />
                <div className="text-red-500 text-center font-bold py-2 font-berlin text-base md:text-xl">BAKU</div>
              </div>

              <div className="absolute w-40 h-52 md:w-72 md:h-80 md:bottom-[70%] bottom-[60%] right-1/3 transform translate-x-1/2 bg-white rounded-lg shadow-lg p-3 z-30">
                <img src={"/images/shanghai-urban-architecture-1.png"} alt="Dubai" className="rounded-lg w-full h-40 md:h-64 object-cover" />
                <div className="text-green-500 text-center font-bold py-2 font-berlin text-base md:text-xl">DUBAI</div>
              </div>

              <div className="absolute w-40 h-52 md:w-72 md:h-80 top-[60%] md:top-[45%] right-20 md:right-48 translate-x-3/4 translate-y-1/4 bg-white rounded-lg shadow-lg p-3 z-30">
                <img src={"/images/shanghai-urban-architecture-1.png"} alt="Thailand" className="rounded-lg w-full h-40 md:h-64 object-cover" />
                <div className="text-yellow-500 text-center font-bold py-2 font-berlin text-base md:text-xl">THAILAND</div>
              </div>
              
              {/* Bottom gradient fade overlay positioned at photo cut line */}
              <div className="absolute bottom-0 left-[4.5rem] right-[9rem] top-[50rem] h-20 md:h-24 bg-gradient-to-t from-blue-100 via-blue-100/60 to-transparent z-50 pointer-events-none"></div>
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
        <section key={imgs._id} className="w-full py-8 bg-[#E9F2FF]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl text-center font-bold py-2 font-berlin">
                Buy a ₹99 ticket, win a jackpot!
              </h2>
              <div className="text-center py-6">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-base md:text-lg font-montserrat transition-colors duration-200 shadow-lg">
                  Click Here
                </button>
              </div>
              
              {/* Jackpot VIP Card with SVG assets */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[400px] md:min-h-[500px]">
                
                {/* Rectangle SVG Background Overlay */}
                <div className="absolute inset-0 z-10">
                  <img
                    src="/images/beautifulview.jpg"
                    alt="Background overlay"
                    className="w-full h-full object-cover"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                
                {/* Woman Image - Positioned on the right, above background */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-5/6 z-20 flex items-end justify-end">
                  <img
                    src={imgs.image}
                    alt="VIP Experience"
                    className="h-full w-full object-contain object-right"
                  />
                </div>
                
                {/* Content Container */}
                <div className="relative z-30 h-full flex items-center">
                  <div className="px-8 md:px-16 py-10 md:py-16 max-w-xl">
                    
                    {/* VIP Jackpot SVG Logo */}
                    <div className="mb-6 md:mb-8">
                      <img
                        src="/images/Jackpot.png"
                        alt="Jackpot VIP Ticket"
                        className="w-64 md:w-[30rem] h-auto drop-shadow-2xl"
                      />
                    </div>
                    
                    {/* Description */}
                    <p className="text-white text-base md:text-xl font-bold font-montserrat mb-6 md:mb-8 drop-shadow-lg leading-relaxed max-w-md">
                      {imgs.content || "Enjoy a dinner experience with a international model in Dubai"}
                    </p>
                    
                    {/* Click Here Button */}
                    <button className="bg-[#8ac43f] hover:bg-[#7ab52f] text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-lg text-base md:text-lg font-montserrat transition-all duration-200 shadow-xl hover:shadow-2xl">
                      Click Here
                    </button>
                  </div>
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
                  className={`w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl overflow-hidden cursor-pointer border-4 transition-all duration-300 ${
                    activeTestimonial === t.id
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
      <section className="py-8 md:py-12 bg-[#ffffff] relative overflow-hidden">
        {products?.filter(prod => prod?.name === "spinluck").map(pro => (
          <div key={pro} className="container mx-auto px-4 max-w-6xl">
            <div className="bg-white rounded-3xl  p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                
                {/* Left Content */}
                <div className="flex flex-col items-start">
                  {/* SPIN LUCK Title */}
                  <div className="mb-4">
                    <h2 className="font-montserrat text-[#8AC43F]  origin-bottom scale-y-150 text-4xl md:text-6xl lg:text-7xl font-black  leading-none tracking-tight">
                      SPIN LUCK
                    </h2>
                  </div>
                  
                  {/* Price Section with Description beside it */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-start">
                        <span className="font-montserrat text-black text-lg md:text-xl font-bold leading-none">IN</span>
                        <span className="font-montserrat text-red-500 text-2xl md:text-3xl font-bold leading-none">Rs.</span>
                      </div>
                      <span className="font-berlin text-red-500 text-5xl md:text-7xl font-black">
                        {pro?.price || "49"}
                      </span>
                    </div>
                    
                    {/* Description right beside the price */}
                    <div>
                      <p className="font-montserrat text-lg md:text-xl text-black font-bold leading-snug">
                        iPhone 16, Premium<br />
                        Luggage & More!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={products?.length > 0 ? pro?.image : "/images/Spin-to-win.webp"}
                      alt="Prize Box with iPhone and Gifts"
                      loading="lazy"
                      className="w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Floating confetti elements */}
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-yellow-400 transform rotate-45 opacity-80"></div>
        <div className="absolute top-40 right-1/3 w-2 h-2 bg-orange-400 rounded-full opacity-70"></div>
        <div className="absolute bottom-32 left-1/3 w-4 h-1 bg-yellow-500 opacity-60"></div>
        <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-yellow-400 transform rotate-45 opacity-80"></div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
