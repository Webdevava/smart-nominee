'use client'
import React from 'react'
import Footer from './footer'
import WhyUs from './whyus'
import Blogs from './blogs'
import FaqSection from './faq'
import PricingSection from './plans'
import FeaturesSection from './features'
import Home from './hero'
import AboutUs from './about'

const LandingPage = () => {
  return (
    <div>
        <Home/>
        <AboutUs/>
        <FeaturesSection/>
        <WhyUs/>
        <PricingSection/>
        <FaqSection/>
        <Blogs/>
        <Footer/>
    </div>
  )
}

export default LandingPage