import React  ,{useState}from 'react'
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'
import { Helmet } from 'react-helmet'

const Privs = [
  {
    question: "Eligibility",
    answer: "1. Participants must be 18 years or older. 2. Employees, affiliates, or immediate family members of The Luck My Trip are not eligible to participate. 3. Contests are open to residents of India only unless explicitly stated otherwise.",
  },
   {
    question: "Contest Entry",
    answer: "1. Tickets are non-transferable and must be purchased via the official website.",
  },
  {
    question: "Ticket Purchase & Pricing",
    answer: "1. Ticket prices may vary: ₹299, ₹499, ₹599, or as specified for each contest. 2. All ticket purchases are final. No refunds are permitted unless the contest is canceled by the organizer. 3. Payment must be made via the approved online payment methods only.",
  },
  {
    question: "Winner Selection",
    answer: "1. Winners are selected via a random draw once all tickets for a contest are sold or the contest deadline is reached. 2. Only participants with fully completed ticket purchases are eligible. 3. Winners will be notified via email and/or phone within [X] days of the draw.",
  },
  {
    question: "Prize Details",
    answer: "1. Prizes are non-transferable, cannot be exchanged for cash, and must be claimed as specified. 2. Winners must provide necessary documentation (passport, ID) for international travel. 3. The Luck My Trip is not responsible for visa delays, flight delays, or any travel-related issues beyond its control.",
  },
  {
    question: "Contest Conduct",
    answer: "1. The Luck My Trip reserves the right to disqualify participants for: a. Fraudulent activities b. Attempting to manipulate the contest c. Violating terms & conditions 2.Participants must provide accurate personal information.",
  },
  {
    question: "Refunds & Cancellations",
    answer: "1. No refunds will be provided for tickets purchased unless a contest is canceled. 2. If a contest is canceled, ticket fees will be refunded in full within 30 business days.",
  },
  {
    question: "Privacy & Data",
    answer: "1. Personal data collected is used only for contest administration and prize distribution. 2. By participating, you consent to the use of your name and/or image for promotional purposes.",
  },
  {
    question: "Liability",
    answer: "1. The Luck My Trip is not liable for any injury, loss, or damage incurred during participation or travel. 2. Travel arrangements are subject to airline and hotel policies.",
  },
  {
    question: "Modification & Termination",
    answer: "1. The Luck My Trip reserves the right to modify, suspend, or terminate any contest at its sole discretion. 2. Any changes will be posted on the website and communicated to participants where possible.",
  },
  {
    question: "Governing Law",
    answer: "1. These terms are governed by the laws of India. 2. Any disputes arising from the contest will be subject to the exclusive jurisdiction of courts in India.",
  },
  {
    question: "Contact",
    answer: "For questions regarding contests, prizes, or tickets, contact us at: 1. Email: support@theluckmytrip.com 2. Phone: +919891344354",
  },
];

const Privacy = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const togglePrivacy = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>


      <Helmet>

        <title>Buy Contest Tickets & Win Trips</title>
        <meta
          name="description"
          content="privacy policy information about how user data is handled on LuckMyTrip."
        />
        <meta
          name="keywords"
          content="privacy policy, user data, LuckMyTrip"
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="" />
        <meta
          property="og:description"
          content=""
        />
        <meta property="og:url" content="" />

        {/* Canonical URL */}
        <link rel="canonical" href="" />

        {/* Structured Data - Schema.org Product / Offer and Contest */}
        <script type="">
          {`
      {
        "@context": "",
        "@type": "",
        "name": "",
        "url": "",
        "description": "",
        "offers": {
          "@type": "",
          "priceCurrency": "",
          "price": "",
          "availability": "",
          "url": ""
        },
        "mainEntityOfPage": {
          "@type": "",
          "name": "",
          "url": "",
          "description": ""
        }
      }
    `}
        </script>
      </Helmet>
      <Header />

      <section className="py-12 bg-[#E9F2FF]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-900 font-berlin">
          Privacy Policy
        </h2>
        <div className="space-y-4">
          {Privs.map((Privacy, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg p-4 cursor-pointer bg-white shadow-sm"
              onClick={() => togglePrivacy(idx)}
              aria-expanded={activeIndex === idx}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') togglePrivacy(idx); }}
            >
              <h3 className=" text-sm md:text-xl font-semibold text-blue-800 flex justify-between items-center">
                {Privacy.question}
                <span className={`transform transition-transform duration-300 ${activeIndex === idx ? "rotate-180" : "rotate-0"}`}>
                  ▼
                </span>
              </h3>
              {activeIndex === idx && (
                <p className="text-xs md:text-base mt-2 text-gray-700 font-montserrat">{Privacy.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
      <Footer />

    </div>
  )
}

export default Privacy
