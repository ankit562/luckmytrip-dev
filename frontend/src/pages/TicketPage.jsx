import React, { useEffect, useState } from 'react';
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'
import { Search, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { fetchTickets } from "../features/tickets/ticketSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function Tickets() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { tickets } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const [dubaiQty, setDubaiQty] = useState(0);
  const [thailandQty, setThailandQty] = useState(0);


  const previousQty = useRef(0);

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
    const thailandTicket = tickets.find(ticket => ticket.name === "Dubai");
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


  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-10 min-h-screen">
      <Header />

      {/* DUBAI TRIP */}
      {tickets.filter((tri => tri.name === "Dubai")).map(tric => (<section className="bg-[#edf8fd] py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-bold text-[#ef3232] mb-6 uppercase">Dubai Trip</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-md h-80">
              <img src={tric.image} alt="Dubai" className="absolute inset-0 w-full h-full object-cover z-10" />
              <img src={"/images/shade.png"} alt="shade" className="absolute inset-0 w-full h-full object-cover z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20"></div>
              <div className="absolute z-30 p-6 w-full h-full flex flex-col justify-between text-white">
                <div className="flex justify-between items-center">
                  <div className="text-8xl font-bold leading-none">WIN</div>
                  <div className="text-right"><div className="text-5xl font-bold">{tric.name}</div>
                    <span className="inline-block bg-yellow-400 text-gray-900 font-semibold py-1 px-2 rounded-lg text-sm mt-2">{tric.description}</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div><div className="flex items-end gap-1 mb-2"><div className="flex flex-col items-center text-sm leading-tight"><span className="font-bold">Buy</span><span>Rs</span></div><span className="text-5xl font-bold text-yellow-400">{tric.price}</span><div className="flex flex-col items-start text-sm leading-tight"><span className="font-bold">From</span><span>India</span></div></div><p className="text-xs">Draw Date: {new Date(tric.date).toLocaleDateString()}<br />earlier if sold out</p></div>
                  <div className="text-right"><span className="text-xs font-bold block">Total Tickets</span><span className="text-5xl font-bold text-yellow-300 block">{tric.ticket}</span><button className="mt-2 bg-[#ef3232] hover:bg-[#d32c2c] text-white font-bold text-sm px-4 py-2 rounded-lg">BUY TICKET</button></div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-80 flex items-center justify-center">
                {/* Left button */}
                <button
                  className="absolute left-0 bg-white shadow-md hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center z-30"
                  onClick={() => alert("Previous")}
                  style={{ backgroundColor: "#8AC43F" }}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                {/* Bag Outline (Vector) */}
                <img
                  src={"/images/Vector.png"}
                  alt="Outline"
                  className="w-[340px] h-[300px] object-contain relative z-0"
                />

                {/* Luggage */}
                <img
                  src={"images/bag.png"}
                  alt="Luggage"
                  className="absolute w-[250px] h-[250px] object-contain z-10 left-52 drop-shadow-2xl"
                />

                {/* Text */}
                <div className="absolute bottom-30 left-28 z-10 text-left ">
                  <h3 className="text-3xl font-bold text-[#21b8b3] uppercase leading-tight mb-1">
                    Mokobara<br />Luggage
                  </h3>
                  <p className="text-blue-900 font-bold text-sm">DUBAI TRIP TICKET</p>
                  <p className="text-blue-900 text-xs mb-2">(one person)</p>
                  <button className="bg-[#ef3232] hover:bg-[#d41313] text-white font-bold px-4 py-1 rounded text-sm">
                    GIFT BUY
                  </button>
                </div>

                {/* Right button */}
                <button
                  className="absolute right-0 shadow-md hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center z-30"
                  onClick={() => alert("Next")}
                  style={{ backgroundColor: "#8AC43F" }}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex items-center justify-end gap-4 mt-4">
                <div className="flex items-center border-2 border-gray-600 rounded-md px-2 py-1 bg-white">
                  <button
                    onClick={handleDecrement}
                    className="w-6 h-6 rounded bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 font-bold">{dubaiQty}</span>
                  <button
                    onClick={handleIncrement}
                    className="w-6 h-6 rounded bg-green-400 text-white font-bold"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-[#ef3232] hover:bg-[#d41313] text-white font-bold px-6 py-2 rounded-lg"
                >
                  ADD TO CART
                </button>
                {/* The toaster is required once to display toasts */}

              </div>


            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">Return Ticket from India to Dubai</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">Pick & drop from airport</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <X className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">VISA</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">3 Star hotel for 2 nights with breakfast</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">Basic City Tour</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <X className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">Lunch, Dinner and Alcohol</span>
            </div>
          </div>

          <div className="text-center">
            <button onClick={handlebuymore} className="bg-teal-400 hover:bg-teal-500 text-white font-bold px-6 py-2.5 rounded-lg mb-2 uppercase tracking-wide">
              +Buy More Tickets
            </button>
            <p className="text-gray-700 text-sm font-medium">
              Buy More Tickets To Increase Your Chances Of Winning!
            </p>
          </div>
        </div>
      </section>))}

      <hr className=" border-gray-400 mx-auto max-w-5xl" />

      {/* THAILAND TRIP */}
      {tickets.filter((tri => tri.name === "Thailand")).map(tric => (<section className="bg-[#edf8fd] py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-bold text-[#ef3232] mb-6 uppercase">Thailand Trip</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-md h-80">
              <img src={"images/portrait-beautiful-young-asian-woman-relaxing-around-outdoor-swimming-pool-with-city-view.jpg"}
                alt="Thailand" className="absolute inset-0 w-full h-full object-cover z-10" />
              <img src={"/images/shade2.png"} alt="shade" className="absolute inset-0 w-full h-full object-cover z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent z-20"></div>
              <div className="absolute z-30 p-6 w-full h-full flex flex-col justify-between text-white">
                <div className="flex justify-between items-center">
                  <div className="text-8xl font-bold leading-none">WIN</div>
                  <div className="text-right"><div className="text-5xl font-bold">{tric?.name}</div>
                    <span className="inline-block bg-lime-300 text-gray-900 font-semibold py-1 px-3 rounded-lg text-sm mt-2">{tric?.description}</span></div>
                </div>
                <div className="flex justify-between items-end">
                  <div><div className="flex items-end gap-1 mb-2">
                    <div className="flex flex-col items-center text-sm leading-tight">
                      <span className="font-bold">Buy</span><span>Rs</span>
                    </div>
                    <span className="text-5xl font-bold text-yellow-400">{tric?.price}</span>
                    <div className="flex flex-col items-start text-sm leading-tight">
                      <span className="font-bold">From</span><span>India</span>
                    </div></div><p className="text-xs">Draw Date: {new Date(tric?.date).toLocaleDateString()} or<br />earlier if sold out</p></div>
                  <div className="text-right"><span className="text-xs font-bold block">Total Tickets</span><span className="text-5xl font-bold text-yellow-300 block">{tric?.ticket}</span><button className="mt-2 bg-[#ef3232] hover:bg-[#d32c2c] text-white font-bold text-sm px-4 py-2 rounded-lg">BUY TICKET</button></div>
                </div>
              </div>
            </div>
            <div className="relative">

              <div className="relative h-80 flex items-center justify-center">
                {/* Left button */}
                <button
                  className="absolute left-0 bg-white shadow-md hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center z-30"
                  onClick={() => alert("Previous")}
                  style={{ backgroundColor: "#8AC43F" }}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                {/* Bag Outline (Vector) */}
                <img
                  src={"/images/Vector.png"}
                  alt="Outline"
                  className="w-[340px] h-[300px] object-contain relative z-0"
                />

                {/* Luggage */}
                <img
                  src={"images/bag.png"}
                  alt="Luggage"
                  className="absolute w-[250px] h-[250px] object-contain z-10 left-52 drop-shadow-2xl"
                />

                {/* Text */}
                <div className="absolute bottom-30 left-28 z-10 text-left ">
                  <h3 className="text-3xl font-bold text-[#21b8b3] uppercase leading-tight mb-1">
                    Mokobara<br />Luggage
                  </h3>
                  <p className="text-blue-900 font-bold text-sm">DUBAI TRIP TICKET</p>
                  <p className="text-blue-900 text-xs mb-2">(one person)</p>
                  <button className="bg-[#ef3232] hover:bg-[#d41313] text-white font-bold px-4 py-1 rounded text-sm">
                    GIFT BUY
                  </button>
                </div>



                {/* Right button */}
                <button
                  className="absolute right-0 shadow-md hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center z-30"
                  onClick={() => alert("Next")}
                  style={{ backgroundColor: "#8AC43F" }}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex items-center justify-end gap-4 mt-4">
                <div className="flex items-center border-2 border-gray-600 rounded-md px-2 py-1 bg-white">
                  <button
                    onClick={handleDecrement2}
                    className="w-6 h-6 rounded bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 font-bold">{thailandQty}</span>
                  <button
                    onClick={handleIncrement2}
                    className="w-6 h-6 rounded bg-green-400 text-white font-bold"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart2}
                  className="bg-[#ef3232] hover:bg-[#d41313] text-white font-bold px-6 py-2 rounded-lg"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">Return Ticket from India to Thailand</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">Pick & drop from airport</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <X className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">VISA</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">3 Star hotel for 2 nights with breakfast</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">Basic City Tour</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <X className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">Lunch, Dinner and Alcohol</span>
            </div>
          </div>

          <div className="text-center">
            <button onClick={handlebuymore2} className="bg-teal-400 hover:bg-teal-500 text-white font-bold px-6 py-2.5 rounded-lg mb-2 uppercase tracking-wide">
              +Buy More Tickets
            </button>
            <p className="text-gray-700 text-sm font-medium">
              Buy More Tickets To Increase Your Chances Of Winning!
            </p>
          </div>
        </div>
      </section>))}

      <hr className="border-t-2 border-gray-300 mx-auto max-w-4xl my-8" />

      {/* Monthly Winner */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-bold text-red-500 text-center mb-12">Monthly Winner</h2>
          <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl h-[450px]">
            <img src={"/images/beautifulview.jpg"} alt="Desert" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-10 h-full flex items-end justify-between p-12">
              <div className="text-white"><h3 className="text-8xl font-bold text-yellow-400 mb-2">Jackpot</h3><p className="text-4xl font-bold mb-6">VIP TICKET</p><button className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-lg">Click Here</button></div>
              <img src={"/images/104-copy-3.png"} alt="Winner" className="absolute right-0 bottom-0 h-full object-contain" />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-12 max-w-5xl mx-auto">
            {['VIP AIRPORT PICKUP', 'Premium Luxury Hotel', 'City Tour with Model', 'Return Ticket', 'Dinner with Model'].map((f, i) => (
              <div key={i} className="border-2 border-cyan-400 rounded-lg px-4 py-3"><p className="text-blue-900 font-bold text-sm uppercase">{f}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}