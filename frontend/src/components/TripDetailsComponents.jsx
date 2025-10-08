// Reusable OfferCard component
import React from "react";
export
  function OfferCard({
    mainImage,
    shadeImage,
    mainText,
    location,
    subtitle,
    price,
    currency,
    fromLocation,
    drawDate,
    totalTickets,

  }) {
  return (
    <div className="relative bg-white rounded-3xl overflow-hidden shadow-md md:w-full w-[350px] h-[320px] flex items-end mb-7 lg:mb-0">
      <img
        src={mainImage}
        alt={location}
        className="inset-0 w-full max-w-full block h-full object-cover rounded-3xl z-10"
      />
      <img
        src={shadeImage}
        alt={`${location} shade`}
        className="absolute inset-0 w-full max-w-full block h-full object-cover rounded-3xl z-20"
      />
      <div className="absolute z-30 p-4 w-full flex flex-col h-full justify-between">
        <div className="flex justify-between w-full h-[50%] items-center mt-5">
          <div className="flex justify-start items-end">
            <span className="md:ml-3 text-white font-bold text-[70px] md:text-[105px] leading-[0.9] tracking-tight">
              {mainText}
            </span>
          </div>
          <div className="flex flex-col items-end space-y-4">
            <span className="text-white font-bold md:text-[60px] text-[30px] leading-[0.9] tracking-tight">
              {location}
            </span>

          </div>
        </div>

        <div className="flex justify-between w-full h-[50%] items-center">
          <div className="flex flex-col items-center justify-start space-y-5 md:ml-4 ml-1" >
            <div className="mt-8 mb-0 flex justify-start items-center md:gap-1 ">
              <div className="flex flex-col items-center justify-start leading-[0.7]">
                <span className="block text-white text-sm md:text-lg font-bold">Buy </span>
                <span className="text-white font-bold text-sm md:text-base">{currency}</span>
              </div>
              <span className="text-yellow-400 text-3xl md:text-5xl font-extrabold leading-[0.5] ">
                {price}
              </span>
              <div className="flex flex-col items-start justify-start leading-[0.7]">
                <span className="block text-white md:text-lg text-sm font-bold">From</span>
                <span className="text-white font-bold md:text-base text-sm align-top">{fromLocation}</span>
              </div>
            </div>
            <p className="text-white text-xs sm:text-sm font-normal flex-wrap">
              Draw Date: {drawDate} or <br/> earlier if the campaign is sold out
            </p>
          </div>
          
          <div className="mt-8 mb-0 flex flex-col justify-start items-center space-y-3 space-x-1">
            <span className="mt-1 inline-block bg-yellow-400 text-[#183f68] 
             font-semibold md:py-1 py-1/2 px-1 md:px-3 rounded-md md:rounded-lg text-xs md:text-base">
              {subtitle}
            </span>
            <div className="flex flex-col items-start pl-4">
              <span className="text-white text-xs sm:text-sm opacity-95 font-extrabold leading-none">Total Tickets</span>
              <span className="text-yellow-300 text-4xl sm:text-5xl opacity-95 font-extrabold mt-0 leading-none">{totalTickets}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
