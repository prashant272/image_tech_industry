import React, { useEffect } from 'react';
import { Home, Building, Building2, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const segments = [
  {
    id: 'housing-societies',
    title: 'Housing Societies',
    icon: Home,
    desc: 'The complete digital upgrade for standard residential apartments and RWA-managed complexes.',
    features: ['Visitor Management', 'Maintenance Billing', 'Resident Helpdesk', 'Amenities Booking']
  },
  {
    id: 'gated-townships',
    title: 'Gated Townships',
    icon: Building2,
    desc: 'Scalable infrastructure for sprawling townships with multiple gates, phases, and complex security needs.',
    features: ['Multi-gate Sync', 'RFID Boom Barriers', 'Internal Transport Tracking', 'Phase-wise Billing']
  },
  {
    id: 'commercial',
    title: 'Commercial Complexes',
    icon: Building,
    desc: 'Enterprise-grade visitor and facility management for IT parks, malls, and corporate office spaces.',
    features: ['Employee Attendance', 'Delivery Hub Routing', 'Meeting Room Booking', 'Vendor SLA Tracking']
  },
  {
    id: 'co-living',
    title: 'Co-living Spaces',
    icon: Users,
    desc: 'Streamlined tenant onboarding, rent collection, and community building for modern PG/co-living providers.',
    features: ['Digital KYC', 'Rent Collection', 'Room Allocation', 'Community Events Feed']
  }
];

export default function Industries() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 pb-16 bg-white min-h-screen text-slate-900 animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strong Hero Section (White Bg) */}
        <div className="text-center max-w-4xl mx-auto mb-14 relative mt-4">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b6d4b] text-white text-[13px] font-bold tracking-widest uppercase mb-4 shadow-xl">
              Tailored Solutions
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tighter leading-tight">
              Built for every <span className="text-[#0b6d4b]">community.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-bold max-w-3xl mx-auto">
              SocietyPro's enterprise-grade architecture adapts perfectly to the unique operational challenges of different real estate asset classes.
            </p>
          </div>
        </div>

        {/* Premium White Cards Grid with Strong Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto mb-20">
          {segments.map((segment, idx) => {
            const Icon = segment.icon;
            return (
              <div
                key={segment.id}
                className="group relative bg-white p-8 md:p-10 rounded-[2rem] border-2 border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[#0b6d4b] hover:shadow-[0_20px_60px_rgba(11,109,75,0.15)]"
              >
                
                <div className="w-16 h-16 rounded-2xl bg-gray-50 border-2 border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0b6d4b] group-hover:border-[#0b6d4b] transition-all duration-500 shadow-md relative z-10">
                  <Icon size={32} className="text-[#0b6d4b] group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-2xl font-black text-black mb-3 relative z-10 tracking-tight">{segment.title}</h3>
                <p className="text-gray-600 leading-relaxed font-bold mb-6 relative z-10 text-[15px]">
                  {segment.desc}
                </p>
                
                <div className="space-y-3 mb-8 relative z-10">
                  {segment.features.map(feat => (
                    <div key={feat} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#0b6d4b] flex items-center justify-center shrink-0 shadow-sm">
                        <CheckCircle2 size={12} className="text-white" />
                      </div>
                      <span className="text-gray-800 font-bold text-[15px]">{feat}</span>
                    </div>
                  ))}
                </div>
                
                <Link 
                  to={`/industries/${segment.id}`} 
                  className="inline-flex items-center gap-2 text-[#0b6d4b] font-black text-[16px] hover:text-black transition-colors relative z-10 group/link"
                >
                  View solution <ArrowRight size={20} className="group-hover/link:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Strong FAQ Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-3 tracking-tight">Implementation FAQs</h2>
            <p className="text-lg text-gray-600 font-bold">Common questions about onboarding and deployment.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "How long does implementation take?", a: "Implementation time depends on society size and migration requirements, but most communities can be onboarded within a few days to a few weeks." },
              { q: "Do you provide onboarding assistance?", a: "Yes. Our onboarding team helps configure the platform, import data, and train administrators and staff." },
              { q: "Can existing data be imported?", a: "Yes. Resident records, unit information, vehicles, accounting balances, and other supported data can be imported using structured templates." },
              { q: "Will residents receive training?", a: "Residents are provided with simple onboarding guidance and documentation to help them start using the platform quickly." },
              { q: "Can we migrate from another society management software?", a: "Yes. We assist with migrating supported data from existing systems while minimizing disruption." },
              { q: "Is technical knowledge required?", a: "No. SocietyPro is designed for ease of use with an intuitive interface suitable for committee members, residents, and staff." },
              { q: "Can the platform be customized?", a: "Enterprise deployments may include configurable workflows, permissions, branding, and operational settings based on business requirements." },
              { q: "What happens after implementation?", a: "After go-live, your society continues to receive product updates, support, and guidance to help ensure successful long-term adoption." }
            ].map((faq, i) => (
              <details key={i} className="group bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-[0_5px_15px_rgba(0,0,0,0.03)] [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:border-[#0b6d4b] transition-colors">
                <summary className="flex items-center justify-between font-black text-black text-[16px]">
                  {faq.q}
                  <span className="ml-4 flex-shrink-0 bg-gray-50 border-2 border-gray-100 rounded-full p-1.5 group-open:-rotate-180 group-open:bg-[#0b6d4b] group-open:border-[#0b6d4b] group-open:text-white transition-all duration-300 text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 font-bold leading-relaxed text-[15px] pr-8">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* High-Impact CTA Section */}
        <div className="bg-[#0b6d4b] rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden max-w-5xl mx-auto shadow-[0_20px_40px_rgba(11,109,75,0.2)]">
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter">Ready to upgrade your community?</h2>
            <p className="text-lg md:text-xl text-green-100 font-bold max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of societies that are already using SocietyPro to automate operations and improve resident satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#0b6d4b] rounded-xl font-black text-[16px] transition-all shadow-xl hover:scale-105 hover:bg-gray-50">
                Book a Free Demo
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/50 text-white hover:border-white hover:bg-white/10 rounded-xl font-black text-[16px] transition-all backdrop-blur-sm">
                Contact Sales
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
