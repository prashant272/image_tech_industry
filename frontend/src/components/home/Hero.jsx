import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, Bell, Users, Wrench, CreditCard, Home, FileText, AlertCircle, Grid, Calendar, ChevronRight, Star } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideImages = [
    '/images/generated/mob_admin_dash_1783765484092.png',
    '/images/generated/mob_admin_members_1783765494709.png',
    '/images/generated/mob_resident_home_1783765505611.png',
    '/images/generated/mob_resident_visitor_1783765515835.png',
    '/images/generated/mob_guard_scan_1783765527933.png',
    '/images/generated/mob_guard_log_1783765540033.png',
    '/images/generated/acc_mobile.png',
    '/images/generated/com_mobile.png'
  ];

  const totalSlides = slideImages.length + 1; // +1 for the custom HTML slide

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  return (
    <section id="home" className="pt-20 pb-8 lg:pt-20 lg:pb-10 overflow-hidden relative bg-[#f8fafc]">
      {/* Background shape */}
      <div className="absolute right-0 bottom-0 w-[100%] lg:w-[50%] h-[50%] lg:h-[80%] bg-[#e6f5ef] rounded-tl-[60px] lg:rounded-tl-[100px] -z-10 opacity-70"></div>
      
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-4">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left max-w-xl xl:max-w-2xl mx-auto lg:mx-0 lg:pt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e6f5ef] text-[#0b6d4b] text-[11px] sm:text-[12px] font-bold mb-4 sm:mb-6">
              🏢 Smart Society Management Platform
            </div>
            
            <h1 className="text-[28px] sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-extrabold text-[#111827] leading-[1.2] tracking-tight mb-4 sm:mb-5">
              <span className="block">The Complete Society Management Platform</span>
              <span className="text-[#0b6d4b] block mt-1">for Apartments & Gated Communities</span>
            </h1>
            
            <p className="text-[13px] sm:text-[15px] lg:text-[16px] text-gray-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Manage residents, visitors, maintenance, accounting, security, payments, amenities, communication, and daily operations from a single cloud-based platform. Available as a Web App, PWA, Android App, and iOS App.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0b6d4b] hover:bg-[#08593d] text-white px-6 sm:px-7 py-3.5 sm:py-3 rounded-full font-semibold transition-all shadow-lg shadow-[#0b6d4b]/20 text-[14px] sm:text-sm">
                Request Free Demo
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#111827] border border-gray-200 px-6 sm:px-7 py-3.5 sm:py-3 rounded-full font-semibold transition-all shadow-sm text-[14px] sm:text-sm">
                Explore Features
              </button>
            </div>
            
            <div className="flex flex-col items-center lg:items-start gap-2 justify-center lg:justify-start text-sm font-semibold text-gray-700">
               <div className="flex items-center gap-1.5 text-yellow-400 mb-0.5">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <span className="text-xs text-gray-700 font-bold ml-1">Rated by Housing Societies</span>
               </div>
               <span className="text-[11px] sm:text-xs text-gray-500 font-medium max-w-[280px] sm:max-w-none text-center lg:text-left leading-relaxed">
                 Trusted by Apartment Associations, Builders & Property Managers across India.
               </span>
            </div>

            {/* SEO Keywords - Visually Hidden for Google */}
            <div className="sr-only">
              Society Management Software, Apartment Management Software, Apartment Management App, Housing Society Management, Gated Community Management, Visitor Management System, Maintenance Billing Software, Resident Management, Society Accounting Software, Society Mobile App
            </div>
          </div>
          
          {/* Right Content - App Mockups */}
          <div className="flex-1 relative w-full flex justify-center items-center h-[500px] lg:h-[650px] perspective-[1500px] lg:translate-x-12 mt-10 lg:mt-0 pb-10 lg:pb-0">
            
            {/* Desktop Dashboard (Back) */}
            <div 
              className="absolute right-0 lg:-right-2 top-[40%] -translate-y-1/2 w-[90%] max-w-[420px] lg:max-w-[480px] h-[400px] lg:h-[500px] bg-white rounded-3xl border border-gray-100 p-4 lg:p-6 z-0 hidden md:flex flex-col overflow-hidden"
              style={{ 
                transform: 'rotateY(-8deg) rotateX(2deg) translateZ(-80px) translateX(20px)', 
                boxShadow: '-15px 15px 40px rgba(0,0,0,0.05), inset -1px -1px 0px rgba(0,0,0,0.02)'
              }}
            >
               <div className="font-bold text-gray-800 text-lg mb-4">Dashboard</div>
               
               <div className="grid grid-cols-3 gap-3 mb-5">
                 <div className="bg-gray-50/80 rounded-2xl p-3 border border-gray-100 shadow-sm">
                   <div className="text-[10px] text-gray-500 font-semibold mb-1">Total Members</div>
                   <div className="text-xl font-bold text-gray-900">248</div>
                 </div>
                 <div className="bg-gray-50/80 rounded-2xl p-3 border border-gray-100 shadow-sm">
                   <div className="text-[10px] text-gray-500 font-semibold mb-1">Total Flats</div>
                   <div className="text-xl font-bold text-gray-900">192</div>
                 </div>
                 <div className="bg-gray-50/80 rounded-2xl p-3 border border-gray-100 shadow-sm">
                   <div className="text-[10px] text-gray-500 font-semibold mb-1">Pending Dues</div>
                   <div className="text-lg font-bold text-gray-900">₹1,45,200</div>
                 </div>
               </div>

               <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-3 relative flex flex-col mb-4">
                  <div className="text-xs font-bold text-gray-800 mb-2">Monthly Collection</div>
                  
                  <div className="flex-1 relative w-full flex items-end justify-between px-2 pb-5">
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,80 L20,70 L40,85 L60,50 L80,65 L100,40" fill="none" stroke="#0b6d4b" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                      <circle cx="0" cy="80" r="3" fill="#0b6d4b" />
                      <circle cx="20" cy="70" r="3" fill="#0b6d4b" />
                      <circle cx="40" cy="85" r="3" fill="#0b6d4b" />
                      <circle cx="60" cy="50" r="3" fill="#0b6d4b" />
                      <circle cx="80" cy="65" r="3" fill="#0b6d4b" />
                      <circle cx="100" cy="40" r="3" fill="#0b6d4b" />
                    </svg>
                    
                    <div className="absolute left-[58%] top-[35%] bg-gray-900 text-white text-[9px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                      May<br/><span className="font-bold">₹2,45,600</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-[9px] text-gray-400 font-bold px-2 pt-2 border-t border-gray-50">
                     <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                  </div>
               </div>
               
               {/* Bottom Circle Chart Mock */}
               <div className="h-28 flex gap-4">
                  <div className="w-1/2 border border-gray-100 rounded-xl p-3 flex flex-col relative">
                     <div className="text-[10px] font-bold text-gray-800 mb-1">Complaints</div>
                     <div className="flex items-center gap-3">
                       <div className="w-12 h-12 rounded-full border-4 border-t-[#0b6d4b] border-r-[#0b6d4b] border-b-yellow-400 border-l-blue-500 flex items-center justify-center text-[10px] font-bold">32</div>
                       <div className="flex flex-col gap-1 text-[8px] font-semibold text-gray-500">
                          <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#0b6d4b]"></span>Open</div>
                          <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>In Progress</div>
                          <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Resolved</div>
                       </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Mobile Phone (Foreground) */}
            <div 
              className="relative md:absolute md:-left-2 lg:left-4 md:top-[45%] lg:top-[48%] md:-translate-y-1/2 z-20 w-[190px] sm:w-[210px] lg:w-[230px] bg-[#1a1a1a] rounded-[2rem] sm:rounded-[2.2rem] p-[6px] sm:p-[7px]"
              style={{ 
                transform: 'rotateY(-6deg) rotateX(1.5deg) translateZ(20px)',
                boxShadow: '-15px 15px 30px rgba(0,0,0,0.15), inset -1px -1px 2px rgba(255,255,255,0.1)'
              }}
            >
              {/* Phone Notch */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 sm:w-14 h-3.5 bg-[#1a1a1a] rounded-b-xl z-30"></div>
              
              {/* Phone Screen Slider */}
              <div className="w-full h-[390px] sm:h-[420px] lg:h-[460px] bg-white rounded-[1.6rem] sm:rounded-[1.8rem] overflow-hidden relative border border-gray-100">
                
                <div 
                  className="w-full h-full flex transition-transform duration-500 ease-in-out bg-white"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  
                  {/* Slide 0: Custom Dashboard UI */}
                  <div className="w-full h-full flex-shrink-0 relative flex flex-col pt-7 px-3 pb-3 bg-white">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 text-[9px] sm:text-[10px]">Green Valley Society</h3>
                        <p className="text-[7px] sm:text-[8px] text-gray-500">Tower A</p>
                      </div>
                      <button className="w-5 h-5 flex items-center justify-center text-gray-800">
                        <Bell className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Green Greeting Card */}
                    <div className="bg-[#0b6d4b] rounded-xl p-2.5 text-white mb-4 relative overflow-hidden shadow-lg shadow-[#0b6d4b]/30 flex justify-between items-center">
                      <div>
                        <p className="text-[8px] sm:text-[9px] font-medium opacity-90 mb-0.5">Good Morning</p>
                        <h2 className="text-[11px] sm:text-[12px] font-bold mb-0.5">Rajesh Mishra</h2>
                        <p className="text-[6.5px] sm:text-[7.5px] opacity-80">Have a great day ahead!</p>
                      </div>
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <Bell className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* Quick Access */}
                    <h4 className="font-bold text-gray-900 text-[9px] sm:text-[10px] mb-2">Quick Access</h4>
                    <div className="grid grid-cols-4 gap-y-2.5 sm:gap-y-3 gap-x-1 mb-3">
                      <div className="flex flex-col items-center justify-start gap-1 cursor-pointer">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center shrink-0 shadow-sm"><Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></div>
                        <span className="text-[6.5px] font-bold text-gray-700 text-center w-full truncate">Notices</span>
                      </div>
                      <div className="flex flex-col items-center justify-start gap-1 cursor-pointer">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-blue-50 border border-blue-100 text-blue-500 flex items-center justify-center shrink-0 shadow-sm"><Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></div>
                        <span className="text-[6.5px] font-bold text-gray-700 text-center w-full truncate">Visitors</span>
                      </div>
                      <div className="flex flex-col items-center justify-start gap-1 cursor-pointer">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-pink-50 border border-pink-100 text-pink-500 flex items-center justify-center shrink-0 shadow-sm"><Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></div>
                        <span className="text-[6.5px] font-bold text-gray-700 text-center w-full truncate">Maint.</span>
                      </div>
                      <div className="flex flex-col items-center justify-start gap-1 cursor-pointer">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-indigo-50 border border-indigo-100 text-indigo-500 flex items-center justify-center shrink-0 shadow-sm"><AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></div>
                        <span className="text-[6.5px] font-bold text-gray-700 text-center w-full truncate">Complaints</span>
                      </div>
                      <div className="flex flex-col items-center justify-start gap-1 cursor-pointer">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center shrink-0 shadow-sm"><FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></div>
                        <span className="text-[6.5px] font-bold text-gray-700 text-center w-full truncate">Bills</span>
                      </div>
                      <div className="flex flex-col items-center justify-start gap-1 cursor-pointer">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-green-50 border border-green-100 text-green-500 flex items-center justify-center shrink-0 shadow-sm"><CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></div>
                        <span className="text-[6.5px] font-bold text-gray-700 text-center w-full truncate">Payments</span>
                      </div>
                      <div className="flex flex-col items-center justify-start gap-1 cursor-pointer">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-blue-50 border border-blue-100 text-blue-500 flex items-center justify-center shrink-0 shadow-sm"><Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></div>
                        <span className="text-[6.5px] font-bold text-gray-700 text-center w-full truncate">Amenities</span>
                      </div>
                      <div className="flex flex-col items-center justify-start gap-1 cursor-pointer">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center shrink-0 shadow-sm"><Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></div>
                        <span className="text-[6.5px] font-bold text-gray-700 text-center w-full truncate">More</span>
                      </div>
                    </div>
                    
                    {/* Latest Notice */}
                    <h4 className="font-bold text-gray-900 text-[9px] sm:text-[10px] mb-1.5 mt-1.5">Latest Notice</h4>
                    <div className="bg-gray-50 rounded-[10px] p-2 flex flex-col border border-gray-100 shadow-sm mb-2.5">
                       <div className="flex justify-between items-center mb-0.5">
                          <h5 className="text-[7.5px] sm:text-[8px] font-bold text-gray-800">Water Supply Maintenance</h5>
                          <ChevronRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-gray-400" />
                       </div>
                       <p className="text-[6px] sm:text-[6.5px] text-gray-500 leading-relaxed mb-1">Water supply will be closed on<br/>15 May 2025 from 10:00 AM to 2:00 PM</p>
                       <p className="text-[6px] sm:text-[6.5px] text-gray-400 font-semibold">May 12, 2025</p>
                    </div>

                    {/* Upcoming Events */}
                    <h4 className="font-bold text-gray-900 text-[9px] sm:text-[10px] mb-1.5">Upcoming Events</h4>
                    <div className="bg-white rounded-[10px] p-1.5 flex items-center gap-1.5 border border-gray-100 shadow-sm">
                      <div className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0"><Users className="w-2.5 h-2.5" /></div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-[7.5px] sm:text-[8px] font-bold text-gray-800 truncate">Society Meeting</h5>
                        <p className="text-[6px] sm:text-[6.5px] text-gray-500 truncate">May 20, 2025 • 6:00 PM</p>
                      </div>
                      <ChevronRight className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                    </div>
                  </div>

                  {/* 14 Real Image Slides */}
                  {slideImages.map((src, idx) => (
                    <div key={idx} className="w-full h-full flex-shrink-0 relative bg-white flex items-center justify-center overflow-hidden">
                      <img src={src} alt={`App Screen ${idx + 1}`} className="w-full h-full object-cover object-center scale-[1.25]" />
                    </div>
                  ))}

                </div>

              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
