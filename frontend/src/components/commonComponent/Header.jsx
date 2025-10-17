import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { logoutUser } from '../../features/auth/authUserSlice';


const linkClasses = "transition-colors duration-300";
const activeNavClass = "text-red-600 no-underline"; // Active link styling without underline
const inactiveNavClass = "text-gray-700";

import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handlelogout = () => {
    dispatch(logoutUser())
  }

  return (

    <nav className="w-full p-4">
      <div className="container mx-auto flex items-center justify-between uppercase">

        <img src={'/images/luckmytrip-logo.png'} alt="Luckymytrip Logo" className="w-24 sm:w-28" />

        <div className="flex items-center space-x-4">
          <ul className="hidden md:flex space-x-6 lg:space-x-12 font-semibold font-montserrat">
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

        <div className="flex md:space-x-4 space-x-2 font-semibold items-center font-montserrat">

          {user 
            ? (<button onClick={handlelogout} className="hidden md:block w-full text-left text-lg hover:underline hover:text-blue-500">Logout</button>)
            : (<Link to="/login" className="md:block hidden w-full text-left text-lg hover:underline hover:text-blue-500">Login</Link>)
          }
          {!user
            ?(<Link to="/signup" className="hidden md:block hover:underline text-lg font-semibold bg-red-500 text-white px-4 py-2 rounded-md">Register</Link>)
            :(<Link to="/addtocart"><ShoppingCart   className="hidden md:block text-red-500 md:w-9 md:h-9  w-7 h-7 cursor-pointer active:text-blue-600" /></Link>)
          }

          <button className="md:hidden text-2xl focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-2 bg-white shadow-md rounded-md p-4 space-y-4 font-semibold flex flex-col font-montserrat">
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

            {user ? (<button onClick={handlelogout} className="w-full text-left active:underline active:text-blue-500">Logout</button>) 
            : (<Link to="/login" className="w-full text-left">Login</Link>)}

            {!user
              ?
              (<Link to="/signup" className=" hover:underline">Register</Link>)
              : (<ShoppingCart className="text-red-500 md:w-9 md:h-9  w-6 h-6" />)}
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
