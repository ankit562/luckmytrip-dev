
import OfferCard from "../components/TicketComponent";
import React from "react";

const offerData = [
  {
    title: "WIN",
    subtitle: "kk",
    badge: "kjhjk",
    totalTickets: 2500,
    endsIn: "5 Days",
    price: 499,
    country: "India",
    drawDate: "2025-02-20",
    limitedTime: true,
  },
  {
    title: "WIN",
    subtitle: "Mega Prize",
    badge: "abc123",
    totalTickets: 1800,
    endsIn: "3 Days",
    price: 299,
    country: "India",
    drawDate: "2025-02-18",
    limitedTime: false,
  },
  {
    title: "WIN",
    subtitle: "Super Pot",
    badge: "lucky",
    totalTickets: 3200,
    endsIn: "7 Days",
    price: 699,
    country: "India",
    drawDate: "2025-02-25",
    limitedTime: true,
  },
];

const Ticket = () => (
  <div className="bg-gray-950 min-h-screen py-8">
    {offerData.map((offer, idx) => (
      <OfferCard key={idx} {...offer} />
    ))}
  </div>
);

export default Ticket;
