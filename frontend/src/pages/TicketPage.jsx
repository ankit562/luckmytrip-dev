import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/commonComponent/Header';
import Footer from '../components/commonComponent/Footer';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import TripSection from '../components/ticketpageComponent/TicketCompo';

import { fetchTickets } from '../features/tickets/ticketSlice';
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

  const { tickets } = useSelector((state) => state.tickets);
  const addtocartState = useSelector((state) => state.addtocart || {});
  const {
    dubaiQty: reduxDubaiQty = 0,
    thailandQty: reduxThailandQty = 0,
    goldenWinnerQty: reduxGoldenQty = 0,
    dubaiPrice = 0,
    thailandPrice = 0,
    // goldenWinnerPrice = 0,
    // giftPrice = 0,
  } = addtocartState.cartItems || {};

  const fromdubaicarosel = location.state?.fromdubaicarosel || false;
  const fromExplore = location.state?.fromExplore || false;

  // const previousQty = useRef(0);
  // const previousQty2 = useRef(0);

  const [dubaiQty, setDubaiQty] = useState(location.state?.qty || 0);
  const [thailandQty, setThailandQty] = useState(0);
  const [goldenQty, setGoldenQty] = useState(location.state?.goldenqty || 0);

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

  // Sync quantities with Redux
  useEffect(() => {
    if (dubaiQty !== reduxDubaiQty) dispatch(setDubaiQtys(dubaiQty));
  }, [dubaiQty, reduxDubaiQty, dispatch]);

  useEffect(() => {
    if (thailandQty !== reduxThailandQty) dispatch(setThailandQtys(thailandQty));
  }, [thailandQty, reduxThailandQty, dispatch]);

  useEffect(() => {
    if (goldenQty !== reduxGoldenQty) dispatch(setGoldenWinnerQtys(goldenQty));
  }, [goldenQty, reduxGoldenQty, dispatch]);

  // Dubai increment/decrement handlers
  const handleIncrement = () => {
    setDubaiQty(prev => {
      const newQty = prev + 1;
      if (prev === 0) toast.success('Tickets added to cart');
      return newQty;
    });
  };

  const handleDecrement = () => {
    setDubaiQty(qty => {
      const newQty = Math.max(0, qty - 1);
      if (qty === 1 && newQty === 0) {
        toast.success('Ticket discarded successfully');
        if (fromdubaicarosel) navigate('/explore');
      }
      return newQty;
    });
  };

  // Thailand increment/decrement
  const handleIncrement2 = () => {
    setThailandQty(qty => {
      const newQty = qty + 1;
      if (qty === 0) toast.success('Tickets added to cart');
      return newQty;
    });
  };

  const handleDecrement2 = () => {
    setThailandQty(qty => {
      const newQty = Math.max(0, qty - 1);
      if (qty === 1 && newQty === 0) toast.success('Ticket discarded successfully');
      return newQty;
    });
  };

  // Golden ticket increment/decrement
  const handleIncrement3 = () => {
    setGoldenQty(prev => {
      const newQty = prev + 1;
      if (prev === 0) toast.success('Tickets added to cart');
      return newQty;
    });
  };

  const handleDecrement3 = () => {
    setGoldenQty(prev => {
      const newQty = Math.max(0, prev - 1);
      if (prev === 1 && newQty === 0) {
        toast.success('Ticket discarded successfully');
        if (fromExplore) navigate('/explore');
      }
      return newQty;
    });
  };

  // Add to cart actions
  const handleAddToCart = () => {
    const ticketData = tickets.find(t => t.name === 'Dubai');
    const price = ticketData ? ticketData.price : dubaiPrice;
    if (dubaiQty === 0) setDubaiQty(1);
    toast.success('Tickets added to cart');
    navigate('/addtocart', {
      state: {
        Type: 'Dubai Ticket',
        qty1: dubaiQty || 1,
        price1: price,
        dubaiTicket: true,
      },
    });
  };

  const handleAddToCart2 = () => {
    const ticketData = tickets.find(t => t.name === 'Thailand');
    const price = ticketData ? ticketData.price : thailandPrice;
    if (thailandQty === 0) setThailandQty(1);
    toast.success('Tickets added to cart');
    navigate('/addtocart', {
      state: {
        Type: 'Thailand Ticket',
        qty2: thailandQty || 1,
        price2: price,
        thailandTicket: true,
      },
    });
  };

  const goldenprices = 149 * goldenQty;
  const onBuyMore = () => {
    setGoldenQty(1);
    navigate('/addtocart', {
      state: {
        Type: 'Golden Winner Ticket',
        qty3: goldenQty,
        price3: goldenprices,
        goldenTicket: true,
      },
    });
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

      {tickets
        .filter(tri => ['dubai', 'Thailand'].includes(tri.name))
        .map(trip => (
          <TripSection
            key={trip.id}
            trip={trip}
            qty={trip.name === 'dubai' ? dubaiQty : thailandQty}
            onIncrement={trip.name === 'dubai' ? handleIncrement : handleIncrement2}
            onDecrement={trip.name === 'dubai' ? handleDecrement : handleDecrement2}
            onAddToCart={trip.name === 'dubai' ? handleAddToCart : handleAddToCart2}
          />
        ))}

      {/* Monthly Winner */}
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
                    <span className="px-3 font-bold text-white">{goldenQty}</span>
                    <button onClick={handleIncrement3} className="w-6 h-6 bg-green-400 text-white font-bold">+</button>
                  </div>
                  <button
                    onClick={onBuyMore}
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
