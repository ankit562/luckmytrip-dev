import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'
import { Search, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { fetchTickets } from "../features/tickets/ticketSlice";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {useLocation, useNavigate } from 'react-router-dom';
import TripSection from "../components/ticketpageComponent/TicketCompo";


export default function Tickets() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const location = useLocation();

  const { tickets } = useSelector((state) => state.tickets);

const fromExplore = location.state?.fromExplore || false;
const previousQty = useRef(0);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const [dubaiQty, setDubaiQty] = useState(0);
  const [thailandQty, setThailandQty] = useState(0);
 const [goldenQty, setGoldenQty] = useState(location.state?.qty || 0);


  const handleIncrement = () => {
    setDubaiQty((qty) => {
      const newQty = qty + 1;
      if (qty === 0 && newQty === 1) {
        toast.success("Tickets added to cart");
      }
      previousQty.current = qty;
      return newQty;
    });
  };

  const handleDecrement = () => {
    setDubaiQty((qty) => {
      const newQty = Math.max(0, qty - 1);
      if (qty === 1 && newQty === 0) {
        toast.success("Ticket discarded successfully");
      }
      previousQty.current = qty;
      return newQty;
    });
  };

  const giftPrice = 500; // your static gift price

  const handleAddToCart = () => {
    try {
      const dubaiTicket = tickets.find(ticket => ticket.name === "Dubai");
      const dubaiPrice = dubaiTicket ? dubaiTicket.price : 0;

      if (dubaiQty === 0) {
        setDubaiQty(1);
        toast.success("Tickets added to cart");
        navigator('/addtocart', { state: { qty: 1, price: dubaiPrice, giftPrice } });
      } else {
        navigator('/addtocart', { state: { qty: dubaiQty, price: dubaiPrice, giftPrice } });
      }
    } catch (error) {
      toast.error('Something went wrong.', error);
    }
  };

  const handlebuymore = () => {
    setDubaiQty(1);
    navigator('/addtocart')
  }


  const handleIncrement2 = () => {
    setThailandQty((qty) => {
      const newQty = qty + 1;
      if (qty === 0 && newQty === 1) {
        toast.success("Tickets added to cart");
      }
      previousQty.current = qty;
      return newQty;
    });
  };

  const handleDecrement2 = () => {
    setThailandQty((qty) => {
      const newQty = Math.max(0, qty - 1);
      if (qty === 1 && newQty === 0) {
        toast.success("Ticket discarded successfully");
      }
      previousQty.current = qty;
      return newQty;
    });
  };


  const giftPrice2 = 500;

  const handleAddToCart2 = () => {
    try {
      const thailandTicket = tickets.find(ticket => ticket.name === "Thailand");
      const thailandPrice = thailandTicket ? thailandTicket.price : 0;

      if (thailandQty === 0) {
        setThailandQty(1);
        toast.success("Tickets added to cart");
        navigator('/addtocart', { state: { qty: 1, price: thailandPrice, giftPrice2 } });
      } else {
        navigator('/addtocart', { state: { qty: thailandQty, price: thailandPrice, giftPrice2 } });
      }
    } catch (error) {
      toast.error('Something went wrong.', error);
    }
  };

    const handlebuymore2 = () => {
    setThailandQty(1);
    navigator('/addtocart')
  }
  


 const handleDecrement3 = () => {
    setGoldenQty((prev) => {
      const newQty = Math.max(0, prev - 1);
      if (prev === 1 && newQty === 0) {
        toast.success("Ticket discarded successfully");
        if (fromExplore) {
          navigator("/explore");
        }
      }
      previousQty.current = prev;
      return newQty;
    });
  };

  const handleIncrement3 = () => {
    setGoldenQty((prev) => {
      const newQty = prev + 1;
      if (prev === 0 && newQty === 1) {
        toast.success("Tickets added to cart");
      }
      previousQty.current = prev;
      return newQty;
    });
  };


  const onBuyMore = () => {
    setGoldenQty(1);
    navigator("/addtocart", { state: { ticketType: "Golden Ticket", qty: goldenQty } });
  };


  const options = [
    "VIP AIRPORT PICKUP",
    "PREMIUM LUXURY HOTEL",
    "CITY TOUR WITH MODEL",
    "RE-TURN TICKET",
    "DINNER WITH MODEL",
  ];
  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-10 min-h-screen">
      <Header />

      {tickets
        .filter(tri => ["dubai", "Thailand"].includes(tri.name))
        .map(trip => (
          <TripSection
            key={trip.id}
            trip={trip}
            qty={trip.name === "dubai" ? dubaiQty : thailandQty}
            onIncrement={trip.name === "dubai" ? handleIncrement : handleIncrement2}
            onDecrement={trip.name === "dubai" ? handleDecrement : handleDecrement2}
            onAddToCart={trip.name === "dubai" ? handleAddToCart : handleAddToCart2}
            onBuyMore={trip.name === "dubai" ? handlebuymore : handlebuymore2}        
          />
        ))}

      {/* Monthly Winner */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-[3.1rem] font-bold text-red-500 text-center mb-12 font-berlin">Monthly Winner</h2>

          <div className="relative max-w-[1053.7px] mx-auto rounded-3xl overflow-hidden shadow-2xl md:h-[452.59px] h-[320px]">
            <img src={"/images/beautifulview.jpg"} alt="Desert" className="absolute inset-0 w-full h-full object-cover " />
            <div className="relative  h-full flex items-end justify-between md:p-12 p-4 ">
              <div className=" z-30 relative ">
                <img src="/images/goldenwinner.png" className=" md:w-96 w-40 md:mb-24 md-10 ml-2" />

                <div className="flex items-center justify-start gap-4 mt-4">
                  <div className="flex items-center border-2 border-black rounded-md px-2 py-1 ">
                    <button
                      onClick={handleDecrement3}
                      className="font-montserrat w-6 h-6 rounded bg-gray-100  text-black font-bold"
                    >
                      -
                    </button>
                    <span className=" px-3 font-bold text-white font-montserrat">{goldenQty}</span>
                    <button
                      onClick={handleIncrement3}
                      className="font-montserrat w-6 h-6 rounded bg-green-400 text-white font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={onBuyMore}
                    className="font-montserrat bg-[#ef3232] hover:bg-[#d41313] text-white
                     text-xs ms:text-base font-bold md:px-6 md:py-2 px-3 py-2 rounded-lg"
                  >
                    ADD TO CART
                  </button>
                </div>

              </div>
              <img src={"/images/104-copy-3.png"} alt="Winner" className="absolute right-16 bottom-0 h-[100%] object-contain " />
            </div>
          </div>

          <div className="w-full max-w-[96%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[85%] 
          xl:max-w-[80%] mx-auto px-2 sm:px-4 md:px-4 md:py-4 lg:p-4 mt-4 sm:mt-6 md:mt-6 
          lg:mt-8 xl:mt-10 mb-6">
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
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

