import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home, Building, Building2, Users, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

const industryData = {
  'housing-societies': {
    title: 'Housing Societies',
    icon: Home,
    heroDesc: 'The complete digital upgrade for standard residential apartments and RWA-managed complexes.',
    benefits: [
      'Automated maintenance billing and collections',
      'Seamless visitor and delivery management',
      'Centralized communication and helpdesk',
      'Easy facility and amenities booking'
    ],
    modules: ['Visitor Management', 'Accounting & Billing', 'Resident Helpdesk', 'Notice Board', 'Amenities Booking', 'Vehicle Tracking']
  },
  'gated-townships': {
    title: 'Gated Townships',
    icon: Building2,
    heroDesc: 'Scalable infrastructure for sprawling townships with multiple gates, phases, and complex security needs.',
    benefits: [
      'Multi-gate synchronization and tracking',
      'RFID boom barrier integration',
      'Internal transport tracking',
      'Phase-wise billing and accounting'
    ],
    modules: ['Multi-Gate Security', 'Phase-wise Accounting', 'RFID Integration', 'Transport Tracking', 'Clubhouse Management', 'Vendor Passes']
  },
  'commercial': {
    title: 'Commercial Complexes',
    icon: Building,
    heroDesc: 'Enterprise-grade visitor and facility management for IT parks, malls, and corporate office spaces.',
    benefits: [
      'Employee attendance tracking',
      'Centralized delivery hub routing',
      'Meeting and conference room booking',
      'Vendor SLA and AMC tracking'
    ],
    modules: ['Employee Roster', 'Delivery Hub Routing', 'Conference Rooms', 'AMC & Vendor SLA', 'Asset Management', 'Helpdesk']
  },
  'co-living': {
    title: 'Co-living Spaces',
    icon: Users,
    heroDesc: 'Streamlined tenant onboarding, rent collection, and community building for modern PG and co-living providers.',
    benefits: [
      'Digital KYC and background verification',
      'Automated rent collection and invoicing',
      'Dynamic room and bed allocation',
      'Community events and feed'
    ],
    modules: ['Digital KYC', 'Rent Collection', 'Bed Allocation', 'Community Feed', 'Maintenance Requests', 'Event Management']
  }
};

export default function IndustryDetail() {
  const { slug } = useParams();
  const industry = industryData[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!industry) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-4xl font-black text-black mb-4">Industry Not Found</h1>
        <Link to="/industries" className="text-[#0b6d4b] font-bold hover:underline">Back to Industries</Link>
      </div>
    );
  }

  const Icon = industry.icon;

  return (
    <div className="pt-28 pb-16 bg-white min-h-screen text-slate-900 animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back button */}
        <Link to="/industries" className="inline-flex items-center gap-2 text-gray-500 hover:text-black font-black mb-10 transition-colors">
          <ArrowLeft size={18} /> BACK TO INDUSTRIES
        </Link>

        {/* Strong Hero Section */}
        <div className="bg-white rounded-[2.5rem] p-10 md:p-16 border-2 border-[#0b6d4b] shadow-[0_20px_60px_rgba(11,109,75,0.15)] relative overflow-hidden mb-20">
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-[#0b6d4b] shadow-xl flex items-center justify-center shrink-0">
              <Icon size={56} className="text-white" />
            </div>
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-[#0b6d4b] text-[13px] font-black tracking-wide uppercase mb-4 border-2 border-gray-200">
                Industry Solution
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-black mb-6 tracking-tighter leading-tight">
                {industry.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-bold max-w-3xl">
                {industry.heroDesc}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto mb-20">
          {/* Core Benefits */}
          <div>
            <h2 className="text-3xl font-black text-black mb-8 tracking-tight">Core Benefits</h2>
            <div className="space-y-4">
              {industry.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-100 shadow-sm hover:border-[#0b6d4b] transition-all flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#0b6d4b] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <span className="text-black font-bold text-[16px] leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Included Modules */}
          <div>
            <h2 className="text-3xl font-black text-black mb-8 tracking-tight">Included Modules</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {industry.modules.map((module, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border-2 border-gray-100 shadow-sm hover:bg-[#0b6d4b] hover:text-white group transition-all">
                  <span className="text-gray-800 font-bold text-[15px] group-hover:text-white transition-colors">{module}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* High-Impact CTA */}
        <div className="bg-[#0b6d4b] rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden max-w-5xl mx-auto shadow-[0_20px_40px_rgba(11,109,75,0.2)]">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter">Elevate your {industry.title.toLowerCase()} today.</h2>
            <p className="text-lg md:text-xl text-green-100 font-bold max-w-2xl mx-auto mb-10 leading-relaxed">
              Schedule a personalized demo to see how SocietyPro can perfectly adapt to your specific operational needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#0b6d4b] rounded-xl font-black text-[16px] transition-all shadow-xl hover:scale-105 hover:bg-gray-50">
                Book a Free Demo
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
