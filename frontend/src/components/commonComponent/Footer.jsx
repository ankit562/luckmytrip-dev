import React from 'react'
import {Link} from "react-router-dom"
const Footer = () => {
  return (
         
      <footer className="py-8 bg-[#E9F2FF]">
        <div className=" mx-auto px-4 flex flex-col items-center">
          <div><img src={'/images/luckmytrip-logo.png'} alt="Logo" className="w-28" /></div>
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
              <a href="https://wa.me/YOUR_PHONE_NUMBER" className="text-sm flex items-center mb-2">Chat with us</a>
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
  )
}

export default Footer

