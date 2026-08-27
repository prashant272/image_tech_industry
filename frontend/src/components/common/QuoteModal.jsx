import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';

export default function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', subject: '', message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-quote-modal', handleOpen);
    return () => window.removeEventListener('open-quote-modal', handleOpen);
  }, []);

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
        alert("Thanks for your inquiry! We'll get back to you with a quote soon.");
        setFormData({ name: '', company: '', email: '', phone: '', subject: '', message: '' });
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      ></div>
      
      <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f172a] to-blue-900 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-white tracking-tight">Request a Quote</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[12px] font-black text-gray-700 uppercase tracking-widest ml-1">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-[14px] font-bold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors" placeholder="Full Name" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-black text-gray-700 uppercase tracking-widest ml-1">Company Name</label>
                <input required type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-[14px] font-bold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors" placeholder="Company Name" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[12px] font-black text-gray-700 uppercase tracking-widest ml-1">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-[14px] font-bold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors" placeholder="Email Address" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-black text-gray-700 uppercase tracking-widest ml-1">Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-[14px] font-bold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors" placeholder="Phone Number" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-black text-gray-700 uppercase tracking-widest ml-1">Subject</label>
              <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-[14px] font-bold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors" placeholder="Inquiry about Doctor Blades" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-black text-gray-700 uppercase tracking-widest ml-1">Message</label>
              <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-[14px] font-bold text-gray-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors resize-none" placeholder="Please provide details about your machinery or specific requirements..."></textarea>
            </div>

            <button disabled={isSubmitting} type="submit" className={`w-full flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl font-black text-[15px] transition-all mt-2 ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}>
              <Send size={18} /> {isSubmitting ? 'Sending...' : 'Request Quote'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
