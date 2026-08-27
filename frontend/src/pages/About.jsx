import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, Award, ShieldCheck, MapPin, Shield,
  FileText, Repeat, Flashlight, Ruler, Activity, Droplet, Box,
  CheckCircle2, Eye, Target, Trophy, Handshake, Check
} from 'lucide-react';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      title: 'Doctor Blade - Wipox Brand',
      desc: 'High-performance doctor blades engineered for gravure and printing applications, ensuring smooth ink transfer and consistent print quality.',
      icon: FileText
    },
    {
      title: 'Ink Mixing Rollers',
      desc: 'Precision-manufactured rollers designed for efficient ink circulation and uniform mixing in printing processes.',
      icon: Repeat
    },
    {
      title: 'Stroboscopes',
      desc: 'Advanced LED and Xenon Flash Tube stroboscopes for accurate speed measurement, motion inspection, and production quality control.',
      icon: Flashlight
    },
    {
      title: 'Bar Coaters',
      desc: 'Laboratory coating instruments designed for uniform film application and testing of coatings, inks, paints, and related materials.',
      icon: Ruler
    },
    {
      title: 'GSM Cutters & Testing Instruments',
      desc: 'Reliable quality control instruments used for accurate material testing in fabric, paper, and other industries.',
      icon: Activity
    },
    {
      title: 'Dyne Test Pens - Magnet Brand',
      desc: 'Professional surface energy testing solutions used to measure surface tension and check surface treatment quality on films, plastics, and packaging materials.',
      icon: Droplet
    },
    {
      title: 'Flexible Packaging Industry Solutions',
      desc: 'Specialized products developed to support printing and packaging applications with improved efficiency and reliability.',
      icon: Box
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen text-black font-sans relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] opacity-70 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-yellow-50 rounded-full blur-[100px] opacity-50 -translate-x-1/2 pointer-events-none"></div>

      {/* 1. Hero Section */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative mb-24">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[14px] font-bold text-gray-500 mb-8 mt-4">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>›</span>
          <span className="text-blue-600">About Us</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:pr-10">
            <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight tracking-tight">
              About <br className="hidden md:block" />
              <span className="text-[#1e3a8a]">ImageTech Industries</span>
            </h1>
            <p className="text-[#1e3a8a] font-bold text-lg mb-8">
              Precision Engineering Solutions Since 1992
            </p>
            
            <p className="text-gray-700 font-medium text-[16px] leading-relaxed mb-6">
              ImageTech Industries is a Delhi-based manufacturing powerhouse dedicated to delivering reliable, innovative, and high-performance industrial solutions.
            </p>
            <p className="text-gray-700 font-medium text-[16px] leading-relaxed mb-12">
              With a strong foundation built over decades of engineering excellence, we design precision products that maximize productivity and accuracy.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-[#1e3a8a] mb-3">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="font-black text-xl text-black">1992</h4>
                <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">Established</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600 mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-black text-xl text-black">30+</h4>
                <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">Years of Experience</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-[#1e3a8a] mb-3">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-black text-xl text-black">Trusted</h4>
                <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">By Industries</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600 mb-3">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-black text-xl text-black">Made in India</h4>
                <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">With Pride</p>
              </div>
            </div>
          </div>

          {/* Right Image Layout */}
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl h-[400px] md:h-[500px] bg-gray-100 group border-4 border-white">
            <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <img 
              src="/images/about-hero.jpg" 
              alt="Factory Floor" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-xl flex items-center gap-4 z-20 border border-white/50">
               <div className="w-12 h-12 bg-[#1e3a8a] rounded-xl flex items-center justify-center text-white shrink-0 shadow-md">
                 <Shield className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="text-[#1e3a8a] font-black text-[17px] tracking-tight">Delivering Excellence</h4>
                 <p className="text-gray-600 text-[13px] font-bold">In Every Product We Manufacture</p>
               </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* 2. Our Product Expertise */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-black mb-4">Our Product Expertise</h2>
          <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 flex items-start gap-5 hover:shadow-[0_20px_40px_-15px_rgba(30,58,138,0.15)] hover:border-blue-100 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1/2 translate-x-1/2"></div>
                <div className="w-14 h-14 bg-blue-50/50 rounded-xl flex items-center justify-center text-[#1e3a8a] shrink-0 border border-blue-100/50 group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300 relative z-10">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="relative z-10">
                  <h3 className="font-black text-[17px] text-[#1e3a8a] mb-2">{item.title}</h3>
                  <p className="text-gray-600 font-semibold text-[14.5px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Manufacturing Strength & Industries We Serve */}
      <div className="bg-gray-50 py-20 mb-24">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left: Manufacturing Strength */}
            <div>
              <h2 className="text-3xl font-black text-[#1e3a8a] mb-6">Our Manufacturing Strength</h2>
              <p className="text-gray-700 font-medium text-[15px] leading-relaxed mb-6">
                At ImageTech Industries, we combine engineering expertise, manufacturing experience, and continuous improvement to create products that deliver dependable performance.
              </p>
              <p className="text-black font-bold text-[15px] mb-6">Our capabilities include:</p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Precision manufacturing',
                  'Application-based product development',
                  'Customized engineering solutions',
                  'Quality inspection at every stage',
                  'Reliable customer support'
                ].map((point, i) => (
                  <li key={i} className="flex items-center gap-3">
                     <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                       <CheckCircle2 className="w-3.5 h-3.5" />
                     </div>
                     <span className="text-gray-800 font-bold text-[15px]">{point}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-gray-700 font-medium text-[15px] leading-relaxed">
                Each product is designed with focus on <span className="text-[#1e3a8a] font-bold">accuracy, durability, and long-term industrial performance.</span>
              </p>
            </div>

            {/* Right: Industries We Serve */}
            <div className="bg-white border border-gray-100 rounded-2xl p-10 shadow-sm relative overflow-hidden">
              <h2 className="text-2xl font-black text-[#1e3a8a] mb-6 relative z-10">Industries We Serve</h2>
              <p className="text-gray-700 font-medium text-[15px] mb-6 relative z-10">Our solutions support:</p>
              
              <ul className="space-y-4 relative z-10">
                {[
                  'Flexible Packaging Industry',
                  'Gravure & Printing Industry',
                  'Textile Industry',
                  'Paper Industry',
                  'Plastic Film Industry',
                  'Laboratory & R&D Applications',
                  'Manufacturing & Quality Control Industries'
                ].map((point, i) => (
                  <li key={i} className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-yellow-500 shrink-0"></div>
                     <span className="text-gray-800 font-bold text-[15px]">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Decorative Factory Graphic */}
              <div className="absolute bottom-6 right-6 opacity-5 pointer-events-none w-48 h-48">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-black">
                   <path d="M2 20h20M4 20V8l6-4 6 4v12M16 12l6 3v5" />
                   <path d="M9 20v-6h2v6" />
                   <path d="M9 10h.01M13 10h.01" />
                 </svg>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. Quality Commitment */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-black mb-4">Quality Commitment</h2>
          <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <p className="text-gray-700 font-medium text-[15px] leading-relaxed mb-6">
              Quality is the foundation of ImageTech Industries.
            </p>
            <p className="text-gray-700 font-medium text-[15px] leading-relaxed mb-6">
              We focus on:
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Consistent product performance',
                'Precision engineering',
                'Suitable material selection',
                'Continuous product improvement',
                'Customer satisfaction'
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-3">
                   <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                     <CheckCircle2 className="w-3.5 h-3.5" />
                   </div>
                   <span className="text-gray-800 font-bold text-[15px]">{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-700 font-medium text-[15px] leading-relaxed">
              Our objective is to deliver products that help industries improve efficiency and maintain high-quality standards.
            </p>
          </div>

          {/* Right: Image Layout */}
          <div className="order-1 lg:order-2 relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl h-[350px] bg-gray-100 group border-4 border-white">
             <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
             <img 
              src="/images/about-quality.jpg" 
              alt="Quality Assurance Lab" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#1e3a8a]/95 backdrop-blur-md p-5 rounded-2xl text-white flex items-center gap-4 z-20 shadow-xl border border-blue-800">
               <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/20 shrink-0 bg-white/10">
                 <ShieldCheck className="w-6 h-6 text-white" />
               </div>
               <div>
                 <h4 className="font-black text-[17px] tracking-tight">Quality Assured</h4>
                 <p className="text-blue-100 text-[13px] font-bold">Tested. Trusted. Delivered.</p>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Bottom 4-Column Section (Vision, Mission, etc) */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="border-t border-gray-100 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center lg:text-left">
            
            {/* Vision */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-[#1e3a8a] mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#1e3a8a] text-[18px] mb-4">Our Vision</h3>
              <p className="text-gray-700 text-[14px] font-medium leading-relaxed">
                To establish ImageTech Industries as a trusted Indian manufacturing brand recognized for precision engineering, innovation, and dependable industrial solutions worldwide.
              </p>
            </div>

            {/* Mission */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-14 h-14 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#1e3a8a] text-[18px] mb-4">Our Mission</h3>
              <p className="text-gray-700 text-[14px] font-medium leading-relaxed">
                To manufacture high-quality industrial products by combining technology, experience, and customer requirements while maintaining excellence in quality and service.
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-14 h-14 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600 mb-6">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#1e3a8a] text-[18px] mb-4">Why Choose Us?</h3>
              <ul className="space-y-3 w-full inline-block text-left">
                {[
                  '30+ Years of Manufacturing Experience',
                  'Innovation & Development',
                  'Customer-Focused Approach',
                  'Made In India Excellence'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-[14px] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Built on Trust */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-14 h-14 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600 mb-6">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="font-black text-[#1e3a8a] text-[18px] mb-4">Built on Trust</h3>
              <p className="text-gray-700 text-[14px] font-medium leading-relaxed">
                A legacy of engineering knowledge and industrial expertise since 1992.
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
