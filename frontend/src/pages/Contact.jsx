import React, { useEffect, useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, Calendar, CheckCircle2 } from 'lucide-react';
import CTA from '../components/home/CTA';
import { useLocationContext } from '../context/LocationContext';

export default function Contact() {
  const { cityName } = useLocationContext();
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', subject: '', message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Use dynamic import or existing apiClient if available.
      // We need to import apiClient at the top.
      const apiClient = (await import('../api/client')).default;
      const res = await apiClient.post('/enquiry/submit', formData);
      if (res.data.success) {
        alert("Thanks for your message! We'll get back to you soon.");
        setFormData({ name: '', company: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, title: 'Office', details: ['ImageTech Industries', `RZ-I-13, 2ND FLOOR, NANDA BLOCK, MAHAVIR ENCLAVE, ${cityName.toUpperCase()}-110045, INDIA.`] },
    { icon: Mail, title: 'Email', details: ['imagetechindustries@gmail.com', 'sales.imagetechindustries@gmail.com'] },
    { icon: Phone, title: 'Phone', details: ['+91 8448336036', '+91 8851016580', '+91 8448441345'] },
    { icon: Clock, title: 'Business Hours', details: ['Monday – Saturday', '9:00 AM – 6:00 PM (IST)'] }
  ];

  const faqs = [
    { q: "How quickly will someone contact me?", a: "Our team usually responds within one business day to discuss your industrial requirements." },
    { q: "Do you supply products outside India?", a: "We primarily operate across India, but please contact us for specific international shipping requests." },
    { q: "Can you manufacture custom sizes for Doctor Blades?", a: "Yes, we specialize in customizing the thickness, width, and lamella edges of Doctor Blades based on your specific machine requirements." },
    { q: "How do I request a formal quotation?", a: "You can fill out the form on this page or use the 'Get a Quote' button in the navigation bar to send us your detailed requirements." }
  ];

  return (
    <div className="pt-24 pb-0 bg-[#f8f9fa] min-h-screen text-slate-900 animate-[fadeIn_0.5s_ease-out] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-[100px] opacity-80 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Premium Hero Section */}
        <div className="relative z-10 pt-6 pb-16 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-blue-700 text-[13px] font-black tracking-widest uppercase mb-8 border border-blue-100 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            Get in Touch
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight leading-[1.1] mb-6">
            Let's Discuss Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Industrial Needs.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto">
            Whether you need a quote for our precision Doctor Blades, have technical queries about our testing equipment, or want to explore a partnership, our experts are ready to assist.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24 max-w-7xl mx-auto">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:border-blue-300 hover:shadow-lg transition-all duration-300 group flex items-start gap-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 shadow-sm">
                    <Icon size={26} className="text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">{info.title}</h3>
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
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-cyan-400"></div>
            
            <h2 className="text-3xl font-extrabold text-black mb-4 tracking-tight">Send Us a Message</h2>
            <p className="text-gray-600 font-bold mb-10 text-[16px]">Fill out the form below with your requirements, and our technical sales team will get back to you promptly.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest ml-1">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-[15px] font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest ml-1">Company Name</label>
                  <input required type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-[15px] font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors" placeholder="Acme Packaging Corp" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest ml-1">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-[15px] font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest ml-1">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-[15px] font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest ml-1">Subject</label>
                <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-[15px] font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors" placeholder="Inquiry about Doctor Blades" />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-black text-gray-700 uppercase tracking-widest ml-1">Message</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-[15px] font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors resize-none" placeholder="Please provide details about your machinery or specific requirements..."></textarea>
              </div>

              <button disabled={isSubmitting} type="submit" className={`w-full flex items-center justify-center gap-2 text-white px-8 py-5 rounded-xl font-black text-[16px] transition-all ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 hover:shadow-lg hover:-translate-y-1'}`}>
                <Send size={18} /> {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-[#0f172a] mb-4 tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-[0_5px_15px_rgba(0,0,0,0.02)] [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:border-blue-300 transition-colors">
                <summary className="flex items-center justify-between font-black text-black text-[17px]">
                  {faq.q}
                  <span className="ml-4 flex-shrink-0 bg-blue-50 border border-blue-100 rounded-full p-2 group-open:-rotate-180 group-open:bg-blue-600 group-open:border-blue-600 group-open:text-white transition-all duration-300 text-blue-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-5 text-gray-600 font-medium leading-relaxed text-[16px] pr-8">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
      
      <CTA />
    </div>
  );
}
