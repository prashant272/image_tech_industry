import React from 'react';
import { 
  CheckCircle2, 
  Monitor, 
  Smartphone, 
  Apple, 
  ShieldCheck, 
  QrCode, 
  Globe,
  ArrowRight
} from 'lucide-react';

const CrossPlatform = () => {
  const features = [
    'Install as PWA',
    'Works on Android',
    'Works on iPhone',
    'Works on Desktop',
    'Push Notifications',
    'QR Code Scanner',
    'Visitor Management',
    'Online Payments',
    'Raise Complaints',
    'Book Amenities',
    'Digital Notices',
    'Emergency SOS'
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#f8fafc] relative overflow-hidden" id="devices">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-20">
          
          {/* Left Side: Mobile Mockup */}
          <div className="flex-1 w-full max-w-md mx-auto lg:mx-0 relative">
            {/* Background glowing blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#0b6d4b]/20 blur-[80px] rounded-full"></div>
            
            <div className="relative w-[280px] sm:w-[320px] bg-[#1a1a1a] rounded-[2.5rem] p-1.5 sm:p-2 border-2 sm:border-4 border-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.2)] mx-auto z-10">
              {/* Phone Notch */}
              <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-gray-900 rounded-b-xl z-20"></div>
              
              <div className="w-full h-full bg-[#f4f7fb] rounded-[2rem] sm:rounded-[2.2rem] overflow-hidden relative min-h-[580px] sm:min-h-[650px] flex flex-col">
                
                {/* Fake App Header */}
                <div className="bg-[#0b6d4b] pt-14 pb-16 px-6 relative">
                  <div className="absolute top-4 left-6 right-6 flex justify-between text-white/80 text-xs font-medium">
                    <span>10:32</span>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full border border-white/50"></div>
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-xl text-center">Security Scanner</h3>
                </div>

                {/* Floating QR Scanner Card */}
                <div className="flex-1 px-5 relative -mt-10">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-center animate-[fadeIn_0.5s_ease-out_forwards]">
                    
                    {/* Success Icon */}
                    <div className="relative w-20 h-20 mb-4">
                      <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
                      <div className="relative w-full h-full bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100">
                        <ShieldCheck className="w-10 h-10 text-green-600" />
                      </div>
                    </div>

                    <h4 className="text-2xl font-black text-gray-900 mb-1">Approved</h4>
                    <p className="text-sm text-gray-500 font-medium mb-6">Visitor Pass Validated</p>

                    {/* Details List */}
                    <div className="w-full space-y-4">
                      <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                        <span className="text-[13px] text-gray-500">Name</span>
                        <span className="font-bold text-gray-800 text-[15px]">Rahul Verma</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                        <span className="text-[13px] text-gray-500">Flat</span>
                        <span className="font-bold text-gray-800 text-[15px]">A-302</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                        <span className="text-[13px] text-gray-500">Vehicle</span>
                        <span className="font-bold text-gray-800 text-[15px] bg-yellow-100 px-2 py-0.5 rounded text-yellow-800 border border-yellow-200">DL 01 AB 1234</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                        <span className="text-[13px] text-gray-500">Time</span>
                        <span className="font-bold text-gray-800 text-[15px]">10:32 AM</span>
                      </div>
                    </div>

                    <button className="mt-8 w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                      <QrCode className="w-4 h-4" />
                      Scan Next
                    </button>
                  </div>
                </div>

                {/* Bottom App Nav */}
                <div className="h-16 bg-white border-t border-gray-200 flex justify-around items-center px-6 mt-auto shrink-0">
                  <div className="w-10 h-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-10 h-1 h-1 bg-gray-800 rounded-full"></div>
                  <div className="w-10 h-1 h-1 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="flex-1 w-full text-center lg:text-left mt-8 lg:mt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f5ef] border border-[#0b6d4b]/10 mb-6 shadow-sm">
              <span className="text-[12px] sm:text-[13px] font-extrabold text-[#0b6d4b] uppercase tracking-[0.15em]">Available on Every Device</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight mb-6 leading-[1.15]">
              One Platform. <br className="hidden sm:block" />
              <span className="text-[#0b6d4b]">Every Device.</span>
            </h2>
            
            <p className="text-[16px] sm:text-lg text-gray-600 font-medium leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Manage your society from anywhere using our secure web platform and Progressive Web App (PWA). Install it directly from your browser today, with native Android and iOS apps coming soon.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 sm:gap-x-6 mb-12 text-left max-w-xl mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#0b6d4b] shrink-0 mt-0.5" />
                  <span className="text-[14px] sm:text-[15px] font-bold text-gray-800">{feature}</span>
                </div>
              ))}
            </div>

            {/* Status Icons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 mb-12">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl shadow-sm border border-blue-100"><Globe className="w-6 h-6"/></div>
                <span className="text-xs font-bold text-gray-600">Web Platform</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xl shadow-sm border border-green-100"><Smartphone className="w-6 h-6"/></div>
                <span className="text-xs font-bold text-gray-600">PWA</span>
              </div>
              <div className="flex flex-col items-center gap-2 opacity-60 grayscale">
                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xl border border-gray-200">🤖</div>
                <span className="text-xs font-bold text-gray-500">Android (Soon)</span>
              </div>
              <div className="flex flex-col items-center gap-2 opacity-60 grayscale">
                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xl border border-gray-200"><Apple className="w-6 h-6"/></div>
                <span className="text-xs font-bold text-gray-500">iOS (Soon)</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-[#0b6d4b] hover:bg-[#075c3f] text-white font-bold rounded-full transition-colors shadow-lg shadow-[#0b6d4b]/30 flex items-center justify-center gap-2 text-[15px]">
                Install PWA
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-bold rounded-full transition-colors shadow-sm flex items-center justify-center text-[15px]">
                Book Free Demo
              </button>
            </div>
            
            <p className="mt-4 text-sm text-gray-400 font-medium">
              Native Android and iOS apps will be available soon.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CrossPlatform;
