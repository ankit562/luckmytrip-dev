import React, { useState } from 'react';
import { Search, Minus, Plus } from 'lucide-react';
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'

export default function Cart() {
  const [dubaiQty, setDubaiQty] = useState(0);
  const [giftQty, setGiftQty] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    address: '',
    apartment: '',
    city: '',
    phone: '',
    email: '',
    saveInfo: false
  });
  
  const [errors, setErrors] = useState({});

  const dubaiPrice = 499;
  const giftPrice = 49;

  const subtotal = dubaiQty * dubaiPrice + giftQty * giftPrice;
  const total = subtotal;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = true;
    if (!formData.address.trim()) newErrors.address = true;
    if (!formData.city.trim()) newErrors.city = true;
    if (!formData.phone.trim() || formData.phone.length !== 10) newErrors.phone = true;
    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = true;
    if (!paymentMethod) newErrors.paymentMethod = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      alert('Order placed successfully!');
      setFormData({
        firstName: '',
        companyName: '',
        address: '',
        apartment: '',
        city: '',
        phone: '',
        email: '',
        saveInfo: false
      });
      setDubaiQty(0);
      setGiftQty(0);
      setPaymentMethod('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50">
      {/* Navigation */}
      <Header/>

      {/* Cart Section */}
      <section className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Billing Details Form */}
          <div className="bg-white rounded-3xl shadow-lg px-8 py-8">
            <h2 className="text-3xl font-bold text-teal-500 mb-8 uppercase tracking-wide">Billing Details</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-gray-400 text-sm mb-2">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`p-3 rounded-lg w-full bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.firstName ? 'ring-2 ring-red-500' : ''}`}
                />
                {errors.firstName && <span className="mt-1 text-sm text-red-600">First name is required.</span>}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="p-3 rounded-lg w-full bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Street Address*</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`p-3 rounded-lg w-full bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.address ? 'ring-2 ring-red-500' : ''}`}
                />
                {errors.address && <span className="mt-1 text-sm text-red-600">Address is required.</span>}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Apartment, floor, etc. (optional)</label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="p-3 rounded-lg w-full bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Town/City*</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`p-3 rounded-lg w-full bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.city ? 'ring-2 ring-red-500' : ''}`}
                />
                {errors.city && <span className="mt-1 text-sm text-red-600">City is required.</span>}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  maxLength={10}
                  className={`p-3 rounded-lg w-full bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.phone ? 'ring-2 ring-red-500' : ''}`}
                />
                {errors.phone && <span className="mt-1 text-sm text-red-600">Phone must be 10 digits.</span>}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`p-3 rounded-lg w-full bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                />
                {errors.email && <span className="mt-1 text-sm text-red-600">Enter a valid email address.</span>}
              </div>

              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                  className="w-5 h-5 accent-red-500 cursor-pointer"
                />
                <span className="ml-3 text-sm text-gray-700">Save this information for faster check-out next time</span>
              </label>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="space-y-6">
            {/* Dubai Ticket */}
            <div className="bg-white rounded-2xl shadow-md px-6 py-5 flex items-center justify-between">
              <div className="font-bold text-teal-600 uppercase text-lg">Dubai Ticket</div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-1 py-1">
                  <button
                    type="button"
                    onClick={() => setDubaiQty(Math.max(0, dubaiQty - 1))}
                    className="w-8 h-8 rounded-md bg-white flex items-center justify-center hover:bg-gray-50 transition"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="px-4 font-semibold text-gray-800">{dubaiQty}</span>
                  <button
                    type="button"
                    onClick={() => setDubaiQty(dubaiQty + 1)}
                    className="w-8 h-8 rounded-md bg-green-500 flex items-center justify-center hover:bg-green-600 transition"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="font-semibold text-gray-800 min-w-[80px] text-right">
                  Rs. {dubaiQty * dubaiPrice}
                </div>
              </div>
            </div>

            {/* Gifts */}
            <div className="bg-white rounded-2xl shadow-md px-6 py-5 flex items-center justify-between">
              <div className="font-bold text-teal-600 uppercase text-lg">Gifts</div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-1 py-1">
                  <button
                    type="button"
                    onClick={() => setGiftQty(Math.max(0, giftQty - 1))}
                    className="w-8 h-8 rounded-md bg-white flex items-center justify-center hover:bg-gray-50 transition"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="px-4 font-semibold text-gray-800">{giftQty}</span>
                  <button
                    type="button"
                    onClick={() => setGiftQty(giftQty + 1)}
                    className="w-8 h-8 rounded-md bg-green-500 flex items-center justify-center hover:bg-green-600 transition"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="font-semibold text-gray-800 min-w-[80px] text-right">
                  Rs. {giftQty * giftPrice}
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="bg-white rounded-2xl shadow-md px-6 py-6 space-y-4">
              <div className="flex justify-between items-center text-gray-700">
                <span className="font-medium">Subtotal:</span>
                <span className="font-semibold">{subtotal}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center text-gray-900">
                <span className="font-semibold text-lg">Total:</span>
                <span className="font-bold text-lg">{total}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-md px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'bank'}
                    onChange={() => {
                      setPaymentMethod(paymentMethod === 'bank' ? '' : 'bank');
                      if (errors.paymentMethod) setErrors(prev => ({ ...prev, paymentMethod: false }));
                    }}
                    className="w-5 h-5 accent-pink-500 cursor-pointer"
                  />
                  <span className="font-medium text-gray-800">Bank</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-pink-500 rounded text-white text-xs font-bold">bKash</div>
                  <div className="px-2 py-1 bg-blue-600 rounded text-white text-xs font-bold">VISA</div>
                  <div className="px-2 py-1 bg-orange-500 rounded text-white text-xs font-bold">MC</div>
                  <div className="px-2 py-1 bg-orange-600 rounded text-white text-xs font-bold">Nagad</div>
                </div>
              </div>
              {errors.paymentMethod && <span className="text-red-600 text-sm mt-2 block">Please select a payment method.</span>}
            </div>

            {/* Coupon */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Coupon Code"
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="bg-teal-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-teal-600 transition uppercase">
                Apply Coupon
              </button>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full md:w-auto bg-red-500 text-white py-3 px-8 rounded-xl font-bold hover:bg-red-600 transition uppercase text-lg shadow-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}