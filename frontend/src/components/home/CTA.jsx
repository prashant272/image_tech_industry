import React from 'react';
import { ArrowRight, ShieldCheck, Headset, Truck } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-6 lg:py-8 bg-white relative font-sans" id="cta">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card (Strip) */}
        <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-[#040e21] shadow-[0_30px_60px_-15px_rgba(4,14,33,0.5)] border border-blue-900/40">
          
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000" 
              alt="Industrial Background" 
              className="w-full h-full object-cover opacity-20"
            />
            {/* Rich Blue Gradient Overlays for Depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#020813] via-[#07193b]/90 to-[#020813]/80"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
            
            {/* Subtle Dot Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          </div>

          <div className="relative z-10 px-8 py-6 lg:px-12 lg:py-8 flex flex-col justify-between">
            
            {/* Top Row: Text & Buttons */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8">
              
              {/* Text */}
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold text-white leading-tight mb-3 tracking-tight">
                  Looking for the Right<br className="hidden md:block"/> Industrial Solution?
                </h2>
                <p className="text-[15px] lg:text-[16px] text-blue-50 font-medium leading-relaxed max-w-xl">
                  Let our experts help you find the perfect product for your printing, packaging & testing applications.
                </p>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
                <button 
                  onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
                  className="w-full sm:w-auto px-7 py-3 bg-white hover:bg-gray-100 text-[#040e21] font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-[13px] uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  GET A QUOTE
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full sm:w-auto px-7 py-3 bg-transparent hover:bg-white/5 text-white font-bold rounded-full transition-all duration-300 border-2 border-white/40 hover:border-white flex items-center justify-center gap-2 text-[13px] uppercase tracking-wider">
                  TALK TO OUR EXPERT
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
            </div>

            {/* Bottom Row: Features */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 pt-6 border-t border-white/10">
              
              {/* Feature 1 */}
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full border border-blue-500/30 flex items-center justify-center bg-blue-900/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-[14px] mb-0.5">Premium Quality</h4>
                  <p className="text-blue-100 text-[12px] font-medium">Products</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full border border-blue-500/30 flex items-center justify-center bg-blue-900/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shrink-0">
                  <Headset className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-[14px] mb-0.5">Expert Technical</h4>
                  <p className="text-blue-200/60 text-[12px] font-medium">Support</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full border border-blue-500/30 flex items-center justify-center bg-blue-900/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-[14px] mb-0.5">On-Time Delivery</h4>
                  <p className="text-blue-200/60 text-[12px] font-medium">Across India</p>
                </div>
              </div>

            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
};

export default CTA;
