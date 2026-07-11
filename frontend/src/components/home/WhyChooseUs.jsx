import React from 'react';
import { Zap, Shield, Cloud, Headset, Download, RefreshCw } from 'lucide-react';
import AnimatedRGBBorder from '../common/AnimatedRGBBorder';

const WhyChooseUs = () => {
  const reasons = [
    { title: 'Lightning Fast', desc: 'Optimized for speed and instant loading.', icon: <Zap className="w-6 h-6 text-[#0b6d4b]" /> },
    { title: 'Secure', desc: 'Bank-level encryption for your data.', icon: <Shield className="w-6 h-6 text-[#0b6d4b]" /> },
    { title: 'Cloud Based', desc: 'Access your society data from anywhere.', icon: <Cloud className="w-6 h-6 text-[#0b6d4b]" /> },
    { title: '24×7 Support', desc: 'Our team is always here to help you.', icon: <Headset className="w-6 h-6 text-[#0b6d4b]" /> },
    { title: 'No Installation', desc: 'Use directly in your browser or as PWA.', icon: <Download className="w-6 h-6 text-[#0b6d4b]" /> },
    { title: 'Regular Updates', desc: 'Continuous improvements and new features.', icon: <RefreshCw className="w-6 h-6 text-[#0b6d4b]" /> }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white relative border-b border-gray-100" id="why-choose-us">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f5ef] border border-[#0b6d4b]/10 mb-6 shadow-sm">
            <span className="text-[12px] sm:text-[13px] font-extrabold text-[#0b6d4b] uppercase tracking-[0.15em]">The Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight mb-6 leading-[1.2]">
            Why Choose Us
          </h2>
          <p className="text-[16px] sm:text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Experience the most modern, fast, and secure society management platform built for the future.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <AnimatedRGBBorder key={index} className="rounded-[1.5rem] hover:-translate-y-1 transition-transform duration-300">
              <div className="group h-full flex gap-5 p-6 sm:p-7 bg-white rounded-[1.4rem] relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#e6f5ef] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-gray-900 mb-1.5 group-hover:text-[#0b6d4b] transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </AnimatedRGBBorder>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
