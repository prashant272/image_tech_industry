import React from 'react';
import AnimatedRGBBorder from '../common/AnimatedRGBBorder';

const BuiltFor = () => {
  const communities = [
    { 
      icon: '🏢', 
      title: 'Apartments',
      desc: 'Perfect for residential apartment complexes.'
    },
    { 
      icon: '🏘️', 
      title: 'Housing Societies',
      desc: 'Manage residents, billing and communication.'
    },
    { 
      icon: '🌆', 
      title: 'Gated Communities',
      desc: 'High security & seamless amenity booking.'
    },
    { 
      icon: '🏗️', 
      title: 'Residential Complexes',
      desc: 'Streamline operations for large residential setups.'
    },
    { 
      icon: '🏠', 
      title: 'Villas & Townships',
      desc: 'Tailored perfectly for luxury townships.'
    },
    { 
      icon: '👥', 
      title: 'RWA',
      desc: 'Empower welfare associations digitally.'
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-white relative z-20 overflow-hidden border-b border-gray-100">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Premium Header */}
        <div className="text-center mb-10 flex flex-col items-center">
          <h2 className="text-[13px] sm:text-[15px] font-extrabold text-[#0b6d4b] uppercase tracking-[0.25em] mb-3">
            Built for Every Residential Community
          </h2>
          <div className="w-12 h-1 bg-[#0b6d4b] rounded-full opacity-90"></div>
        </div>
        
        {/* Cards Grid - 6 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 w-full">
          {communities.map((item, index) => (
            <AnimatedRGBBorder 
              key={index} 
              className="w-full hover:-translate-y-1.5 transition-transform duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="flex flex-col items-center text-center gap-3 px-3 py-6 w-full h-full">
                <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm mb-1">{item.icon}</span>
                <span className="text-[13px] sm:text-[15px] font-extrabold text-gray-800 group-hover:text-black transition-colors duration-300">
                  {item.title}
                </span>
                <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-relaxed px-1">
                  {item.desc}
                </p>
              </div>
            </AnimatedRGBBorder>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default BuiltFor;
