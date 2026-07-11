import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, CreditCard, FileText, ArrowRight } from 'lucide-react';
import AnimatedRGBBorder from '../common/AnimatedRGBBorder';

const DashboardShowcase = () => {
  const tabs = [
    { id: 'admin', title: 'Admin Dashboard', icon: '🏢', desc: 'Complete society control & monitoring' },
    { id: 'resident', title: 'Resident App', icon: '👨‍👩‍👧', desc: 'Seamless communication & billing' },
    { id: 'security', title: 'Security Guard', icon: '🛡️', desc: 'Advanced visitor & emergency tracking' },
    { id: 'accounting', title: 'Accounting', icon: '💰', desc: 'Automated financials & reporting' },
    { id: 'committee', title: 'Committee', icon: '👥', desc: 'Collaborative task management' }
  ];

  const highlights = [
    { title: 'Real-time Analytics', icon: <BarChart3 className="w-6 h-6 text-[#0b6d4b]" /> },
    { title: 'Smart Visitor Management', icon: <Users className="w-6 h-6 text-[#0b6d4b]" /> },
    { title: 'Online Maintenance Billing', icon: <CreditCard className="w-6 h-6 text-[#0b6d4b]" /> },
    { title: 'Complete Society Reports', icon: <FileText className="w-6 h-6 text-[#0b6d4b]" /> }
  ];

  return (
    <section className="py-10 lg:py-10 bg-[#f8fafc] relative border-b border-gray-100">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Premium Header */}
        <div className="text-center mb-12 lg:mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f5ef] border border-[#0b6d4b]/10 mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0b6d4b] animate-pulse"></span>
            <span className="text-[12px] sm:text-[13px] font-extrabold text-[#0b6d4b] uppercase tracking-[0.15em]">Core Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight mb-5 leading-[1.15]">
            One Powerful Platform. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b6d4b] to-[#12a070]">
              Multiple Dashboards.
            </span>
          </h2>
          <p className="text-base sm:text-[1.1rem] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Manage every aspect of your society with dedicated dashboards for administrators, residents, security guards, accountants, and committee members.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 mb-20 max-w-7xl mx-auto">
          {tabs.map((tab) => (
            <Link to={`/dashboards/${tab.id}`} key={tab.id} className="block group h-full">
              <AnimatedRGBBorder className="w-full h-full hover:-translate-y-1.5 transition-transform duration-300 shadow-sm hover:shadow-lg">
                <div className="flex flex-col items-center text-center p-6 sm:p-8 w-full h-full bg-white relative overflow-hidden">
                  <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300 mb-4 drop-shadow-sm">{tab.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0b6d4b] transition-colors mb-2">
                    {tab.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 font-medium mb-6">
                    {tab.desc}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-1.5 text-sm font-bold text-[#0b6d4b] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </AnimatedRGBBorder>
            </Link>
          ))}
        </div>

        {/* Highlights (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-6xl mx-auto border-t border-gray-200 pt-16">
          {highlights.map((highlight, index) => (
            <div 
              key={index} 
              className="group flex flex-col items-center sm:items-start text-center sm:text-left gap-4 p-6 sm:p-7 rounded-[1.25rem] bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-[#0b6d4b]/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-4 rounded-[1rem] bg-[#e6f5ef] text-[#0b6d4b] group-hover:bg-[#0b6d4b] group-hover:text-white transition-colors duration-300 shrink-0">
                {highlight.icon}
              </div>
              <h4 className="text-[15px] sm:text-[16px] font-extrabold text-gray-900 leading-snug">
                {highlight.title}
              </h4>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DashboardShowcase;
