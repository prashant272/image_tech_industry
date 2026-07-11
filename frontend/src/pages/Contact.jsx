import React, { useEffect, useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, Calendar, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', society: '', email: '', phone: '', flats: '', subject: '', message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert("Thanks for your message! We'll get back to you soon.");
    setFormData({ name: '', society: '', email: '', phone: '', flats: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: MapPin, title: 'Office', details: ['Prime Impact Solutions', 'India'] },
    { icon: Mail, title: 'Email', details: ['support@societymates.com'] },
    { icon: Phone, title: 'Phone', details: ['+91 XXXXXXXXXX'] },
    { icon: Clock, title: 'Business Hours', details: ['Monday – Saturday', '9:00 AM – 6:00 PM (IST)'] }
  ];

  const demoFeatures = [
    'Visitor & Gate Management', 'Billing & Accounting', 'Complaint Management',
    'Resident Communication', 'QR Visitor Entry', 'Staff & Security Management'
  ];

  const faqs = [
    { q: "How quickly will someone contact me?", a: "Our team usually responds within one business day." },
    { q: "Is the demo free?", a: "Yes. We offer a personalized demo to help you understand how SocietyMates can fit your community's needs." },
    { q: "Do you offer onboarding support?", a: "Absolutely. Our team assists with setup, onboarding, and training to ensure a smooth transition." },
    { q: "Can SocietyMates be customized?", a: "Yes. We can discuss customization options based on your society's specific requirements." }
  ];

  return (
    <div className="pt-20 pb-16 bg-[#f4f7f5] min-h-screen text-slate-900 animate-[fadeIn_0.5s_ease-out] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#e6f5ef] to-transparent rounded-full blur-[100px] opacity-80 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Premium Hero Section */}
        <div className="relative z-10 pt-16 pb-20 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0b6d4b] text-[13px] font-black tracking-widest uppercase mb-8 border border-[#0b6d4b]/10 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0b6d4b] animate-pulse"></span>
            Get in Touch
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1.05] mb-8">
            Let's Discuss Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b6d4b] to-[#1cd78d]">Community Needs.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-bold max-w-3xl mx-auto">
            Have questions about SocietyMates? Whether you're exploring the platform, looking for a demo, or need assistance, our team is here to help.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24 max-w-7xl mx-auto">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-sm hover:border-[#0b6d4b] hover:-translate-y-1 transition-all duration-300 group flex items-start gap-6">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-200 group-hover:bg-[#0b6d4b] group-hover:border-[#0b6d4b] transition-all duration-300 shadow-sm">
                    <Icon size={26} className="text-[#0b6d4b] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-black mb-2">{info.title}</h3>
                    {info.details.map((line, i) => (
                      <p key={i} className="text-gray-600 font-bold leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white p-10 md:p-14 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0b6d4b] to-[#1cd78d]"></div>
            
            <h2 className="text-3xl font-black text-black mb-4 tracking-tight">Send Us a Message</h2>
            <p className="text-gray-600 font-bold mb-10 text-[16px]">Have a question or want to schedule a demo? Fill out the form below, and we'll get back to you as soon as possible.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest ml-1">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-[15px] font-semibold text-gray-900 focus:outline-none focus:border-[#0b6d4b] focus:bg-white transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest ml-1">Society Name</label>
                  <input required type="text" name="society" value={formData.society} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-[15px] font-semibold text-gray-900 focus:outline-none focus:border-[#0b6d4b] focus:bg-white transition-colors" placeholder="Green Valley Apartments" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest ml-1">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-[15px] font-semibold text-gray-900 focus:outline-none focus:border-[#0b6d4b] focus:bg-white transition-colors" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest ml-1">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-[15px] font-semibold text-gray-900 focus:outline-none focus:border-[#0b6d4b] focus:bg-white transition-colors" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest ml-1">Number of Flats (Optional)</label>
                  <input type="text" name="flats" value={formData.flats} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-[15px] font-semibold text-gray-900 focus:outline-none focus:border-[#0b6d4b] focus:bg-white transition-colors" placeholder="e.g. 150" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest ml-1">Subject</label>
                  <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-[15px] font-semibold text-gray-900 focus:outline-none focus:border-[#0b6d4b] focus:bg-white transition-colors" placeholder="How can we help?" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest ml-1">Message</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-[15px] font-semibold text-gray-900 focus:outline-none focus:border-[#0b6d4b] focus:bg-white transition-colors resize-none" placeholder="Tell us more about your requirements..."></textarea>
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#0b6d4b] text-white px-8 py-5 rounded-xl font-black text-[16px] transition-all hover:bg-[#09573c] hover:shadow-[0_10px_20px_rgba(11,109,75,0.2)] hover:-translate-y-1">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

        </div>

        {/* Request Demo Banner */}
        <div className="bg-[#0b6d4b] rounded-[3rem] p-12 md:p-16 border-4 border-white shadow-[0_30px_60px_rgba(11,109,75,0.2)] max-w-6xl mx-auto mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px] opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">Request a Personalized Demo</h2>
            <p className="text-xl text-green-100 font-bold leading-relaxed mb-8">
              See how SocietyMates can simplify your society's day-to-day operations. We'll walk you through features like:
            </p>
            <button className="hidden lg:inline-flex items-center gap-3 px-10 py-5 bg-white text-[#0b6d4b] rounded-2xl font-black text-[17px] transition-all shadow-xl hover:scale-105 hover:bg-gray-50">
              <Calendar size={20} /> Book a Free Demo
            </button>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {demoFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl">
                <CheckCircle2 size={18} className="text-[#1cd78d] shrink-0" />
                <span className="text-white font-bold text-[14.5px] leading-tight">{feat}</span>
              </div>
            ))}
            <button className="lg:hidden w-full mt-6 flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#0b6d4b] rounded-xl font-black text-[16px] transition-all shadow-xl hover:scale-105">
              <Calendar size={18} /> Book a Free Demo
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black mb-4 tracking-tight">Frequently Asked</h2>
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

        {/* Final CTA */}
        <div className="text-center max-w-3xl mx-auto pb-10">
          <h2 className="text-4xl font-black text-black mb-6 tracking-tight">Let's Build Smarter Communities Together</h2>
          <p className="text-lg text-gray-600 font-bold leading-relaxed mb-10">
            Whether you're managing a small apartment complex or a large gated community, we'd love to show you how SocietyMates can make everyday operations simpler, safer, and more efficient.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 rounded-full border border-gray-200">
            <span className="text-gray-900 font-black text-[15px]">Ready to get started?</span>
            <span className="text-gray-500 font-bold">Contact us today and schedule your free demo.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
