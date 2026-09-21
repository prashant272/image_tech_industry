import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2, Settings, Shield, Truck, PhoneCall,
  MapPin, Plus, Minus, ArrowRight, Award, Clock,
  User, Building2, Package, ShieldCheck, Send, ChevronDown,
  Users, Maximize, Headset, Gem
} from 'lucide-react';
import apiClient from '../api/client';
import QuoteModal from '../components/common/QuoteModal';
import { useLocationContext } from '../context/LocationContext';

// Helper to get a cyclic icon for dynamic lists
const getIcon = (index) => {
  const icons = [
    <Shield className="w-5 h-5" />,
    <Settings className="w-5 h-5" />,
    <CheckCircle2 className="w-5 h-5" />,
    <Truck className="w-5 h-5" />,
    <Award className="w-5 h-5" />
  ];
  return icons[index % icons.length];
};

export default function CustomDetails() {
  const { slug } = useParams();
  const { cityName, stateName } = useLocationContext();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Helper function to replace {city} and {state} with actual values
  const replacePlaceholders = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/{city}/gi, cityName).replace(/{state}/gi, stateName);
  };

  // Quote Form State
  const [formData, setFormData] = useState({
    name: '', company: '', phone: '', city: '', subject: '', message: '', website: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuoteChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Map 'city' to 'email' field or append it to message since the backend schema might not have 'city'
      const submitData = {
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        email: 'N/A', // Bypassing email as it's not in the new design
        subject: formData.subject || 'Custom Quote Request',
        message: `City: ${formData.city}\n\nRequirement: ${formData.message}`,
        website: formData.website
      };

      const res = await apiClient.post('/enquiry/submit', submitData);
      if (res.data.success) {
        alert("Thanks for your inquiry! We'll get back to you with a quote soon.");
        setFormData({ name: '', company: '', phone: '', city: '', subject: '', message: '', website: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/custom-pages/${slug}`);
        setPage(response.data);
      } catch (error) {
        console.error('Error fetching custom page:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, [slug]);

  if (loading) {
    return <div className="pt-32 pb-20 text-center min-h-screen text-xl font-bold">Loading...</div>;
  }

  if (!page) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Page not found</h2>
        <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  // Highlight the last word in orange for the title
  const renderTitle = (title) => {
    const words = title.split(' ');
    if (words.length <= 1) return title;
    const lastWord = words.pop();
    return (
      <>
        {words.join(' ')} <span className="text-[#f97316]">{lastWord}</span>
      </>
    );
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <title>{replacePlaceholders(page.seoTitle || page.title)}</title>
      <meta name="description" content={replacePlaceholders(page.seoDescription || page.subtitle)} />
      {page.seoKeywords && <meta name="keywords" content={replacePlaceholders(page.seoKeywords)} />}

      {/* Hero Section */}
      <div className="relative overflow-hidden text-gray-900 pt-16 pb-2 lg:pt-28 lg:pb-16 px-3 sm:px-6 lg:px-8 bg-white">
        
        {/* Background (Desktop) */}
        <div 
          className="hidden lg:block absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.85) 45%, rgba(255, 255, 255, 0) 65%), url('${page.heroImage || '/images/hero-slide-1.jpg'}')`,
            backgroundSize: 'contain',
            backgroundPosition: 'right 70%',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Background (Mobile) */}
        <div 
          className="block lg:hidden absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 45%, rgba(255, 255, 255, 0) 60%), url('${page.heroImage || '/images/hero-slide-1.jpg'}')`,
            backgroundSize: 'cover',
            backgroundPosition: '55% center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 text-[12px] font-medium text-gray-500 mb-3 tracking-wide">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>›</span>
            <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
            <span>›</span>
            <Link to={`/${cityName.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-blue-600 transition-colors">{cityName}</Link>
            <span>›</span>
            <span className="text-gray-900 font-bold">{replacePlaceholders(page.title)}</span>
          </div>

          <div className="flex flex-row gap-1 lg:gap-12 items-start lg:items-center relative min-h-[260px] sm:min-h-[300px] lg:min-h-[400px]">

            {/* Left Content */}
            <div className="w-[50%] sm:w-[45%] lg:w-[55%] relative z-10 pt-4 lg:pt-0 flex flex-col justify-start h-full">
              <div className="flex items-center gap-1.5 lg:gap-4 mb-1.5 lg:mb-3">
                <div className="w-4 lg:w-8 h-[2px] bg-[#f97316]"></div>
                <span className="text-[#f97316] text-[7px] sm:text-[9px] lg:text-[11px] font-black tracking-widest uppercase">
                  PREMIUM QUALITY. RELIABLE PERFORMANCE.
                </span>
              </div>

              <h1 className="text-[16px] leading-[1.1] sm:text-[22px] lg:text-5xl xl:text-[52px] font-black mb-1.5 lg:mb-3 tracking-tight text-[#0b1221] text-balance">
                {renderTitle(replacePlaceholders(page.title))}
              </h1>

              <p className="text-[9px] sm:text-[11px] lg:text-[17px] text-gray-700 font-semibold mb-3 lg:mb-8 max-w-xl leading-snug line-clamp-3 sm:line-clamp-4 lg:line-clamp-none pr-2">
                {replacePlaceholders(page.subtitle)}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-start lg:items-center gap-2 lg:gap-5 w-full">
                <button
                  onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
                  className="bg-[#f97316] hover:bg-orange-600 text-white px-3 sm:px-4 lg:px-8 py-1.5 sm:py-2 lg:py-3.5 rounded lg:rounded-md font-bold text-[9px] sm:text-[11px] lg:text-[15px] transition-colors shadow-lg lg:shadow-xl flex items-center gap-1 lg:gap-2"
                >
                  Get Best Price <ArrowRight className="w-2.5 h-2.5 lg:w-4 lg:h-4" />
                </button>
                <a
                  href="tel:+918448336036"
                  className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-3 sm:px-4 lg:px-8 py-1.5 sm:py-2 lg:py-3.5 rounded lg:rounded-md font-bold text-[9px] sm:text-[11px] lg:text-[15px] transition-colors flex items-center gap-1 lg:gap-2 shadow-sm"
                >
                  <PhoneCall className="w-2.5 h-2.5 lg:w-4 lg:h-4" />
                  Talk to Our Expert
                </a>
              </div>
            </div>

            {/* Right Side Empty space for image */}
            <div className="w-[35%] lg:w-[45%]"></div>
          </div>
        </div>
      </div>

      {/* Premium Feature Stats Strip */}
      <div className="bg-white border-y border-gray-100 py-6 lg:py-10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] relative z-20">
        <div className="max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-5 lg:flex lg:flex-nowrap items-start lg:items-center justify-between gap-1 lg:gap-2 xl:gap-6 w-full">
            
            <div className="flex flex-col items-center justify-start lg:justify-center flex-1 p-1 lg:p-6 rounded-2xl hover:bg-[#f8fafd] transition-all duration-300 group cursor-pointer border border-transparent hover:border-blue-100/50">
              <div className="w-8 h-8 lg:w-14 lg:h-14 mb-2 lg:mb-4 rounded-xl lg:rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-blue-500/30 transform group-hover:-translate-y-1">
                <Gem className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
              <span className="text-[9px] sm:text-[10px] lg:text-[14.5px] font-bold text-[#0b1221] leading-tight text-center">High Quality<br />Carbon Steel</span>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-[1px] h-12 bg-gray-200 shrink-0"></div>

            <div className="flex flex-col items-center justify-start lg:justify-center flex-1 p-1 lg:p-6 rounded-2xl hover:bg-[#f8fafd] transition-all duration-300 group cursor-pointer border border-transparent hover:border-blue-100/50">
              <div className="w-8 h-8 lg:w-14 lg:h-14 mb-2 lg:mb-4 rounded-xl lg:rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-blue-500/30 transform group-hover:-translate-y-1">
                <Settings className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
              <span className="text-[9px] sm:text-[10px] lg:text-[14.5px] font-bold text-[#0b1221] leading-tight text-center">Precise & Uniform<br />Wiping</span>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-[1px] h-12 bg-gray-200 shrink-0"></div>

            <div className="flex flex-col items-center justify-start lg:justify-center flex-1 p-1 lg:p-6 rounded-2xl hover:bg-[#f8fafd] transition-all duration-300 group cursor-pointer border border-transparent hover:border-blue-100/50">
              <div className="w-8 h-8 lg:w-14 lg:h-14 mb-2 lg:mb-4 rounded-xl lg:rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-blue-500/30 transform group-hover:-translate-y-1">
                <ShieldCheck className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
              <span className="text-[9px] sm:text-[10px] lg:text-[14.5px] font-bold text-[#0b1221] leading-tight text-center">Longer<br />Blade Life</span>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-[1px] h-12 bg-gray-200 shrink-0"></div>

            <div className="flex flex-col items-center justify-start lg:justify-center flex-1 p-1 lg:p-6 rounded-2xl hover:bg-[#f8fafd] transition-all duration-300 group cursor-pointer border border-transparent hover:border-blue-100/50">
              <div className="w-8 h-8 lg:w-14 lg:h-14 mb-2 lg:mb-4 rounded-xl lg:rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-blue-500/30 transform group-hover:-translate-y-1">
                <Truck className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
              <span className="text-[9px] sm:text-[10px] lg:text-[14.5px] font-bold text-[#0b1221] leading-tight text-center">Pan India<br />Supply</span>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-[1px] h-12 bg-gray-200 shrink-0"></div>

            <div className="flex flex-col items-center justify-start lg:justify-center flex-1 p-1 lg:p-6 rounded-2xl hover:bg-[#f8fafd] transition-all duration-300 group cursor-pointer border border-transparent hover:border-blue-100/50">
              <div className="w-8 h-8 lg:w-14 lg:h-14 mb-2 lg:mb-4 rounded-xl lg:rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-blue-500/30 transform group-hover:-translate-y-1">
                <Headset className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
              <span className="text-[9px] sm:text-[10px] lg:text-[14.5px] font-bold text-[#0b1221] leading-tight text-center">Expert<br />Technical Support</span>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-12 lg:pb-24">
        {/* Section 2 */}
        
        {/* Mobile Section 2 (Matches Mockup) */}
        <div className="flex lg:hidden flex-col gap-5">
          {/* Top Row: Text + Image */}
          <div className="flex flex-row gap-4 items-stretch">
            {/* Left Text */}
            <div className="w-[55%] flex flex-col justify-center py-2">
              <span className="text-[#f97316] text-[8px] sm:text-[9px] font-black tracking-widest uppercase mb-1 block">
                WHY CHOOSE IMAGETECH?
              </span>
              <h2 className="text-[15px] sm:text-[18px] leading-[1.2] font-black text-gray-900 mb-2">
                {replacePlaceholders(page.section2Title)}
              </h2>
              <p className="text-[9px] sm:text-[11px] text-gray-600 font-medium leading-snug mb-3">
                {replacePlaceholders(page.section2Description)}
              </p>
              <button
                onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
                className="self-start bg-[#f97316] hover:bg-orange-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-[9px] sm:text-[11px] font-bold transition-colors shadow-sm flex items-center gap-1 mt-auto"
              >
                Know More <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            </div>
            
            {/* Right Image */}
            <div className="w-[45%] h-auto">
              <img 
                src={page.heroImage || 'https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/placeholder.png'} 
                alt={page.section2Title || "About"} 
                className="w-full h-full object-cover object-[60%_center] rounded-xl shadow-sm" 
              />
            </div>
          </div>

          {/* Bottom Row: Bullets in Blue Box */}
          <div className="bg-[#f8fafd] border border-blue-50 rounded-xl p-4">
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {page.section2Bullets?.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-1.5 sm:gap-2">
                  <div className="mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#f97316]" />
                  </div>
                  <span className="text-[9px] sm:text-[11px] font-bold text-gray-800 leading-tight">{replacePlaceholders(bullet)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop Section 2 */}
        <div className="hidden lg:flex flex-row gap-16 items-start relative">
          <div className="w-1/2 relative rounded-2xl overflow-hidden bg-gray-100 sticky top-28">
            <img src={page.heroImage || 'https://pub-2343d84e533742e08719e1d3d8c0a3d6.r2.dev/placeholder.png'} alt={page.section2Title || "About"} className="w-full h-[450px] object-cover object-right" />
            <div className="absolute bottom-6 left-6 bg-[#0f172a] text-white p-4 rounded-xl flex items-center gap-4 shadow-xl">
              <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[12px] text-gray-300 font-bold uppercase tracking-wider">Consistent</p>
                <p className="font-bold text-[16px]">Coating Quality</p>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <span className="text-[#f97316] text-[11px] font-black tracking-widest uppercase mb-2 block">
              WHY CHOOSE IMAGETECH?
            </span>
            <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
              {replacePlaceholders(page.section2Title)}
            </h2>
            <p className="text-[15px] text-gray-600 font-medium leading-relaxed mb-8">
              {replacePlaceholders(page.section2Description)}
            </p>

            <button
              onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
              className="bg-[#f97316] hover:bg-orange-600 text-white px-6 py-2.5 rounded-md font-bold text-[14px] transition-colors shadow-lg flex items-center gap-2 mb-8"
            >
              Know More <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex flex-row gap-8">
              <ul className="flex flex-col space-y-4 flex-1">
                {page.section2Bullets?.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#f97316]" />
                    </div>
                    <span className="text-[14.5px] font-bold text-gray-800 leading-tight">{replacePlaceholders(bullet)}</span>
                  </li>
                ))}
              </ul>

              {/* Map Card */}
              {page.section2Locations?.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 shrink-0 min-w-[200px]">
                  <h4 className="font-bold text-gray-900 mb-4 text-sm">Service Locations</h4>
                  <div className="space-y-4">
                    {page.section2Locations.map((loc, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[#f97316] shrink-0" />
                        <div>
                          <p className="font-bold text-[14px] text-gray-900 leading-none mb-1">{replacePlaceholders(loc)}</p>
                          <p className="text-[11px] font-bold text-gray-500">Fast Supply</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Banner (Full Width) */}
      <div className="bg-[#f8f9fa] border-y border-gray-100 py-12 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Premium Quality', desc: 'Strict quality control for consistent performance', icon: Award },
              { title: 'Custom Solutions', desc: 'Tailored to your machine & application', icon: Settings },
              { title: 'On-Time Delivery', desc: 'Across Delhi, Darbhanga & India', icon: Truck },
              { title: 'Expert Guidance', desc: 'From selection to installation', icon: PhoneCall },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white shadow-sm border border-gray-100 text-[#0f172a] rounded-full flex items-center justify-center shrink-0">
                  <f.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-[15px] mb-1">{f.title}</h4>
                  <p className="text-[12px] font-medium text-gray-500 leading-tight">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        {/* City & Quote Section */}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row items-stretch">
          {/* Left Text */}
          <div className="w-full lg:w-[45%] p-8 lg:p-12 relative bg-gray-50 flex flex-col justify-center">
            {/* Soft background pattern or image can go here */}
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6 leading-tight">
                {replacePlaceholders(page.citySectionTitle)}
              </h2>
              <p className="text-gray-600 font-medium leading-relaxed mb-8 text-[15px]">
                {replacePlaceholders(page.citySectionDescription)}
              </p>
              <button
                onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
                className="bg-[#f97316] hover:bg-orange-600 text-white px-8 py-3.5 rounded font-bold text-[14px] transition-colors shadow-lg"
              >
                Enquire Now →
              </button>
            </div>
          </div>
          {/* Right Form */}
          <div className="w-full lg:w-[55%] bg-white p-8 lg:p-12 relative flex flex-col justify-center shrink-0">
            <div className="mb-6 pr-12">
              <div className="flex items-center gap-2 text-orange-600 font-black text-[10px] tracking-widest uppercase mb-1.5">
                <div className="w-6 h-0.5 bg-orange-600"></div>
                Request a Quote
              </div>
              <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Get Your <span className="text-orange-500">Custom</span> Quote
              </h2>
              <p className="text-slate-500 font-medium text-sm mt-1.5">Fill out the details below and our team will contact you shortly.</p>
            </div>

            <form onSubmit={handleQuoteSubmit} className="space-y-4 flex flex-col">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                    <User size={14} className="text-slate-400" /> Full Name <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User size={16} />
                    </div>
                    <input required type="text" name="name" value={formData.name} onChange={handleQuoteChange} className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-[14px] font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400" placeholder="Enter your full name" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                    <Building2 size={14} className="text-slate-400" /> Company Name <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Building2 size={16} />
                    </div>
                    <input required type="text" name="company" value={formData.company} onChange={handleQuoteChange} className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-[14px] font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400" placeholder="Enter company name" />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                    <MapPin size={14} className="text-slate-400" /> City <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <MapPin size={16} />
                    </div>
                    <input required type="text" name="city" value={formData.city} onChange={handleQuoteChange} className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-[14px] font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400" placeholder="Your City" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                    <PhoneCall size={14} className="text-slate-400" /> Phone Number <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <span className="font-bold text-[13px] text-gray-500 mr-1">+91</span>
                    </div>
                    <input required type="tel" name="phone" pattern="[0-9\+\-\s\(\)]{7,20}" title="Please enter a valid phone number" value={formData.phone} onChange={handleQuoteChange} className="w-full bg-white border border-slate-200 rounded-xl pl-[3.2rem] pr-4 py-2.5 text-[14px] font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400" placeholder="98765 43210" />
                  </div>
                </div>
              </div>

              {/* Row 3 - Dropdown */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                  <Package size={14} className="text-slate-400" /> Product / Requirement <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <select required name="subject" value={formData.subject} onChange={handleQuoteChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all appearance-none cursor-pointer">
                    <option value="" disabled className="text-slate-400">Select product or requirement</option>
                    <option value="Gravure Printing">Gravure Printing</option>
                    <option value="Flexographic Printing">Flexographic Printing</option>
                    <option value="Coating Machines">Coating Machines</option>
                    <option value="Other Requirements">Other Requirements</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Row 4 */}
              <div className="space-y-1.5 flex-1">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                  <Settings size={14} className="text-slate-400" /> Additional Details <span className="text-orange-500">*</span>
                </label>
                <textarea name="message" value={formData.message} onChange={handleQuoteChange} rows={2} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[14px] font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all resize-none placeholder-slate-400 h-[60px]" placeholder="Please share any specific requirements..."></textarea>
              </div>

              {/* Honeypot Field */}
              <input type="text" name="website" value={formData.website} onChange={handleQuoteChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

              {/* Footer / Submit */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-2">
                <div className="flex items-start gap-2 text-slate-500">
                  <ShieldCheck size={18} className="shrink-0 mt-0.5 text-slate-400" />
                  <p className="text-[10px] leading-tight">
                    Your information is secure with us<br />and will never be shared.
                  </p>
                </div>
                <button disabled={isSubmitting} type="submit" className={`w-full sm:w-auto flex items-center justify-center gap-2 text-white px-8 py-2.5 rounded-full font-bold text-[14px] tracking-wide transition-all shadow-md ${isSubmitting ? 'bg-orange-400 cursor-not-allowed shadow-none' : 'bg-orange-500 hover:bg-orange-600 hover:shadow-orange-500/40 hover:-translate-y-0.5'}`}>
                  {isSubmitting ? 'SUBMITTING...' : 'Request Quote'} <Send size={16} className={isSubmitting ? '' : 'ml-1'} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQs */}
        {page.faqs && page.faqs.length > 0 && (
          <div className="max-w-5xl mx-auto pt-16">
            <div className="text-center mb-12">
              <span className="text-[#f97316] text-[11px] font-black tracking-widest uppercase mb-2 block">
                GOT QUESTIONS?
              </span>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 font-medium text-[15px] max-w-2xl mx-auto">
                Get answers to common questions about our products and services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-start">
              {page.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 lg:p-6 text-left focus:outline-none group bg-white hover:bg-gray-50"
                  >
                    <span className="font-bold text-[14px] lg:text-[15px] text-gray-900 group-hover:text-blue-600 transition-colors pr-4">
                      {replacePlaceholders(faq.question)}
                    </span>
                    <div className="shrink-0 text-gray-400 group-hover:text-blue-600 transition-colors">
                      {openFaqIndex === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openFaqIndex === idx ? 'max-h-[300px] pb-6 px-6 opacity-100 bg-white' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-[13.5px] lg:text-[14px] font-medium text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {replacePlaceholders(faq.answer)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 px-8 py-3 rounded-full font-bold text-[14px] transition-all shadow-sm">
                View All FAQs →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer Banner */}
      <div className="bg-[#0f172a] border-t border-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black mb-2">{replacePlaceholders(page.ctaTitle) || 'Looking for the Right Doctor Blade for Your Business?'}</h3>
            <p className="text-gray-400 font-medium">{replacePlaceholders(page.ctaDescription) || 'Get in touch with our experts for the best pricing, technical support and customized solutions.'}</p>
          </div>
          <button
            onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
            className="bg-[#f97316] hover:bg-orange-600 text-white px-8 py-3.5 rounded font-bold text-[14px] transition-colors whitespace-nowrap shadow-lg shrink-0"
          >
            Get a Quote Now →
          </button>
        </div>
      </div>
    </div>
  );
}
