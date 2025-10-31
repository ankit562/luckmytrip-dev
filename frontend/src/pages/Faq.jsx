import React  ,{useState}from 'react'
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'
import { Helmet } from 'react-helmet'


const faqs = [
  {
    question: "How do I participate in the prize trips?",
    answer: "You can participate by purchasing tickets for the draws listed on our website. Each ticket increases your chance to win the amazing prizes.",
  },
  {
    question: "When will the winners be announced?",
    answer: "Winners are announced on the draw dates specified for each prize. Stay tuned to our notifications and emails for updates.",
  },
  {
    question: "Can I redeem my prize if I am not in India?",
    answer: "Currently, our draws are open to residents of India only. We hope to expand to other regions in the future.",
  },
  {
    question: "Is the ticket purchase refundable?",
    answer: "All ticket purchases are final and non-refundable as per our terms and conditions.",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach out to our support team via the contact form on the website or email us directly at support@example.com.",
  },
];

const Faq = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      

<Helmet>
  
  <title>Buy Contest Tickets & Win Trips</title>
  <meta
    name="description"
    content=""
  />
  <meta
    name="keywords"
    content=""
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
      <Header/>
      <section className="py-12 bg-[#E9F2FF]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-700 font-berlin">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg p-4 cursor-pointer bg-white shadow-sm"
              onClick={() => toggleFAQ(idx)}
              aria-expanded={activeIndex === idx}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') toggleFAQ(idx); }}
            >
              <h3 className=" text-sm md:text-xl font-semibold text-blue-800 flex justify-between items-center">
                {faq.question}
                <span className={`transform transition-transform duration-300 ${activeIndex === idx ? "rotate-180" : "rotate-0"}`}>
                  ▼
                </span>
              </h3>
              {activeIndex === idx && (
                <p className="text-xs md:text-base mt-2 text-gray-700 font-montserrat">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
      <Footer/>
    </div>
  )
}

export default Faq
