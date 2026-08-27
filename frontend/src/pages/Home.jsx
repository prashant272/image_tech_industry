import React from 'react';
import Hero from '../components/home/Hero';
import StatsBanner from '../components/home/StatsBanner';
import AboutPreview from '../components/home/AboutPreview';

import WhyChooseUs from '../components/home/WhyChooseUs';
import OurProducts from '../components/home/OurProducts';
import Industries from '../components/home/Industries';
import Blogs from '../components/home/Blogs';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import CTA from '../components/home/CTA';

const Home = () => {
  return (
    <main className="flex-1 w-full flex flex-col">
      <Hero />
      <StatsBanner />
      <AboutPreview />
      <WhyChooseUs />
      <OurProducts />
      <Industries />
      <Blogs />
      <Testimonials />
      <CTA />
      <FAQ />
    </main>
  );
};

export default Home;
