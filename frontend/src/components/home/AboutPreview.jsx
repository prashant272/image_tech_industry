import React from 'react';
import { ArrowRight, Award, Zap, Users, Compass, Building2, UserCog, ShieldCheck, Globe2, Factory, Send } from 'lucide-react';

const AboutPreview = () => {
  const topFeatures = [
    {
      icon: <Award className="w-5 h-5 text-[#d4af37]" />,
      title: '31+ Years Experience',
      desc: 'Decades of engineering expertise since 1992.'
    },
    {
      icon: <Zap className="w-5 h-5 text-[#d4af37]" />,
      title: 'Innovation & Drive',
      desc: 'Constantly evolving products to solve real-world challenges.'
    },
    {
      icon: <Users className="w-5 h-5 text-[#d4af37]" />,
      title: 'Customer Focused',
      desc: 'Solutions tailored to diverse industries and needs.'
    },
    {
      icon: <Award className="w-5 h-5 text-[#d4af37]" />,
      title: 'Made in India',
      desc: 'World-class manufacturing with local excellence.'
    }
  ];

  const bottomFeatures = [
    {
      icon: <Factory className="w-5 h-5 lg:w-6 lg:h-6 text-white" />,
      title: 'Advanced Manufacturing',
      desc: 'State-of-the-art infrastructure & technology'
    },
    {
      icon: <UserCog className="w-5 h-5 lg:w-6 lg:h-6 text-white" />,
      title: 'Skilled Workforce',
      desc: 'Highly skilled engineers & technicians'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6 text-white" />,
      title: 'Quality Assurance',
      desc: 'Rigorous quality standards ensuring reliability'
    },
    {
      icon: <Globe2 className="w-5 h-5 lg:w-6 lg:h-6 text-white" />,
      title: 'Global Reach',
      desc: 'Serving clients across India & beyond'
    }
  ];

  return (
    <section className="relative w-full overflow-hidden font-sans pt-12 pb-12 lg:pt-16 lg:pb-16 bg-[#0a192f]">
      
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* 1. Factory Image on the right side */}
      <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-[80%] z-0">
        <img 
          src="/images/about-us-facility.png" 
          alt="Manufacturing Facility" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-left shadow-[inset_0_-20px_50px_rgba(10,25,47,0.5)]"
        />
        {/* Subtle dark overlay for premium contrast */}
        <div className="absolute inset-0 bg-[#0a192f]/10 mix-blend-multiply"></div>
      </div>

      {/* 2. Metallic Gold Slant Layer (creates the premium border) */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-br from-[#f3e5ab] via-[#d4af37] to-[#997a15] z-0 shadow-lg" style={{ clipPath: 'polygon(0 0, calc(56% + 4px) 0, calc(68% + 4px) 55%, calc(64% + 4px) 100%, 0 100%)' }}></div>

      {/* 3. White Slant Layer (main left background) */}
      <div className="hidden lg:block absolute inset-0 bg-[#fdfdfd] z-0 shadow-[20px_0_40px_rgba(0,0,0,0.05)]" style={{ clipPath: 'polygon(0 0, 56% 0, 68% 55%, 64% 100%, 0 100%)' }}></div>

      {/* Mobile background (simple solid white) */}
      <div className="block lg:hidden absolute inset-0 bg-[#fdfdfd] z-0"></div>

      {/* --- FLOATING BOX (Positioned exactly on the vertex) --- */}
      <div className="hidden lg:flex absolute top-[55%] left-[68%] -translate-x-1/2 -translate-y-1/2 bg-[#0a192f] rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] z-30 overflow-hidden min-w-[340px] max-w-[400px] border border-white/10 group hover:scale-[1.02] transition-transform duration-500">
         {/* Gold Left Section with Metallic Gradient */}
         <div className="bg-gradient-to-br from-[#e8cc72] via-[#d4af37] to-[#aa8518] text-[#0a192f] w-[110px] flex flex-col items-center justify-center shrink-0 py-6 relative overflow-hidden">
           <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
           <span className="font-black text-3xl leading-none relative z-10 drop-shadow-sm">31+</span>
           <span className="font-extrabold text-[11px] tracking-[0.2em] uppercase mt-1 relative z-10">YEARS</span>
         </div>
         {/* Navy Right Section */}
         <div className="px-6 py-6 flex flex-col justify-center relative w-full">
           <div className="text-white font-bold text-[16px] lg:text-[18px] mb-1 tracking-wide relative z-10 group-hover:text-[#d4af37] transition-colors duration-300">Years of Excellence</div>
           <div className="text-gray-400 text-[12px] lg:text-[13px] font-medium relative z-10">Delivering global trust since 1992</div>
           {/* Decorative gradient map */}
           <div className="absolute right-0 top-0 bottom-0 w-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-30 pointer-events-none"></div>
         </div>
      </div>

      {/* --- CONTENT (Relative z-10) --- */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Layout */}
        <div className="w-full lg:w-[55%] pt-4 lg:pt-8 mb-12 lg:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-gradient-to-r from-[#d4af37] to-transparent"></span>
            <span className="text-[#d4af37] font-bold tracking-[0.25em] uppercase text-[12px] md:text-[13px]">ABOUT IMAGETECH</span>
          </div>
          
          <h2 className="text-[24px] sm:text-[32px] md:text-[48px] lg:text-[56px] font-black text-[#0f172a] leading-[1.1] mb-6 tracking-tighter whitespace-nowrap">
            Precision Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#aa8518]">Solutions</span> Since 1992
          </h2>
          
          <p className="text-gray-500 text-[14px] md:text-[15px] font-medium leading-relaxed mb-12 max-w-[95%] whitespace-normal">
            ImageTech Industries is a Delhi-based manufacturing powerhouse dedicated to delivering reliable, innovative, and high-performance industrial solutions. With a strong foundation built over decades of engineering excellence, we design precision products that maximize productivity and accuracy.
          </p>

          {/* 2x2 Grid with Hover Effects */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4 lg:gap-5 max-w-[100%]">
            {topFeatures.map((item, index) => (
              <div key={index} className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 p-3 sm:p-5 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:border-[#d4af37]/30 transition-all duration-300 cursor-pointer">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 rounded-full bg-[#0a192f] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#d4af37]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0f172a] text-[12px] sm:text-[14px] lg:text-[15px] mb-0.5 sm:mb-1 group-hover:text-[#d4af37] transition-colors leading-tight">{item.title}</h4>
                  <p className="text-gray-500 text-[10px] sm:text-[12px] leading-tight sm:leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Image (hidden on desktop) */}
        <div className="block lg:hidden w-full h-[250px] sm:h-[300px] rounded-2xl overflow-hidden mb-6 relative shadow-lg">
          <img src="/images/about-us-facility.png" alt="Facility" loading="lazy" decoding="async" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0a192f]/10"></div>
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto bg-[#0a192f] rounded-xl p-2 sm:p-3 sm:pr-8 flex items-center gap-3 sm:gap-4 shadow-2xl z-20 border border-white/10">
             <div className="bg-gradient-to-br from-[#e8cc72] to-[#aa8518] text-[#0a192f] p-1.5 sm:p-2 rounded-lg flex flex-col items-center justify-center min-w-[50px] sm:min-w-[60px] h-[50px] sm:h-[60px]">
               <span className="font-black text-lg sm:text-xl leading-none drop-shadow-sm">31+</span>
             </div>
             <div className="flex-1">
               <div className="text-white font-bold text-[12px] sm:text-[14px]">Years of Excellence</div>
               <div className="text-gray-400 text-[9px] sm:text-[11px] leading-tight mt-0.5">Delivering global trust since 1992</div>
             </div>
          </div>
        </div>

        {/* Bottom Section: Features Row & Actions */}
        <div className="relative z-20">
          {/* Horizontal Features Row (Glassmorphic) */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-white/50 hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.15)] transition-shadow duration-500 mb-8 lg:mb-10 w-full lg:w-[85%]">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 divide-x-0 md:divide-x divide-gray-100/50">
              {bottomFeatures.map((item, index) => (
                <div key={index} className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 px-0 md:px-4 pt-2 md:pt-0 first:pt-2 md:first:pt-0 first:px-0 cursor-pointer">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-[#e8cc72] via-[#d4af37] to-[#aa8518] flex items-center justify-center shrink-0 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a] text-[12px] sm:text-[14px] lg:text-[15px] mb-0.5 group-hover:text-[#d4af37] transition-colors leading-tight">{item.title}</h4>
                    <p className="text-gray-500 text-[10px] sm:text-[12px] font-medium leading-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions & Tagline */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 relative z-20 w-full">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full lg:w-auto">
              <button className="flex items-center justify-center gap-3 bg-[#0a192f] hover:bg-[#112240] text-white px-6 lg:px-8 py-3.5 lg:py-4 rounded-lg transition-all duration-300 shadow-[0_8px_20px_rgba(10,25,47,0.3)] hover:shadow-[0_10px_25px_rgba(10,25,47,0.4)] hover:-translate-y-0.5 font-bold tracking-widest text-[11px] sm:text-[12px] lg:text-[13px] uppercase group border border-[#112240] w-full sm:w-auto">
                <Building2 className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
                Explore Full Profile
                <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur hover:bg-white text-white lg:text-[#0f172a] border border-white/20 lg:border-gray-200 px-6 lg:px-8 py-3.5 lg:py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-bold tracking-widest text-[11px] sm:text-[12px] lg:text-[13px] uppercase group w-full sm:w-auto">
                <Send className="w-4 h-4 group-hover:text-[#d4af37] transition-colors" />
                Get in Touch
              </button>
            </div>
            
            <div className="flex items-center gap-3 lg:pr-[15%]">
              <span className="w-8 h-[2px] bg-gradient-to-r from-[#d4af37] to-transparent"></span>
              <span className="text-gray-400 lg:text-gray-500 font-medium text-[13px] lg:text-[15px]">
                Engineering Precision. <span className="text-[#d4af37] font-bold">Delivering Excellence.</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutPreview;
