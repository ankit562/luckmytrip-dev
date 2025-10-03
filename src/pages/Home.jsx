import React, { useState, useRef } from "react";

// --- Corrected Relative Image Imports ---
// The path goes up one level from 'pages' to 'src', then down into 'public/images'.
import logo from "../public/images/luckmytrip-logo.png";
import confetti from "../public/images/gold-confetti.png";
import globe from "../public/images/Header-Globe.png";
import girl from "../public/images/Home-page-Girl.png";
import shanghai from "../public/images/shanghai-urban-architecture-1.png";
import poolWoman from "../public/images/portrait-beautiful-young-asian-woman-relaxing-around-outdoor-swimming-pool-with-city-view.jpg";
import jackpot from "../public/images/Jackpot.png";
// import heroBg from '../public/images/hero-bg.png'; // NOTE: This file was not in your list, so I commented it out.
import dubaiWoman from "../public/images/portrait-woman-visiting-luxurious-city-dubai-2.png";
import spinToWin from "../public/images/Spin-to-win.png";
import bardiaAdibi from "../public/images/bardia-adibi.jpg";
import { useData } from "../contexts/DataContext";
import { Link } from "react-router-dom";
// import whatsappIcon from '../public/images/whatsapp-icon.svg'; // NOTE: This file was also missing.


