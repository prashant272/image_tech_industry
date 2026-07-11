import React from 'react';
import Hero from '../components/home/Hero';
import BuiltFor from '../components/home/BuiltFor';
import Comparison from '../components/home/Comparison';
import DashboardShowcase from '../components/home/DashboardShowcase';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import CrossPlatform from '../components/home/CrossPlatform';
import TrustStats from '../components/home/TrustStats';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CTA from '../components/home/CTA';

const Home = () => {
  return (
    <main className="flex-1 w-full flex flex-col">
      <Hero />
      <BuiltFor />
      <DashboardShowcase />
      <Comparison />
      <Features />
      <HowItWorks />
      <CrossPlatform />
      <TrustStats />
      <WhyChooseUs />
      <CTA />
    </main>
  );
};

export default Home;
