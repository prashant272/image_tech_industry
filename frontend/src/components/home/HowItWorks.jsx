import React, { useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('visitor');

  const workflows = {
    visitor: {
      id: 'visitor',
      title: 'Visitor Management',
      icon: '🚶',
      image: '/images/generated/hiw_visitor.png',
      steps: [
        'Resident Creates Visitor Pass',
        'QR Pass Sent via WhatsApp/SMS',
        'Guard Scans QR at the Gate',
        'Resident Gets Instant Notification',
        'Entry & Exit Logged Automatically'
      ]
    },
    maintenance: {
      id: 'maintenance',
      title: 'Maintenance',
      icon: '🛠️',
      image: '/images/generated/hiw_maintenance.png',
      steps: [
        'Resident Raises Complaint',
        'Auto Assignment to Staff/Vendor',
        'Staff Receives Notification',
        'Work Completed & Verified',
        'Resident Rates the Service'
      ]
    },
    sos: {
      id: 'sos',
      title: 'Emergency SOS',
      icon: '🚨',
      image: '/images/generated/hiw_sos.png',
      steps: [
        'Resident Presses SOS',
        'Security Guards Notified',
        'Committee Members Alerted',
        'Emergency Response Started',
        'Incident Report Generated'
      ]
    }
  };

  const activeData = workflows[activeTab];

  return (
    <section className="py-20 lg:py-28 bg-white relative border-b border-gray-100" id="how-it-works">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f5ef] border border-[#0b6d4b]/10 mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0b6d4b] animate-pulse"></span>
            <span className="text-[12px] sm:text-[13px] font-extrabold text-[#0b6d4b] uppercase tracking-[0.15em]">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight mb-5 leading-[1.15]">
            Simple Workflows. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b6d4b] to-[#12a070]">
              Smarter Society Management.
            </span>
          </h2>
          <p className="text-base sm:text-[1.1rem] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            From visitor entry and maintenance requests to emergency response, every daily operation is managed through one connected platform.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16 lg:mb-20">
          {Object.values(workflows).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-full text-[13.5px] sm:text-[15px] font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0b6d4b] text-white shadow-[0_8px_20px_rgba(11,109,75,0.25)] -translate-y-1 scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:-translate-y-0.5 hover:shadow-sm'
                }`}
              >
                <span className="text-lg sm:text-xl drop-shadow-sm">{tab.icon}</span>
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Workflow Showcase Container */}
        <div className="bg-[#f8fafc] rounded-[2.5rem] border border-gray-100 p-6 sm:p-10 lg:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative overflow-hidden">
          
          {/* Main Layout: Timeline Left (Top on Mobile), Image Right (Bottom on Mobile) */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Timeline Area (Vertical) */}
            <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0 relative">
              <div className="absolute left-[28px] top-4 bottom-4 w-1 bg-gray-200 rounded-full hidden sm:block"></div>
              
              <div className="flex flex-col gap-6 sm:gap-8 relative z-10">
                {activeData.steps.map((step, index) => (
                  <div 
                    key={`${activeData.id}-${index}`}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-4 group animate-[fadeIn_0.5s_ease-out_forwards]"
                    style={{ animationDelay: `${index * 150}ms`, opacity: 0 }}
                  >
                    {/* Step Number Circle */}
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-[#0b6d4b] text-[#0b6d4b] flex items-center justify-center font-extrabold text-xl shadow-[0_0_15px_rgba(11,109,75,0.15)] shrink-0 group-hover:bg-[#0b6d4b] group-hover:text-white transition-colors duration-300 relative z-10">
                      {index + 1}
                    </div>
                    
                    {/* Step Content Card */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex-1 w-full text-center sm:text-left group-hover:shadow-md group-hover:border-[#0b6d4b]/30 transition-all duration-300 relative">
                      {/* Arrow connecting mobile stacked steps */}
                      {index < activeData.steps.length - 1 && (
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-300 sm:hidden">
                          <ArrowDown className="w-6 h-6 animate-bounce" />
                        </div>
                      )}
                      <h4 className="text-[15px] sm:text-[17px] font-bold text-gray-800 leading-snug">
                        {step}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image / GIF Area */}
            <div className="flex-1 w-full h-full min-h-[400px] sm:min-h-[500px] bg-white rounded-[2rem] border border-gray-200 p-2 sm:p-4 shadow-xl relative overflow-hidden group">
               {/* Browser Header Fake */}
               <div className="absolute top-0 left-0 w-full h-10 bg-gray-100 flex items-center px-4 gap-2 z-10 border-b border-gray-200">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
               </div>
               
               <div className="w-full h-full mt-10 rounded-xl overflow-hidden relative bg-gray-50 flex items-center justify-center">
                 <img 
                    key={activeData.id}
                    src={activeData.image} 
                    alt={activeData.title}
                    className="w-full h-full object-cover object-top animate-[fadeIn_0.8s_ease-out_forwards]"
                  />
                  {/* Subtle pulsing overlay to mimic "live" app feel */}
                  <div className="absolute inset-0 bg-[#0b6d4b]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
               </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
