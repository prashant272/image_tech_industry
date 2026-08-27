import React from 'react';
import { Factory, Settings, Award, PenTool, Globe, Headset } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      title: 'Manufacturing Since 1992',
      desc: 'For over 30 years, we have specialized in manufacturing high-quality precision products trusted by printing, packaging, and industrial industries.',
      icon: <Factory className="w-6 h-6 text-white" />,
      colorType: 'navy'
    },
    {
      title: 'Precision Manufacturing',
      desc: 'Our doctor blades are manufactured using carefully selected raw materials and state-of-the-art technology to ensure unmatched quality, durability, and consistent performance.',
      icon: <Settings className="w-6 h-6 text-[#0a192f]" />,
      colorType: 'gold'
    },
    {
      title: 'Better Print Quality',
      desc: 'Our precision-engineered blades remove excess ink efficiently, helping achieve sharper images, consistent ink weight, and flawless printing results.',
      icon: <Award className="w-6 h-6 text-white" />,
      colorType: 'navy'
    },
    {
      title: 'Custom Manufacturing',
      desc: 'We manufacture doctor blades in custom widths, thicknesses, and lengths to match your printing machine specifications.',
      icon: <PenTool className="w-6 h-6 text-[#0a192f]" />,
      colorType: 'gold'
    },
    {
      title: 'Exporting to 25+ Countries',
      desc: 'Our products are exported to customers across Asia, Africa, the Middle East, and Europe, with reliable quality and secure packaging.',
      icon: <Globe className="w-6 h-6 text-white" />,
      colorType: 'navy'
    },
    {
      title: 'Technical Support',
      desc: 'Our experienced team helps customers choose the right doctor blade based on machine type, ink, and application requirements.',
      icon: <Headset className="w-6 h-6 text-[#0a192f]" />,
      colorType: 'gold'
    }
  ];

  return (
    <section className="py-6 lg:py-8 bg-[#fdfdfd] relative font-sans overflow-hidden" id="why-choose-us">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#f4f6f9] to-transparent pointer-events-none"></div>
      
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 lg:mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#d4af37]"></span>
            <span className="text-[#d4af37] font-bold tracking-[0.25em] uppercase text-[12px] md:text-[13px]">WHY CHOOSE US?</span>
            <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-[#d4af37]"></span>
          </div>
          
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-black text-[#0f172a] leading-[1.2] tracking-tighter">
            Why Printing Companies Trust <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a192f] via-[#112240] to-[#0a192f]">ImageTech Industry</span>
          </h2>
          
          {/* Subtle decorative diamond/dot under heading */}
          <div className="flex justify-center mt-6">
             <div className="w-3 h-3 rotate-45 bg-gradient-to-br from-[#0a192f] to-[#112240] shadow-sm"></div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-[85rem] mx-auto">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="relative group rounded-2xl p-[3px] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.4)] transition-all duration-500 overflow-hidden"
            >
              {/* Premium Animated Spinning Border (Bold) */}
              <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,#d4af37_0%,#0a192f_50%,#d4af37_100%)] opacity-100"></div>

              {/* Inner Card Content */}
              <div className="relative h-full bg-white rounded-[13px] p-8 lg:p-10 z-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,1)]">
                {/* Dot Matrix Pattern (Top Right) */}
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2H4V4H2V2ZM10 2H12V4H10V2ZM18 2H20V4H18V2ZM26 2H28V4H26V2ZM34 2H36V4H34V2ZM2 10H4V12H2V10ZM10 10H12V12H10V10ZM18 10H20V12H18V10ZM26 10H28V12H26V10ZM34 10H36V12H34V10ZM2 18H4V20H2V18ZM10 18H12V20H10V18ZM18 18H20V20H18V18ZM26 18H28V20H26V18ZM34 18H36V20H34V18ZM2 26H4V28H2V26ZM10 26H12V28H10V26ZM18 26H20V28H18V26ZM26 26H28V28H26V26ZM34 26H36V28H34V26ZM2 34H4V36H2V34ZM10 34H12V36H10V34ZM18 34H20V36H18V34ZM26 34H28V36H26V34ZM34 34H36V36H34V34Z" fill="#d4af37"/>
                  </svg>
                </div>

                {/* Icon Circle */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-500 ${reason.colorType === 'navy' ? 'bg-[#0a192f]' : 'bg-gradient-to-br from-[#e8cc72] via-[#d4af37] to-[#aa8518]'}`}>
                  {reason.icon}
                </div>

                {/* Content */}
                <h3 className="text-[18px] lg:text-[20px] font-black text-[#0f172a] mb-4 group-hover:text-[#d4af37] transition-colors duration-300">
                  {reason.title}
                </h3>
                
                {/* Separator Line */}
                <div className={`w-12 h-[2px] mb-5 transition-all duration-500 group-hover:w-16 ${reason.colorType === 'navy' ? 'bg-[#0a192f]' : 'bg-gradient-to-r from-[#d4af37] to-transparent'}`}></div>
                
                <p className="text-[14px] lg:text-[15px] text-gray-500 font-medium leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Carousel Indicators */}
        <div className="flex justify-center items-center gap-2 mt-16">
          <div className="w-8 h-[1px] bg-gray-300 mr-2 hidden sm:block"></div>
          {[1, 2, 3, 4, 5].map((dot, index) => (
            <div 
              key={index} 
              className={`rounded-full transition-all duration-300 ${index === 2 ? 'w-3 h-3 bg-[#0a192f]' : 'w-2 h-2 bg-gray-300 hover:bg-[#d4af37]'}`}
            ></div>
          ))}
          <div className="w-8 h-[1px] bg-gray-300 ml-2 hidden sm:block"></div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
