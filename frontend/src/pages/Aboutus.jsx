import React from 'react'
import Header from '../components/commonComponent/Header'
import Footer from '../components/commonComponent/Footer'
import { Helmet } from 'react-helmet'

const Aboutus = () => {
    return (
        <div>
           

<Helmet>
  
  <title>Buy Contest Tickets & Win Trips</title>
  <meta
    name="description"
    content="about LuckMyTrip, your gateway to winning amazing trips and contests."
  />
  <meta
    name="keywords"
    content="about LuckMyTrip, win trips, contest information, LuckMyTrip"
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
            <section className="flex flex-col mx-auto mt-10 sm:mt-16 md:mt-6  mb-28">
                <div className="container mx-auto py-6 sm:py-10 md:py-10 lg:py-12 xl:py-12 px-3 sm:px-6 md:px-8 lg:px-10 xl:px-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-6xl font-bold text-green-400 text-center mb-2 md:mb-2  font-berlin">ABOUT US</h2>
                    <p className="text-sm sm:text-base md:text-base lg:text-xl xl:text-3xl 2xl:text-4xl text-justify sm:text-left md:text-justify mt-6 sm:mt-8 md:mt-8  xl:mt-16 px-2 sm:px-4 md:px-4 lg:px-6 xl:px-8 text-gray-700 leading-relaxed sm:leading-loose md:leading-relaxed lg:leading-loose xl:leading-loose font-montserrat">
                        Here’s your chance to win an unforgettable trip to Dubai
                        or Thailand, where luxury meets breathtaking experiences.
                        Explore the futuristic skyline and golden deserts of Dubai
                        or immerse yourself in Thailand’s tropical paradise, vibrant
                        culture, and stunning beaches. Don’t miss out participate now
                        and make your dream vacation a reality! Stay tuned for more
                        details on how to enter and secure your spot in this incredible
                        giveaway.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Aboutus
