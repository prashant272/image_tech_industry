import React from 'react';
import { ArrowRight } from 'lucide-react';
import societyBg from '../../assets/modern_society.png';

const CTA = () => {
  return (
    <section className="py-20 bg-[#f8fafc] relative" id="cta">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Floating Banner Card */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-200 bg-gray-900">
          
          {/* Background Image & Gradient */}
          <div className="absolute inset-0 z-0">
            <img 
              src={societyBg} 
              alt="Premium Society" 
              className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-[20s] hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
          </div>
          
          {/* Content inside card */}
          <div className="relative z-10 px-8 py-16 sm:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold text-white tracking-tight mb-5 leading-[1.15] drop-shadow-md">
                Ready to Digitize Your Society?
              </h2>
              <p className="text-[16px] sm:text-[18px] text-green-50 font-medium leading-relaxed opacity-90 max-w-xl mx-auto lg:mx-0">
                Join hundreds of premium residential communities already saving time, reducing costs, and improving security with our platform.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-[#0b6d4b] font-bold rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 flex items-center justify-center gap-2 text-[15px] whitespace-nowrap">
                Book Free Demo
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white font-bold rounded-full transition-all duration-300 border-2 border-white/40 hover:border-white shadow-sm flex items-center justify-center text-[15px] whitespace-nowrap">
                Start Free Trial
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
