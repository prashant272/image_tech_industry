import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, QrCode, Siren, Receipt, CreditCard, Bell, Wrench, CalendarCheck, Zap, CheckCircle2, ChevronDown, ArrowRight } from 'lucide-react';
import { getFeatureData } from '../data/featuresData';

const iconMap = {
  ShieldCheck, QrCode, Siren, Receipt, CreditCard, Bell, Wrench, CalendarCheck, Zap
};

const FeatureDetail = () => {
  const { slug } = useParams();
  const feature = getFeatureData(slug);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const IconComponent = iconMap[feature.icon] || Zap;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      <div className="pt-24 pb-12 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-8 font-bold tracking-wide uppercase">
          <Link to="/" className="hover:text-[#0b6d4b] transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900">Features</span>
          <span className="text-gray-300">/</span>
          <span className="text-[#0b6d4b]">{slug.replace(/-/g, ' ')}</span>
        </div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center justify-center p-4 bg-[#0b6d4b]/10 border-2 border-[#0b6d4b] rounded-2xl mb-6 shadow-md">
              <IconComponent className="w-8 h-8 text-[#0b6d4b]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
              {feature.title}
            </h1>
            <p className="text-2xl text-[#0b6d4b] font-extrabold mb-4 tracking-tight">
              {feature.tagline}
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mb-8 max-w-xl font-medium">
              {feature.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="bg-[#0b6d4b] hover:bg-[#09573c] text-white px-8 py-4 rounded-xl font-bold text-[15px] transition-all shadow-[0_4px_15px_rgba(11,109,75,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2 border-2 border-[#0b6d4b]">
                Book a Demo <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 px-8 py-4 rounded-xl font-bold text-[15px] transition-all flex items-center justify-center">
                Contact Sales
              </button>
            </div>
          </div>
          
          {/* RGB Animated Border Showcase */}
          <div className="relative p-1 rounded-[2.5rem] overflow-hidden group shadow-2xl">
            {/* Spinning RGB Gradient */}
            <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)]" />
            
            {/* Inner Content Box (Rich Green) */}
            <div className="relative h-[450px] w-full rounded-[2.4rem] bg-gradient-to-br from-[#0b6d4b] to-[#06422d] flex items-center justify-center overflow-hidden">
              {/* Subtle Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
              
              {/* Floating Glass UI Card */}
              <div className="relative z-10 w-[85%] max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] p-8 transform transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/10">
                    <IconComponent className="w-7 h-7 text-[#0b6d4b]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg">Module Active</h3>
                    <p className="text-[13px] text-emerald-300 font-bold uppercase tracking-wider mt-0.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span> System Ready
                    </p>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[12px] font-bold text-emerald-100/70 uppercase tracking-wider">
                      <span>Processing</span>
                      <span className="text-white">100%</span>
                    </div>
                    <div className="h-3 bg-black/20 rounded-full w-full overflow-hidden shadow-inner border border-white/10">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 w-full rounded-full relative">
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <div className="h-3 bg-black/20 rounded-full w-3/4 border border-white/10"></div>
                  <div className="h-3 bg-black/20 rounded-full w-5/6 border border-white/10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {feature.stats.map((stat, idx) => (
            <div key={idx} className="relative p-1 rounded-3xl overflow-hidden group">
              <div className="absolute inset-[-100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)]" />
              <div className="relative bg-white border-2 border-gray-100 rounded-[1.4rem] p-8 text-center h-full">
                <h3 className="text-5xl font-black text-gray-900 tracking-tight mb-2">{stat.value}</h3>
                <p className="text-[#0b6d4b] font-black uppercase tracking-widest text-[14px]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-[#0b6d4b] rounded-[2rem] p-10 lg:p-16 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-[60px] opacity-20"></div>
          
          <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
              Everything you need, built natively.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto relative z-10">
            {feature.benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-4 group bg-white/10 p-5 rounded-2xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">
                <div className="mt-0.5 shrink-0 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#0b6d4b]" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-[17px] mb-1">{benefit}</h4>
                  <p className="text-emerald-100/80 text-[14px] leading-relaxed font-medium">Engineered for maximum reliability and ease of use.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        {feature.faqs && feature.faqs.length > 0 && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-3">
              {feature.faqs.map((faq, idx) => (
                <div key={idx} className={`border-2 ${openFaq === idx ? 'border-[#0b6d4b] shadow-md bg-[#f8fbf9]' : 'border-gray-200 bg-white'} rounded-2xl overflow-hidden transition-all duration-200`}>
                  <button
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <span className={`font-bold text-[16px] pr-8 ${openFaq === idx ? 'text-[#0b6d4b]' : 'text-gray-900'}`}>{faq.question}</span>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaq === idx ? 'bg-[#0b6d4b] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-60 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-gray-700 text-[15px] leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FeatureDetail;
