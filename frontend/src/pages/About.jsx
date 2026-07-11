import React, { useEffect } from 'react';
import { Shield, Target, Eye, Users, Zap, CheckCircle2, Lock, Server, Cloud, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    'Smart Visitor Management',
    'Digital Billing & Accounting',
    'Maintenance & Complaint Tracking',
    'Resident Communication',
    'QR-Based Visitor Entry',
    'Staff & Security Management',
    'Notice Board & Announcements',
    'Emergency SOS',
    'Role-Based Access Control',
    'Mobile App & Progressive Web App (PWA)',
    'Secure Cloud Infrastructure',
    'Regular Data Backups'
  ];

  const values = [
    {
      title: 'Trust & Security',
      desc: 'We design every feature with privacy, security, and reliability at its core.',
      icon: Shield
    },
    {
      title: 'Community First',
      desc: 'Every decision we make is focused on creating a better experience for residents, management committees, and security staff.',
      icon: Users
    },
    {
      title: 'Simplicity',
      desc: 'Technology should simplify everyday tasks, not make them more complicated.',
      icon: Zap
    },
    {
      title: 'Continuous Innovation',
      desc: 'We are constantly improving SocietyMates with new features, better performance, and modern user experiences.',
      icon: Target
    }
  ];

  const faqs = [
    {
      q: "Is SocietyMates suitable for societies of all sizes?",
      a: "Yes. SocietyMates is designed to support residential communities of different sizes, from small apartment complexes to large gated societies."
    },
    {
      q: "Is resident information secure?",
      a: "Yes. We follow industry-standard security practices to protect user data and ensure secure access."
    },
    {
      q: "Can committee members control user permissions?",
      a: "Yes. Different roles and permission levels can be assigned based on responsibilities."
    },
    {
      q: "Is there a mobile app?",
      a: "Yes. SocietyMates is available as a Progressive Web App (PWA), allowing users to install it directly from their browser without visiting an app store."
    },
    {
      q: "Who owns the society's data?",
      a: "The society always owns its data. SocietyMates only provides the secure platform to manage it."
    }
  ];

  return (
    <div className="pt-20 pb-16 bg-white min-h-screen text-slate-900 animate-[fadeIn_0.5s_ease-out] relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#e6f5ef] to-transparent rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-[#0b6d4b] rounded-full blur-[150px] opacity-[0.03] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Premium Centered Hero Section */}
        <div className="relative z-10 pt-16 pb-24 text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e6f5ef] text-[#0b6d4b] text-[13px] font-black tracking-widest uppercase mb-8 border border-[#0b6d4b]/20 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0b6d4b] animate-pulse"></span>
            About SocietyMates
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[1.05] mb-10">
            Building the Future of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b6d4b] to-[#1cd78d]">Community Living.</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-[22px] text-slate-600 leading-relaxed font-bold max-w-3xl mx-auto mb-16">
            SocietyMates is a smart society management platform developed by Prime Impact Solutions to simplify the way residential communities operate.
          </p>

          {/* Intro Box */}
          <div className="bg-white border-2 border-gray-100 p-10 md:p-14 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(11,109,75,0.1)] transition-all duration-500 max-w-4xl mx-auto relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0b6d4b] to-[#1cd78d]"></div>
            <p className="text-[17px] md:text-[20px] text-gray-700 leading-relaxed font-bold relative z-10">
              Managing a housing society often involves multiple tools, paperwork, and constant coordination between residents, committee members, and security staff. We believe there is a better way. <span className="text-[#0b6d4b] font-black">That's why we built SocietyMates</span> — a single platform that brings visitor management, billing, maintenance, communication, security, and daily operations together in one seamless experience.
            </p>
          </div>
        </div>

        {/* Mission & Vision Section (Elevated Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
          <div className="group bg-white p-10 md:p-12 rounded-[2.5rem] border-2 border-gray-100 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#0b6d4b] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(11,109,75,0.15)]">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl border-2 border-gray-100 flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#0b6d4b] group-hover:border-[#0b6d4b] transition-all duration-500 group-hover:scale-110">
              <Target size={40} className="text-[#0b6d4b] group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-4xl font-black text-black mb-5 tracking-tight">Our Mission</h2>
            <p className="text-lg text-gray-600 font-bold leading-relaxed">
              To empower residential communities with modern technology that improves transparency, security, communication, and operational efficiency.
            </p>
          </div>
          <div className="group bg-white p-10 md:p-12 rounded-[2.5rem] border-2 border-gray-100 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#0b6d4b] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(11,109,75,0.15)]">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl border-2 border-gray-100 flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#0b6d4b] group-hover:border-[#0b6d4b] transition-all duration-500 group-hover:scale-110">
              <Eye size={40} className="text-[#0b6d4b] group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-4xl font-black text-black mb-5 tracking-tight">Our Vision</h2>
            <p className="text-lg text-gray-600 font-bold leading-relaxed">
              To become the most trusted digital platform for residential societies by making community living simpler, safer, and more connected.
            </p>
          </div>
        </div>

        {/* Why We Built & Built By - Asymmetrical Layout */}
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-[3rem] p-2 border-4 border-gray-800 shadow-2xl mb-32 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[#0b6d4b] opacity-10 pointer-events-none"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
            
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">Why We Built SocietyMates</h2>
              <div className="w-16 h-1.5 bg-[#0b6d4b] mb-8 rounded-full"></div>
              <p className="text-xl text-gray-300 font-bold leading-relaxed mb-6">
                Residential communities deserve software that is easy to use, reliable, and built for everyday life.
              </p>
              <p className="text-[17px] text-gray-400 font-medium leading-relaxed">
                SocietyMates was created to eliminate manual work, reduce operational complexity, and help committees focus on building better communities instead of managing paperwork.
              </p>
            </div>
            
            <div className="bg-white m-2 rounded-[2.5rem] p-10 md:p-14 shadow-inner flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-[12px] font-black tracking-widest uppercase mb-4">
                The Creators
              </div>
              <h2 className="text-3xl font-black text-black mb-6 tracking-tight">Built by Prime Impact Solutions</h2>
              <p className="text-lg text-gray-700 font-bold leading-relaxed mb-4">
                SocietyMates is proudly developed by Prime Impact Solutions, a software company focused on building secure, scalable, and user-friendly digital solutions.
              </p>
              <p className="text-md text-gray-600 font-bold leading-relaxed">
                We specialize in web applications, mobile apps, enterprise software, automation, and cloud-based platforms that solve real business and community challenges.
              </p>
            </div>
            
          </div>
        </div>

        {/* Core Values Section */}
        <div className="max-w-7xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">Our Core Values</h2>
            <p className="text-xl text-gray-600 font-bold">The principles that guide everything we build.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-sm hover:border-[#0b6d4b] hover:-translate-y-2 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0b6d4b] transition-colors duration-300 border border-gray-200 group-hover:shadow-[0_10px_20px_rgba(11,109,75,0.2)]">
                    <Icon size={32} className="text-[#0b6d4b] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-black text-black mb-4 tracking-tight">{val.title}</h3>
                  <p className="text-gray-600 font-bold leading-relaxed text-[15px]">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features & Security (Split Layout) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mb-32">
          
          {/* Features Side */}
          <div className="bg-gray-50 p-10 md:p-14 rounded-[3rem] border-2 border-gray-100">
            <h2 className="text-3xl font-black text-black mb-10 tracking-tight">Why Choose SocietyMates?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0b6d4b] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <span className="text-black font-black text-[15px] leading-tight">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security Side */}
          <div className="bg-[#0b6d4b] p-10 md:p-14 rounded-[3rem] text-white shadow-[0_30px_60px_rgba(11,109,75,0.25)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 backdrop-blur-sm">
                <Shield size={32} className="text-[#1cd78d]" />
              </div>
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">
                Security & Trust
              </h2>
              <p className="text-green-50 font-bold text-[17px] mb-10 leading-relaxed max-w-md">
                Keeping your community data safe is our highest priority. As we grow, privacy will continue to remain at the heart of everything we build.
              </p>
              
              <p className="font-black mb-5 uppercase tracking-widest text-[12px] text-[#1cd78d]">Built With Enterprise Security</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">
                {['Secure authentication', 'Encrypted communication', 'Role-based permissions', 'Activity & audit logs', 'Automated backups', 'Reliable cloud infrastructure'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded flex items-center justify-center shrink-0 bg-[#1cd78d]/20 border border-[#1cd78d]/50">
                      <Lock size={12} className="text-[#1cd78d]" />
                    </div>
                    <span className="text-white font-bold text-[14px] leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 font-bold">Everything you need to know about SocietyMates.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-[0_5px_15px_rgba(0,0,0,0.02)] [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:border-[#0b6d4b] transition-colors">
                <summary className="flex items-center justify-between font-black text-black text-[17px]">
                  {faq.q}
                  <span className="ml-4 flex-shrink-0 bg-gray-50 border-2 border-gray-100 rounded-full p-2 group-open:-rotate-180 group-open:bg-[#0b6d4b] group-open:border-[#0b6d4b] group-open:text-white transition-all duration-300 text-gray-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-5 text-gray-600 font-bold leading-relaxed text-[16px] pr-8">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* High-Impact CTA Section */}
        <div className="bg-[#0b6d4b] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden max-w-5xl mx-auto shadow-[0_30px_60px_rgba(11,109,75,0.25)] border-4 border-white">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] opacity-10 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">Join Us From Day One</h2>
            <p className="text-lg md:text-xl text-green-100 font-bold max-w-3xl mx-auto mb-10 leading-relaxed">
              We're just getting started, and we'd love to build the future of community living with you. Whether you're managing a small apartment complex or a large residential society, SocietyMates is here to simplify operations, improve communication, and strengthen security.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-[#0b6d4b] rounded-2xl font-black text-[17px] transition-all shadow-xl hover:scale-105 hover:bg-gray-50">
                Start Your Journey Today
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
