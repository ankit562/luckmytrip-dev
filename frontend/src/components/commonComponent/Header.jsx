import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const linkClasses = "transition-colors duration-300";
const activeNavClass = "text-red-600 underline"; // Change to your preferred active color
const inactiveNavClass = "text-gray-700";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full p-4">
      <div className="container mx-auto flex items-center justify-between uppercase">

        <img src={'/images/luckmytrip-logo.png'} alt="Luckymytrip Logo" className="w-24 sm:w-28" />

        <div className="flex items-center space-x-4">
          <ul className="hidden md:flex space-x-6 lg:space-x-12 font-semibold">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass}`
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass}`
                }
              >
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ticket"
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass}`
                }
              >
                Tickets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contactus"
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass}`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex space-x-4 font-semibold items-center">
          <Link to="/login" className="hidden md:block hover:underline">Login</Link>
          <Link to="/signup" className="hidden md:block hover:underline text-lg font-semibold bg-red-500 text-white px-4 py-2 rounded-md">Register</Link>
          <button className="md:hidden text-2xl focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-2 bg-white shadow-md rounded-md p-4 space-y-4 font-semibold flex flex-col">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass} block`
          } end>
            Home
          </NavLink>
          <NavLink to="/explore" onClick={() => setMenuOpen(false)} className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass} block`
          }>Explore</NavLink>
          <NavLink to="/ticket" onClick={() => setMenuOpen(false)} className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass} block`
          }>Tickets</NavLink>
          <NavLink to="/contactus" onClick={() => setMenuOpen(false)} className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeNavClass : inactiveNavClass} block`
          }>Contact</NavLink>
          <div className="flex flex-col space-y-2 pt-2 border-t">
            <Link to="/login" className="w-full text-left">Login</Link>
            <Link to="/signup" className=" hover:underline">Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