const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState('content1');
  const [menuOpen, setMenuOpen] = useState(false);
  const sliderTrackRef = useRef(null);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);
  const { content } = useData();

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in as: ${e.target.loginEmail.value}`);
    closeLogin();
  };
  const jackpotData = content.find(data => data.category == "jackpot")
  console.log(jackpotData, "-------------------------------")
  const handleRegisterFormSubmit = (e) => {
    e.preventDefault();
    alert(`Registered successfully:\nName: ${e.target.name.value}\nEmail: ${e.target.email.value}`);
    closeRegister();
  };

  // --- Corrected Testimonials Data ---
  // Remote URLs are now strings, not imports.
  const testimonials = [
    {
      id: 'content1',
      name: 'Bardia Adibi',
      country: 'India',
      text: "I still can't believe I won! The Dubai trip exceeded all my expectations...",
      img: bardiaAdibi
    },
    {
      id: 'content2',
      name: 'Bardia',
      country: 'India',
      text: 'A fantastic experience from start to finish. Highly recommended!',
      img: bardiaAdibi
    },
    {
      id: 'content3',
      name: 'Adibi',
      country: 'India',
      text: 'The trip was a dream. Everything was perfectly organized. Thank you!',
      img: bardiaAdibi
    },
    {
      id: 'content4',
      name: 'Bardia Adibi 4',
      country: 'India',
      text: "Incredible journey! I can't wait to participate again for the next destination.",
      img: bardiaAdibi
    },
    {
      id: 'content5',
      name: 'Bardia Adibi 5',
      country: 'India',
      text: 'Winning this felt unreal! The support from the Luckymytrip team was amazing.',
      img: bardiaAdibi
    },
    {
      id: 'content6',
      name: 'Bardia Adibi 6',
      country: 'India',
      text: 'Absolutely life-changing. The memories from this trip will last a lifetime.',
      img: bardiaAdibi // This one is a local file, so it still uses the imported variable.
    },
  ];

  const slideJourney = (direction) => {
    if (sliderTrackRef.current) {
      const slideWidth = sliderTrackRef.current.querySelector('.slide').offsetWidth + 40;
      sliderTrackRef.current.scrollBy({ left: direction * slideWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-10">
      <nav className="w-full p-4">
        <div className="container mx-auto flex items-center justify-between uppercase">
          <div className="text-xl font-bold">
            <img src={logo} alt="Luckymytrip Logo" className="w-24 sm:w-28" />
          </div>
          <ul className="hidden md:flex space-x-6 lg:space-x-12 nav-links-ol font-semibold">
            <li><Link className="active" to="/">Home</Link></li>
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/tickets">Tickets</Link></li>
            <li><Link to="/ContactUs">Contact</Link></li>
          </ul>
        

          <div className="flex space-x-4 nav-links-oly font-semibold items-center">
            <div>
              <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <button onClick={openLogin} className="hidden md:block">Login</button>
            <a href="#" onClick={(e) => { e.preventDefault(); openRegister(); }} className="hidden md:block text-blue-600 hover:underline text-lg font-semibold">Register</a>
              <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
          </div>


        </div>
              {menuOpen && (
                <div className="md:hidden mt-2 bg-white shadow-md rounded-md p-4 space-y-4 font-semibold flex flex-col">
                  <Link to="/" onClick={() => setMenuOpen(false)} className="block">Home</Link>
                  <Link to="/explore" onClick={() => setMenuOpen(false)} className="block">Explore</Link>
                  <Link to="/tickets" onClick={() => setMenuOpen(false)} className="block">Tickets</Link>
                  <Link to="/ContactUs" onClick={() => setMenuOpen(false)} className="block">Contact</Link>
                  <div className="flex flex-col space-y-2 pt-2 border-t">
                    <button onClick={openLogin} className="w-full text-left">Login</button>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); openRegister(); setMenuOpen(false); }}
                      className="text-blue-600 hover:underline"
                    >
                      Register
                    </a>
                  </div>
                </div>
              )}  
      </nav>

      <section className="py-4 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-center text-[3rem] md:text-[7rem] font-bold mb-12 pb-22">
            <span className="text-red-500">WIN </span>
            <span className="text-blue-900">&nbsp;YOUR DREAM </span>
            <span className="text-red-500">&nbsp;TRIP</span>
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-center relative mt-12 pt-12">
            <div className="relative mx-auto max-h-[28rem] z-20">
              <div className="absolute inset-0 z-10 h-84 pointer-events-none overflow-hidden">
                <img src={confetti} alt="Celebration confetti" className="w-full h-84 object-cover opacity-80" />
              </div>
              <img src={globe} alt="Travel Map" className="rounded-full mx-auto absolute" />
              <img src={girl} alt="Person with arms spread" className="relative transform translate-y-1/4 z-10" />
              <div className="absolute w-32 h-42 md:w-64 top-1/2 left-14 md:left-32 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 z-30">
                <img src={shanghai} alt="Baku" className="rounded-lg w-32 h-42 md:w-64 object-cover" />
                <div className="text-red-500 text-center font-bold py-1">BAKU</div>
              </div>
              <div className="absolute w-32 h-42 md:w-64 bottom-3/4 right-1/3 transform translate-x-1/2 bg-white rounded-lg shadow-lg p-2 z-30">
                <img src={shanghai} alt="Dubai" className="rounded-lg w-32 h-42 md:w-64 object-cover" />
                <div className="text-green-500 text-center font-bold py-1">DUBAI</div>
              </div>
              <div className="absolute w-32 h-42 md:w-64 top-1/2 right-20 md:right-48 tranform translate-x-3/4 translate-y-1/4 bg-white rounded-lg shadow-lg p-2 z-30">
                <img src={shanghai} alt="Thailand" className="rounded-lg w-32 h-42 md:w-64 object-cover" />
                <div className="text-yellow-500 text-center font-bold py-1">THAILAND</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-red-500 text-center mb-4 pt-12">Start Your Journey</h2>
          <p className="text-xl sm:text-2xl md:text-4xl text-center font-bold py-2">Get ready for the adventure of a lifetime!</p>
        </div>
      </section>

      <section className="py-8">
        <div className="relative">
          <div ref={sliderTrackRef} className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-8 gap-10" style={{ 'scrollbarWidth': 'none' }}>
            {content
              .filter(item => item.category == "offers")
              .map(item => (
                <div key={item.id} className="slide snap-center flex-shrink-0 w-80 h-96 rounded-lg shadow-lg relative text-white overflow-hidden">
                  {/* Note: You might want to add an imageUrl property to your content objects */}
                  <img src={poolWoman} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-xs bg-red-500 text-white font-bold py-1 px-2 rounded-full uppercase">{item.category}</span>
                      <h3 className="text-3xl font-bold mt-2">{item.title}</h3>
                      <p className="text-sm mt-1">{item.description}</p>
                    </div>
                    <div className="text-xs text-right">
                      <p>Status: {item.status}</p>
                      <p>Created: {item.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
            <button onClick={() => slideJourney(-1)} className="slider-btn prev bg-white/50 hover:bg-white rounded-full w-10 h-10 text-2xl">‹</button>
            <button onClick={() => slideJourney(1)} className="slider-btn next bg-white/50 hover:bg-white rounded-full w-10 h-10 text-2xl">›</button>
          </div>
        </div>
      </section>

      <section className="py-8 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Main Jackpot Block */}
          {jackpotData ? (
            <div key={jackpotData.id} className="mb-12">

              {/* Title using data.price */}
              <p className="text-4xl text-center font-bold py-2">
                Buy a ₹{jackpotData.price} ticket, win a jackpot!
              </p>

              {/* CTA Button */}
              <div className="text-center py-6 pb-16">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md w-48">
                  Click Here
                </button>
              </div>

              {/* Jackpot Display Card */}
              <div className="hero-container bg-blue-900 rounded-lg flex items-center justify-between overflow-hidden relative">
                <div className="hero-text px-16 z-10">
                  <img
                    src={jackpot} // Using the static imported jackpot logo
                    alt="Jackpot Logo"
                    className="w-48 mb-4"
                  />
                  <h2 className="text-white text-3xl font-bold">{jackpotData.title}</h2>
                  <p className="text-white font-bold text-lg w-72 mb-8 mt-2">
                    {/* Fallback for empty description */}
                    {jackpotData.description || "Enter for your chance to win this amazing prize."}
                  </p>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 mb-12 px-6 rounded-md w-48">
                    Learn More
                  </button>
                </div>
                <img
                  // Using the fallback image because data.image is empty
                  src={jackpotData.image || dubaiWoman}
                  alt={jackpotData.title}
                  className="relative bottom-0 right-0 max-h-96 lady-image"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg font-medium">
                Jackpot details are not available at the moment.
              </p>
            </div>)}
        </div>
      </section>

      <section id="testimonials" className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-6xl text-red-500 text-center mb-5 py-8 font-semibold">Feedback From Our Prize Winners</h2>
          <div className="flex flex-col items-center flex-wrap justify-evenly md:flex-row gap-6 md:gap-8">
            <div className="grid grid-cols-3 gap-4">
              {testimonials.map(t => (
                <div key={t.id} className={`w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-4 transition-all ${activeTestimonial === t.id ? 'border-blue-500 scale-110' : 'border-transparent'}`} onClick={() => setActiveTestimonial(t.id)}>
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg min-h-[150px] relative">
              {testimonials.map(t => (
                <div key={t.id} className={`transition-opacity duration-300 ${activeTestimonial === t.id ? 'opacity-100' : 'opacity-0 absolute'}`}>
                  <h4 className="font-bold text-lg sm:text-xl md:text-2xl">{t.name}</h4>
                  <p className="text-gray-500 text-sm sm:text-base">{t.country}</p>
                  <p className="text-justify mt-2 text-sm sm:text-base md:text-lg">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-evenly items-center gap-8 md:gap-16">
          <div>
            <h2 className="text-5xl  md:text-7xl lg:text-8xl  font-bold text-green-500 mb-4">SPIN LUCK</h2>
            <div className="flex flex-col sm:flex-row items-center justify-evenly">
              <div className="w-40">
                <span className="text-red-500 text-2xl sm:text-3xl md:text-4xl font-bold">Rs.<span className="text-5xl sm:text-6xl md:text-8xl">49</span></span>
              </div>
              <div className="w-56 text-left p-2 sm:p-4">
                <p className="text-sm sm:text-lg md:text-xl text-gray-700">iPhone 16, Premium Luggage &amp; More!</p>
              </div>
            </div>
          </div>
          <div className="relative mt-8 md:mt-0 w-full md:w-auto flex justify-center">
            <img src={spinToWin} alt="Gift Box" className="mx-auto max-h-[20rem]" />
          </div>
        </div>
      </section>

      <footer className="py-8">
        <div className="container mx-auto px-4 flex justify-center flex-col items-center">
            <div><img src={logo} alt="Logo" className="w-28" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xl text-black">
            <div>
              <ul className="space-y-2">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/AboutUs">About Us</Link></li>
                <li><Link to="/Howtoplay">How to Play</Link></li>
                <li><Link to="/Faqs">Frequently Asked Questions</Link></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li><Link to="/TermsConditions">Terms and Conditions</Link></li>
                <li><Link to="/Support">Support</Link></li>
                <li><Link to="/PrivacyPolicy">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-2">Get in touch</p>
              <a href="https://wa.me/YOUR_PHONE_NUMBER" className="text-sm flex items-center mb-2">Chat with us {/* WhatsApp icon removed */}</a>
              <a href="tel:+97112345678" className="text-sm mb-2 block">Call us: +971 1 234 5678</a>
              <a href="mailto:support@luckmytrip.com" className="text-sm block">Email us: support@luckmytrip.com</a>
            </div>
            <div>
              <p className="font-bold mb-2">Download our App</p>
              <div className="flex items-center mt-4">
                <div className="border-2 border-red-600 text-red-600 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">18+</div>
                <div>
                  <p className="text-red-600 font-semibold">Play Right</p>
                  <p className="text-red-600 font-semibold">Play Responsibly</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center mt-8">
            * You must be 18 years or older to register and use this platform. Individuals from restricted jurisdictions are not permitted to register or use this platform.
          </p>
        </div>
      </footer>

      {isLoginOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeLogin}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>
              <form onSubmit={handleLoginFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input type="email" id="loginEmail" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
                </div>
                <div className="relative">
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input type={showPassword ? 'text' : 'password'} id="loginPassword" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-sm text-gray-500">{showPassword ? 'Hide' : 'Show'}</button>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Login</button>
              </form>
              <button onClick={closeLogin} className="mt-4 text-sm text-gray-500 w-full text-center">Cancel</button>
            </div>
          </div>
        </>
      )}

      {isRegisterOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeRegister}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create an Account</h2>
              <form onSubmit={handleRegisterFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Full Name</label>
                  <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input type="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Register</button>
              </form>
              <button onClick={closeRegister} className="mt-4 text-sm text-gray-500 w-full text-center">Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;