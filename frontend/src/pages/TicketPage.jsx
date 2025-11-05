import React, { useEffect, useRef } from 'react';
import Header from '../components/commonComponent/Header';
import Footer from '../components/commonComponent/Footer';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import TripSection from '../components/ticketpageComponent/TicketCompo';
import { useLocation } from "react-router-dom";

import { fetchTickets } from '../features/tickets/ticketSlice';
import { Helmet } from 'react-helmet';

import {
  setDubaiQtys,
  setThailandQtys,
  setGoldenWinnerQtys,
  setDubaiPrices,
  setThailandPrices,
  setGoldenWinnerPrices,
  setGiftPrices,
} from '../features/addtocart/addtocartSlice';

export default function Tickets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dubaiRef = useRef(null);
  const thailandRef = useRef(null);

  const fromExplore = location.state?.fromExplore;
  const fromdubaicarosel = location.state?.fromdubaicarosel;

  const { tickets } = useSelector((state) => state.tickets);
  const cartItems = useSelector((state) => state.addtocart.cartItems || {});

  const {
    dubaiQty = 0,
    thailandQty = 0,
    goldenWinnerQty = 0,
    dubaiPrice = 0,
    thailandPrice = 0,
  } = cartItems;

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  // Load ticket prices dynamically into Redux
  useEffect(() => {
    if (tickets?.length > 0) {
      const dubaiTicket = tickets.find(t => t.name?.toLowerCase() === 'dubai');
      const thailandTicket = tickets.find(t => t.name?.toLowerCase() === 'thailand');
      if (dubaiTicket) dispatch(setDubaiPrices(dubaiTicket.price));
      if (thailandTicket) dispatch(setThailandPrices(thailandTicket.price));
      dispatch(setGoldenWinnerPrices(149));
      dispatch(setGiftPrices(49));
    }
  }, [tickets, dispatch]);

  // Handle deep-link navigation from homepage (hash like #dubai/#thailand)
  useEffect(() => {
    const hash = (location.hash || '').toLowerCase();
    if (hash === '#dubai') {
      dubaiRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (hash === '#thailand') {
      thailandRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  // Resolve current stock from fetched tickets
  const dubaiStock = tickets?.find(t => t.name?.toLowerCase() === 'dubai')?.ticket ?? 0;
  const thailandStock = tickets?.find(t => t.name?.toLowerCase() === 'thailand')?.ticket ?? 0;
  
  // Redirect logic
  useEffect(() => {
    // Only redirect if came from Explore and goldenWinnerQty is 0
    if (fromExplore && goldenWinnerQty === 0) {
      navigate('/explore');
    }
  }, [fromExplore, goldenWinnerQty, navigate]);

  useEffect(()=>{
    if(fromdubaicarosel && dubaiQty === 0){
      navigate("/explore")
    }
  },[fromdubaicarosel , dubaiQty ,  navigate])

  // Handlers for Dubai Ticket
  const handleIncrement = () => {
    if (dubaiStock <= 0) {
      toast.error('Dubai ticket is out of stock');
      return;
    }
    dispatch(setDubaiQtys(dubaiQty + 1));
    if (dubaiQty === 0) toast.success('Tickets added to cart');
  };
  const handleDecrement = () => {
    if (dubaiQty === 1) toast.success('Ticket discarded successfully');
    dispatch(setDubaiQtys(Math.max(0, dubaiQty - 1)));
  };
  const handleAddToCart = () => {
    if (dubaiStock <= 0) {
      toast.error('Dubai ticket is out of stock');
      return;
    }
    if (dubaiQty === 0) dispatch(setDubaiQtys(1));
    toast.success('Tickets added to cart');
    navigate('/addtocart');
  };

  // Handlers for Thailand Ticket
  const handleIncrement2 = () => {
    if (thailandStock <= 0) {
      toast.error('Thailand ticket is out of stock');
      return;
    }
    dispatch(setThailandQtys(thailandQty + 1));
    if (thailandQty === 0) toast.success('Tickets added to cart');
  };
  const handleDecrement2 = () => {
    if (thailandQty === 1) toast.success('Ticket discarded successfully');
    dispatch(setThailandQtys(Math.max(0, thailandQty - 1)));
  };
  const handleAddToCart2 = () => {
    if (thailandStock <= 0) {
      toast.error('Thailand ticket is out of stock');
      return;
    }
    if (thailandQty === 0) dispatch(setThailandQtys(1));
    toast.success('Tickets added to cart');
    navigate('/addtocart');
  };

  // Handlers for Golden Ticket
  const handleIncrement3 = () => {
    dispatch(setGoldenWinnerQtys(goldenWinnerQty + 1));
    if (goldenWinnerQty === 0) toast.success('Tickets added to cart');
  };
  const handleDecrement3 = () => {
    if (goldenWinnerQty === 1) toast.success('Ticket discarded successfully');
    dispatch(setGoldenWinnerQtys(Math.max(0, goldenWinnerQty - 1)));
  };
  const handleAddToCart3 = () => {
    if (goldenWinnerQty === 0) dispatch(setGoldenWinnerQtys(1));
    toast.success('Tickets added to cart');
    navigate('/addtocart');
  };

  const options = [
    'VIP AIRPORT PICKUP',
    'PREMIUM LUXURY HOTEL',
    'CITY TOUR WITH MODEL',
    'RE-TURN TICKET',
    'DINNER WITH MODEL',
  ];

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-10 min-h-screen">
      <Header />
      
      <Helmet>
  {/* Basic Meta Tags */}
  <title>Buy Contest Tickets & Win Trips</title>
  <meta
    name="description"
    content="Buy your contest tickets today (₹299, ₹499, ₹599). Each draw limited to 2000 entries. Play now and win Dubai, Baku, Thailand packages!"
  />
  <meta
    name="keywords"
    content="buy contest tickets, contest entry, lucky draw ticket, win trips, Dubai Baku Thailand packages"
  />

  {/* Open Graph Tags */}
  <meta property="og:title" content="Buy Contest Tickets & Win Trips" />
  <meta
    property="og:description"
    content="Secure your spot in contests with limited entries. Purchase tickets and stand a chance to win luxury trips!"
  />
  <meta property="og:url" content="https://www.theluckmytrip.com/tickets/" />

  {/* Canonical URL */}
  <link rel="canonical" href="https://www.theluckmytrip.com/tickets/" />

  {/* Structured Data - Schema.org Product / Offer and Contest */}
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Contest Tickets",
        "url": "https://www.theluckmytrip.com/tickets/",
        "description": "Buy contest tickets at ₹299, ₹499, or ₹599. Limited draw of 2000 entries. Win trips to Dubai, Baku, Thailand.",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "299",
          "availability": "https://schema.org/InStock",
          "url": "https://www.theluckmytrip.com/tickets/"
        },
        "mainEntityOfPage": {
          "@type": "Contest",
          "name": "Luxury Travel Contest",
          "url": "https://www.theluckmytrip.com/tickets/",
          "description": "Purchase contest tickets and stand a chance to win luxury trips."
        }
      }
    `}
  </script>
</Helmet>
      {/* Dubai and Thailand */}
      {tickets
        .filter(tri => ['dubai', 'Thailand'].includes(tri.name))
        .map(trip => (
          <div key={trip.id} ref={trip.name?.toLowerCase() === 'dubai' ? dubaiRef : thailandRef}>
          <TripSection
            key={trip.id}
            trip={trip}
            qty={trip.name?.toLowerCase() === 'dubai' ? dubaiQty : thailandQty}
            onIncrement={trip.name?.toLowerCase() === 'dubai' ? handleIncrement : handleIncrement2}
            onDecrement={trip.name?.toLowerCase() === 'dubai' ? handleDecrement : handleDecrement2}
            onAddToCart={trip.name?.toLowerCase() === 'dubai' ? handleAddToCart : handleAddToCart2}
          />
          </div>
        ))}

      {/* Monthly Winner (Golden Ticket) */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-[3.1rem] font-bold text-red-500 text-center mb-12 font-berlin">
            Monthly Winner
          </h2>
          <div className="relative max-w-[1053.7px] mx-auto rounded-3xl overflow-hidden shadow-2xl md:h-[452.59px] h-[320px]">
            <img src="/images/beautifulview.jpg" alt="Desert" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative h-full flex items-end justify-between md:p-12 p-4">
              <div className="z-30 relative">
                <img src="/images/goldenwinner.png" className="md:w-96 w-40 md:mb-24 ml-2" />

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border-2 border-black rounded-md px-2 py-1">
                    <button onClick={handleDecrement3} className="w-6 h-6 bg-gray-100 text-black font-bold">-</button>
                    <span className="px-3 font-bold text-white">{goldenWinnerQty}</span>
                    <button onClick={handleIncrement3} className="w-6 h-6 bg-green-400 text-white font-bold">+</button>
                  </div>
                  <button
                    onClick={handleAddToCart3}
                    className="bg-[#ef3232] hover:bg-[#d41313] text-white text-xs font-bold md:px-6 md:py-2 px-3 py-2 rounded-lg"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
              <img src="/images/104-copy-3.png" alt="Winner" className="absolute right-16 bottom-0 h-[100%] object-contain" />
            </div>
          </div>

          <div className="w-full max-w-[85%] mx-auto mt-8 mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {options.map((option) => (
                <button
                  key={option}
                  className="border-2 border-teal-500 rounded-lg px-3 py-6 text-sm font-bold text-teal-900 text-center hover:bg-teal-100"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
