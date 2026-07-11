import React from 'react';
import { ArrowRight, ArrowDown, X, Check } from 'lucide-react';

const Comparison = () => {
  const comparisons = [
    { old: 'Paper Visitor Register', new: 'QR Visitor Check-in' },
    { old: 'Manual Billing', new: 'Auto Invoice Generation' },
    { old: 'WhatsApp Complaints', new: 'Complaint Ticket System' },
    { old: 'Gate Phone Calls', new: 'QR Visitor Pass' },
    { old: 'Excel Accounting', new: 'Smart Finance Dashboard' },
    { old: 'Manual Emergency Contact', new: 'One-Tap SOS Alert' }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white relative border-b border-gray-100">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-6 shadow-sm">
            <span className="text-[12px] sm:text-[13px] font-extrabold text-gray-600 uppercase tracking-[0.15em]">Why Societies Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight mb-6 leading-[1.2]">
            Replace Manual Work with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b6d4b] to-[#12a070]">Smart Management</span>
          </h2>
          <p className="text-[16px] sm:text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            From visitor management and maintenance billing to accounting and resident communication, our platform digitizes every daily operation—saving time, reducing errors, and improving transparency.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {comparisons.map((item, index) => (
            <div 
              key={index} 
              className="group flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-3xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#0b6d4b]/20 transition-all duration-300"
            >
              
              {/* Traditional (Red) */}
              <div className="flex-1 w-full bg-red-50/50 hover:bg-red-50 border border-red-100/50 hover:border-red-100 rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 text-red-700 transition-colors">
                <div className="bg-white shadow-sm border border-red-100 p-2 rounded-xl shrink-0">
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-[14px] sm:text-[16px]">{item.old}</span>
              </div>

              {/* Arrow */}
              <div className="flex shrink-0 items-center justify-center bg-gray-50 border border-gray-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full text-gray-400 group-hover:text-[#0b6d4b] group-hover:bg-[#e6f5ef] group-hover:border-[#0b6d4b]/20 transition-colors z-10 -my-6 sm:my-0 sm:-mx-6">
                <ArrowRight className="w-5 h-5 hidden sm:block" />
                <ArrowDown className="w-5 h-5 block sm:hidden" />
              </div>

              {/* Smart (Green) */}
              <div className="flex-1 w-full bg-[#e6f5ef]/50 hover:bg-[#e6f5ef] border border-[#0b6d4b]/10 hover:border-[#0b6d4b]/20 rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 text-[#0b6d4b] transition-colors">
                <div className="bg-[#0b6d4b] shadow-md shadow-[#0b6d4b]/20 p-2 rounded-xl shrink-0">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-[14px] sm:text-[16px]">{item.new}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Comparison;
