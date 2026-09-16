import React, { useState, useEffect } from 'react';
import { X, User, Building2, Mail, Phone, Package, FileText, ShieldCheck, Send, CheckCircle2, Users, Truck, Globe, ChevronDown } from 'lucide-react';

export default function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', subject: '', message: '', website: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-quote-modal', handleOpen);

    // Automatic Popup Logic for Lead Generation
    let timer1, timer2, timer3;
    let hasTriggeredScroll = false;
    
    const handleScroll = () => {
      if (!hasTriggeredScroll && window.scrollY > 300) {
        if (localStorage.getItem('quoteSubmitted') !== 'true') {
          setIsOpen(true);
          hasTriggeredScroll = true;
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    // Only trigger if they haven't submitted the quote form already
    if (localStorage.getItem('quoteSubmitted') !== 'true') {
      // Trigger when user scrolls down
      window.addEventListener('scroll', handleScroll);

      // Show at 5 seconds
      timer1 = setTimeout(() => {
        if (localStorage.getItem('quoteSubmitted') !== 'true') setIsOpen(true);
      }, 5 * 1000);
      
      // Show again at 2 minutes (120 seconds)
      timer2 = setTimeout(() => {
        if (localStorage.getItem('quoteSubmitted') !== 'true') setIsOpen(true);
      }, 120 * 1000);

      // Show again at 5 minutes (300 seconds)
      timer3 = setTimeout(() => {
        if (localStorage.getItem('quoteSubmitted') !== 'true') setIsOpen(true);
      }, 300 * 1000);
    }

    return () => {
      window.removeEventListener('open-quote-modal', handleOpen);
      window.removeEventListener('scroll', handleScroll);
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
      if (timer3) clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const apiClient = (await import('../../api/client')).default;
      const res = await apiClient.post('/enquiry/submit', formData);
      if (res.data.success) {
        localStorage.setItem('quoteSubmitted', 'true');
        alert("Thanks for your inquiry! We'll get back to you with a quote soon.");
        setFormData({ name: '', company: '', email: '', phone: '', subject: '', message: '', website: '' });
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-[1050px] bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden animate-[scaleUp_0.3s_ease-out] flex flex-col md:flex-row max-h-[95vh] md:max-h-[85vh] overflow-y-auto md:overflow-hidden">
        
        {/* Global Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-600 md:text-slate-400 hover:text-slate-800 bg-white/80 md:bg-slate-50 hover:bg-white md:hover:bg-slate-100 p-2.5 rounded-full transition-colors z-[110] shadow-sm md:shadow-none backdrop-blur-sm md:backdrop-blur-none"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image Branding Panel */}
        <div className="flex w-full md:w-[55%] relative flex-col justify-between overflow-hidden bg-white shrink-0 min-h-[380px] md:min-h-0 pt-2 md:pt-0">
          {/* Background Image Container */}
          <div className="absolute top-0 right-0 w-full h-full md:h-[calc(100%-72px)] z-0">
            <div 
              className="w-full h-full bg-right-bottom md:bg-right bg-no-repeat bg-[length:150%_auto] md:bg-[length:auto_100%]"
              style={{ backgroundImage: 'url(/images/popup-bg.jpg)' }}
            ></div>
            {/* Soft White Fade (Desktop only) */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent w-[60%]"></div>
          </div>

          {/* Top Content Area */}
          <div className="relative z-20 px-6 md:px-8 pt-2 md:pt-8 flex-1 flex flex-col">
            {/* Logo */}
            <div className="hidden md:flex items-center gap-3 mb-6">
              <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
              <div className="text-[9px] text-slate-500 font-bold leading-tight border-l-2 border-slate-300 pl-3 uppercase tracking-wider">
                Precision Solutions<br />For Printing Industry
              </div>
            </div>

            {/* Heading - Responsive 2 lines on mobile, 4 on desktop */}
            <h2 className="hidden md:block text-[22px] sm:text-[26px] leading-[1.2] md:text-3xl lg:text-4xl font-black mb-2 md:mb-3 tracking-tight md:leading-[1.1] text-slate-800 drop-shadow-sm w-[90%] md:w-auto md:max-w-[50%] z-20 relative">
              <span className="inline md:hidden">Quality Tools for a <span className="text-orange-500">Sharper</span><br/></span>
              <span className="hidden md:inline">Quality Tools<br />for a <span className="text-orange-500">Sharper<br /></span></span>
              <span className="text-orange-500">Print Tomorrow</span>
            </h2>

            {/* Line separator */}
            <div className="hidden md:block w-12 h-1 bg-orange-500 mb-4 rounded-full z-20 relative"></div>

            {/* Description */}
            <p className="hidden md:block text-[11px] lg:text-xs text-slate-600 leading-relaxed font-bold max-w-[85%] md:max-w-[45%] mb-6 md:mb-8 z-20 relative">
              From consumables to testing instruments, we support your printing & packaging process with reliable solutions.
            </p>

            {/* Horizontal Features */}
            <div className="hidden md:flex gap-6 justify-center md:justify-start pb-8 md:pb-0 relative z-20">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center mb-1.5 bg-white shadow-sm text-orange-500">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-[9px] font-bold text-slate-700 leading-tight">Premium<br />Quality</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center mb-1.5 bg-white shadow-sm text-orange-500">
                  <Users size={20} />
                </div>
                <span className="text-[9px] font-bold text-slate-700 leading-tight">Technical<br />Support</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center mb-1.5 bg-white shadow-sm text-orange-500">
                  <Truck size={20} />
                </div>
                <span className="text-[9px] font-bold text-slate-700 leading-tight">Pan-India<br />Delivery</span>
              </div>
            </div>
          </div>

          {/* Bottom Stats Banner - Hidden on mobile */}
          <div className="hidden md:flex relative z-20 bg-[#1e293b] w-full h-[72px] px-2 items-center justify-between border-t-[3px] border-orange-500">
            <div className="flex-1 flex flex-col items-center gap-1 text-center">
              <FileText className="text-orange-400 w-4 h-4" />
              <div className="text-[8px] leading-tight font-bold text-white uppercase tracking-widest">Wide Product<br />Range</div>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1 text-center">
              <Building2 className="text-orange-400 w-4 h-4" />
              <div className="text-[8px] leading-tight font-bold text-white uppercase tracking-widest">Industry<br />Expertise</div>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1 text-center">
              <ShieldCheck className="text-orange-400 w-4 h-4" />
              <div className="text-[8px] leading-tight font-bold text-white uppercase tracking-widest">Trusted<br />by Printers</div>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1 text-center">
              <Users className="text-orange-400 w-4 h-4" />
              <div className="text-[8px] leading-tight font-bold text-white uppercase tracking-widest">Customer<br />Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="w-full md:w-[45%] bg-white p-6 md:p-8 relative flex flex-col shrink-0 md:shrink md:overflow-y-auto">

          <div className="mb-8 pr-12">
            <div className="flex items-center gap-2 text-orange-600 font-black text-[10px] tracking-widest uppercase mb-2">
              <div className="w-6 h-0.5 bg-orange-600"></div>
              Request a Quote
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Get Your <span className="text-orange-500">Custom</span> Quote
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-2">Fill out the details below and our team will contact you shortly.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">

            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                  <User size={14} className="text-slate-400" /> Full Name <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User size={16} />
                  </div>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-[14px] font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400" placeholder="Enter your full name" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                  <Building2 size={14} className="text-slate-400" /> Company Name <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 size={16} />
                  </div>
                  <input required type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-[14px] font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400" placeholder="Enter company name" />
                </div>
              </div>
            </div>

            {/* Honeypot Field */}
            <input type="text" name="website" value={formData.website} onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                  <Mail size={14} className="text-slate-400" /> Email Address <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail size={16} />
                  </div>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-[14px] font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400" placeholder="you@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                  <Phone size={14} className="text-slate-400" /> Phone Number <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone size={16} />
                  </div>
                  <input required type="tel" name="phone" pattern="[0-9\+\-\s\(\)]{7,20}" title="Please enter a valid phone number" value={formData.phone} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-[14px] font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400" placeholder="+91 98765 43210" />
                </div>
              </div>
            </div>

            {/* Row 3 - Dropdown */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                <Package size={14} className="text-slate-400" /> Product / Requirement <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <select required name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3.5 text-[14px] font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all appearance-none cursor-pointer">
                  <option value="" disabled className="text-slate-400">Select product or requirement</option>
                  <option value="Doctor Blades">Doctor Blades</option>
                  <option value="Viscosity Cups">Viscosity Cups</option>
                  <option value="Dyne Test Pens">Dyne Test Pens</option>
                  <option value="Industrial Stroboscopes">Industrial Stroboscopes</option>
                  <option value="Bar Coaters">Bar Coaters</option>
                  <option value="Other Requirements">Other Requirements</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="space-y-2 flex-1">
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                <FileText size={14} className="text-slate-400" /> Additional Details
              </label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-[14px] font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all resize-none placeholder-slate-400 h-[100px]" placeholder="Please share any specific requirements, quantity, application, etc."></textarea>
            </div>

            {/* Footer / Submit */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-2">
              <div className="flex items-start gap-2 text-slate-500">
                <ShieldCheck size={18} className="shrink-0 mt-0.5" />
                <p className="text-[10px] leading-snug">
                  Your information is secure with us<br />and will never be shared with third parties.
                </p>
              </div>
              <button disabled={isSubmitting} type="submit" className={`w-full sm:w-auto flex items-center justify-center gap-2 text-white px-8 py-3.5 rounded-full font-bold text-[15px] tracking-wide transition-all shadow-md ${isSubmitting ? 'bg-orange-400 cursor-not-allowed shadow-none' : 'bg-orange-500 hover:bg-orange-600 hover:shadow-orange-500/40 hover:-translate-y-0.5'}`}>
                {isSubmitting ? 'SUBMITTING...' : 'Request Quote'} <Send size={16} className={isSubmitting ? '' : 'ml-1'} />
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
