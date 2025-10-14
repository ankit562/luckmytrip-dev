import React, { useState } from 'react'
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'

const ContactUsPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validatePhone = (phone) => /^[0-9+\-\s()]{7,15}$/.test(phone)

  const handleSubmit = (e) => {
    e.preventDefault()

    let valid = true

    if (!name.trim()) {
      setNameError('Name is required')
      valid = false
    } else setNameError('')

    if (!email.trim()) {
      setEmailError('Email is required')
      valid = false
    } else if (!validateEmail(email)) {
      setEmailError('Email is invalid')
      valid = false
    } else setEmailError('')

    if (!phone.trim()) {
      setPhoneError('Phone is required')
      valid = false
    } else if (!validatePhone(phone)) {
      setPhoneError('Phone number is invalid')
      valid = false
    } else setPhoneError('')

    if (valid) {
      alert('Form submitted successfully!')
      setName('')
      setEmail('')
      setPhone('')
    }
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-10 min-h-screen">
      <Header />

      <section className="py-10 px-4 flex justify-center items-center bg-blue-50 min-h-full">
        <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full md:p-8 p-5">
          <h2 className="text-2xl font-bold text-teal-600 mb-6">Contact Us</h2>
          <form id="contactForm" noValidate onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="flex flex-col space-y-5">
                <div>
                  <label className="text-gray-700 font-semibold mb-2 block" htmlFor="names">Name</label>
                  <input
                    id="names"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 ${nameError ? 'border-red-600' : ''}`}
                  />
                  {nameError && <span className="text-red-600 text-sm mt-1">{nameError}</span>}
                </div>

                <div>
                  <label className="text-gray-700 font-semibold mb-2 block" htmlFor="emails">Email Address</label>
                  <input
                    id="emails"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 ${emailError ? 'border-red-600' : ''}`}
                  />
                  {emailError && <span className="text-red-600 text-sm mt-1">{emailError}</span>}
                </div>

                <div>
                  <label className="text-gray-700 font-semibold mb-2 block" htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Your Phone Number"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 ${phoneError ? 'border-red-600' : ''}`}
                  />
                  {phoneError && <span className="text-red-600 text-sm mt-1">{phoneError}</span>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded shadow transition font-bold mt-4 md:mt-0"
                >
                  Submit
                </button>
              </div>

              <div className="flex flex-col h-full justify-between">
                <h1 className="text-gray-700 font-semibold block md:text-3xl text-2xl mb-4" htmlFor="address">Address</h1>
                <div className="flex flex-col md:text-lg text-base mb-16 font-semibold">
                  <p>456 Oak Drive</p>
                  <p>Building 2, Room 210</p>
                  <p>Midtown Manhattan</p>
                  <p>New York, NY 10001</p>
                  <p>USA</p>
                  <p>Phone: +9711 234 5678</p>
                  <p>Email: support@luckmytrip.com</p>
                </div>
              </div>

            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ContactUsPage