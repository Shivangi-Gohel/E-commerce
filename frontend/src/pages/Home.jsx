import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '@/components/Hero.jsx'
import Feature from '@/components/Feature.jsx'
import Benefits from '@/components/Benefits.jsx'
import Testimonial from '@/components/Testimonial.jsx'
import Footer from '@/components/Footer.jsx'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Feature />
      <Benefits />
      <Testimonial />
      <Footer />
    </div>
  )
}

export default Home
