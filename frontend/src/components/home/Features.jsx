import React from 'react';

const Features = () => {
  const features = [
    { title: 'Resident Management', icon: '👥', desc: 'Seamlessly onboard and manage all residents and tenants.' },
    { title: 'Visitor Management', icon: '🚶', desc: 'Pre-approve guests and streamline gate entry via QR.' },
    { title: 'Maintenance Billing', icon: '💳', desc: 'Automate invoice generation and collect payments online.' },
    { title: 'Notices & Announcements', icon: '📢', desc: 'Broadcast important updates instantly to everyone.' },
    { title: 'Complaint Management', icon: '🛠️', desc: 'Track and resolve resident issues with a smart helpdesk.' },
    { title: 'Amenity Booking', icon: '📅', desc: 'Allow residents to easily reserve clubhouses and facilities.' },
    { title: 'Vehicle Management', icon: '🚗', desc: 'Track resident vehicles and manage parking slots.' },
    { title: 'Parcel Management', icon: '📦', desc: 'Securely track deliveries from the gate to the doorstep.' },
    { title: 'Security Guard App', icon: '👮', desc: 'Empower guards with a dedicated digital workflow.' },
    { title: 'Reports & Analytics', icon: '📊', desc: 'Gain deep insights into society operations and finances.' },
    { title: 'Digital Documents', icon: '📁', desc: 'Securely store and share society records and rules.' },
    { title: 'Society Accounting', icon: '💰', desc: 'End-to-end accounting, auditing, and ledger management.' }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative border-b border-gray-100" id="features">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-6 shadow-sm">
             <span className="w-2 h-2 rounded-full bg-[#0b6d4b]"></span>
            <span className="text-[12px] sm:text-[13px] font-extrabold text-gray-600 uppercase tracking-[0.15em]">Complete Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight mb-6 leading-[1.15]">
            Everything You Need to <br className="hidden sm:block" />
            <span className="text-[#0b6d4b]">Manage Your Society</span>
          </h2>
          <p className="text-[16px] sm:text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            A complete suite of tools to manage residents, security, maintenance, accounting, communication, and daily operations from a single platform.
          </p>
        </div>

        {/* 12 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group flex flex-col p-6 sm:p-8 rounded-[1.5rem] bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(11,109,75,0.08)] hover:border-[#0b6d4b]/20 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Subtle glowing background on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0b6d4b]/5 rounded-bl-full translate-x-16 -translate-y-16 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-500"></div>
              
              <div className="w-14 h-14 rounded-2xl bg-[#f4f7fb] group-hover:bg-[#e6f5ef] flex items-center justify-center text-3xl mb-5 transition-colors duration-300 relative z-10 border border-gray-50 group-hover:border-[#0b6d4b]/10">
                {feature.icon}
              </div>
              
              <h3 className="text-[17px] font-bold text-gray-900 mb-2 group-hover:text-[#0b6d4b] transition-colors relative z-10">
                {feature.title}
              </h3>
              
              <p className="text-[14px] text-gray-500 font-medium leading-relaxed relative z-10">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
