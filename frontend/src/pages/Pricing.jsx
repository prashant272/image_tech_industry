import React, { useEffect } from 'react';
import { ArrowRight, PhoneCall, Calendar } from 'lucide-react';

export default function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen text-slate-900 animate-[fadeIn_0.5s_ease-out] relative overflow-hidden flex flex-col justify-center items-center">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#e6f5ef] to-transparent rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#0b6d4b] rounded-full blur-[150px] opacity-[0.03] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e6f5ef] text-[#0b6d4b] text-[13px] font-black tracking-widest uppercase mb-10 border border-[#0b6d4b]/20 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0b6d4b] animate-pulse"></span>
            Custom Pricing
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1.05] mb-12">
            Let's Build the Right <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b6d4b] to-[#1cd78d]">Plan Together</span>
          </h1>

          <div className="bg-white border-2 border-gray-100 p-10 md:p-14 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] max-w-4xl mx-auto relative overflow-hidden mb-12 group hover:border-[#0b6d4b] transition-all duration-500">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0b6d4b] to-[#1cd78d]"></div>
            
            <p className="text-xl md:text-2xl text-gray-900 leading-snug font-black mb-8">
              Every residential community is unique. The number of residents, security staff, amenities, and operational needs vary from one society to another.
            </p>
            
            <p className="text-[17px] md:text-[19px] text-gray-600 leading-relaxed font-bold mb-8">
              Instead of offering fixed public pricing, we work with you to understand your requirements and recommend the most suitable plan.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <p className="text-[17px] md:text-[19px] text-[#0b6d4b] leading-relaxed font-black">
                See SocietyMates in action first. Once you're satisfied, we'll discuss a pricing plan that fits your community perfectly.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-[#0b6d4b] text-white rounded-2xl font-black text-[17px] transition-all shadow-[0_10px_20px_rgba(11,109,75,0.2)] hover:-translate-y-1 hover:bg-[#09573c]">
              <Calendar size={20} />
              Schedule a Demo
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white text-gray-900 border-2 border-gray-200 rounded-2xl font-black text-[17px] transition-all shadow-sm hover:-translate-y-1 hover:border-gray-900 hover:bg-gray-50">
              <PhoneCall size={20} />
              Contact Sales
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
