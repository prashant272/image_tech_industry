import React from 'react';
import { Printer, Layers, Pill, Package, Factory, ShoppingBasket, Scroll, Disc, Tag, ShoppingBag, Car, HeartHandshake, ShieldCheck } from 'lucide-react';

const Industries = () => {
  const industries = [
    {
      title: 'Printing Industry',
      desc: 'High-quality printing solutions for consistent and sharp output.',
      icon: <Printer className="w-7 h-7" />
    },
    {
      title: 'Plastic Film Manufacturing',
      desc: 'Ensuring smooth coating and precise film production.',
      icon: <Layers className="w-7 h-7" />
    },
    {
      title: 'Food Packaging',
      desc: 'Supporting safe and hygienic packaging with high performance.',
      icon: <ShoppingBasket className="w-7 h-7" />
    },
    {
      title: 'Pharmaceutical Packaging',
      desc: 'Maintaining precision and compliance in critical packaging processes.',
      icon: <Pill className="w-7 h-7" />
    },
    {
      title: 'Packaging Converters',
      desc: 'Enhancing efficiency in lamination, slitting, and coating applications.',
      icon: <Package className="w-7 h-7" />
    },
    {
      title: 'Industrial Manufacturing',
      desc: 'Reliable solutions for a wide range of industrial applications.',
      icon: <Factory className="w-7 h-7" />
    },
    {
      title: 'Paper Industry',
      desc: 'Optimized solutions for paper coating and finishing.',
      icon: <Scroll className="w-7 h-7" />
    },
    {
      title: 'Flexographic Printing',
      desc: 'Delivering superior print quality in flexo printing processes.',
      icon: <Disc className="w-7 h-7" />
    },
    {
      title: 'Label & Sticker Industry',
      desc: 'Precision products for high-quality label and sticker production.',
      icon: <Tag className="w-7 h-7" />
    },
    {
      title: 'E-commerce Packaging',
      desc: 'Durable and reliable packaging for safe product delivery.',
      icon: <ShoppingBag className="w-7 h-7" />
    },
    {
      title: 'Automotive Industry',
      desc: 'Supporting high-performance coating and bonding applications.',
      icon: <Car className="w-7 h-7" />
    },
    {
      title: 'Hygiene & Personal Care',
      desc: 'Ensuring product safety and high standards in hygiene packaging.',
      icon: <HeartHandshake className="w-7 h-7" />
    }
  ];

  // Duplicate the array for a seamless infinite loop
  const duplicatedIndustries = [...industries, ...industries];

  return (
    <section className="py-6 lg:py-8 bg-white relative font-sans overflow-hidden" id="industries">
      {/* CSS for infinite smooth slider */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes infinite-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); } /* 12px accounts for exactly half of the gap-6 (24px) */
        }
        .animate-infinite-slide {
          animation: infinite-slide 40s linear infinite;
          width: max-content;
        }
        .slider-container:hover .animate-infinite-slide {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-[100rem] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 mb-12 lg:mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#1d4ed8]"></span>
            <h4 className="text-[#1d4ed8] font-bold tracking-[0.15em] uppercase text-[12px] md:text-[13px]">
              INDUSTRIES WE SERVE
            </h4>
            <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-[#1d4ed8]"></span>
          </div>
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-black text-[#0f172a] leading-[1.2] tracking-tighter mb-4">
            Trusted Across Diverse Industries
          </h2>
          <p className="text-[15px] lg:text-[17px] text-gray-500 font-medium">
            Our precision-engineered products are widely used across different industries to ensure quality, efficiency, and reliability.
          </p>
        </div>

        {/* Continuous Smooth Slider */}
        <div className="slider-container overflow-hidden py-4 w-full">
          <div className="animate-infinite-slide flex gap-6">
            {duplicatedIndustries.map((item, index) => (
              <div 
                key={index} 
                className="w-[240px] lg:w-[250px] shrink-0 bg-white rounded-2xl border border-gray-100 p-6 lg:p-7 flex flex-col items-center justify-start text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_-10px_rgba(29,78,216,0.18)] hover:border-[#1d4ed8]/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer group h-full min-h-[280px]"
              >
                <div className="w-16 h-16 flex items-center justify-center mb-5 text-[#1d4ed8] bg-blue-50/50 rounded-full group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-[17px] font-extrabold text-[#0f172a] leading-snug group-hover:text-[#1d4ed8] transition-colors duration-300">
                  {item.title}
                </h3>
                <div className="w-8 h-[2px] bg-[#1d4ed8] my-4 rounded-full transition-all duration-300 group-hover:w-12"></div>
                <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Empowering Banner */}
        <div className="mt-12 flex justify-center w-full px-4">
          <div className="bg-[#f8fafc] rounded-2xl px-6 py-5 flex items-center gap-5 border border-gray-100 max-w-3xl w-full hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center border border-gray-100 text-[#1d4ed8] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="text-[15px] font-extrabold text-[#0f172a] mb-0.5">Empowering Industries with Precision & Performance</h4>
              <p className="text-[13px] text-gray-500 font-medium leading-tight">Delivering products that drive quality, productivity, and growth across every sector.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Industries;

