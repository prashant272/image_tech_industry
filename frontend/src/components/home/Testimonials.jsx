import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "John D.",
      role: "Production Manager",
      company: "FlexoPrint Solutions",
      text: "The precision of ImageTech's Doctor Blades has significantly improved our printing quality. We've seen a noticeable reduction in ink wastage and downtime.",
      rating: 5,
    },
    {
      name: "Sarah L.",
      role: "QA Head",
      company: "PackTech Industries",
      text: "Their Dyne Test Pens are incredibly accurate and easy to use. It has become a standard part of our quality control process for all our flexible packaging films.",
      rating: 5,
    },
    {
      name: "Rajesh K.",
      role: "Director",
      company: "Apex Paper Mills",
      text: "We rely on ImageTech for our testing instruments. The GSM templates and stroboscopes are durable, reliable, and exactly what we need for our daily high-speed operations.",
      rating: 5,
    },
    {
      name: "Michael T.",
      role: "Operations Head",
      company: "Global Labels Inc.",
      text: "Switching to ImageTech's ink mixing rollers changed everything. Consistent ink distribution has improved our color matching process tremendously.",
      rating: 5,
    },
    {
      name: "Elena R.",
      role: "Plant Supervisor",
      company: "Quality Coatings",
      text: "We run high-speed coating lines and their doctor blades have the perfect edge configuration to keep our coatings even and smooth across the entire web.",
      rating: 5,
    },
    {
      name: "Amit S.",
      role: "Technical Lead",
      company: "PrintPack Solutions",
      text: "Excellent technical support. They helped us choose the right stroboscope for our specific machine, and it has drastically cut down our inspection time.",
      rating: 5,
    }
  ];

  // Duplicate the array for a seamless infinite loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-6 lg:py-8 bg-[#fafcff] relative font-sans overflow-hidden" id="testimonials">
      
      {/* CSS for infinite smooth slider */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes testimonial-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 16px)); } /* 16px accounts for exactly half of the gap-8 (32px) */
        }
        .animate-testimonial-slide {
          animation: testimonial-slide 50s linear infinite;
          width: max-content;
        }
        .testimonial-slider-container:hover .animate-testimonial-slide {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#1d4ed8]"></span>
            <h4 className="text-[#1d4ed8] font-bold tracking-[0.15em] uppercase text-[12px] md:text-[13px]">
              CLIENT SUCCESS STORIES
            </h4>
            <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-[#1d4ed8]"></span>
          </div>
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-black text-[#0f172a] leading-[1.2] tracking-tighter mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-[15px] lg:text-[17px] text-gray-500 font-medium">
            Discover how our precision industrial products are making a difference in printing, packaging, and quality-control processes worldwide.
          </p>
        </div>

        {/* Continuous Smooth Slider */}
        <div className="testimonial-slider-container overflow-hidden py-4 w-full cursor-pointer">
          <div className="animate-testimonial-slide flex gap-8">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="w-[280px] md:w-[320px] lg:w-[350px] xl:w-[380px] shrink-0 bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_-10px_rgba(29,78,216,0.12)] hover:border-[#1d4ed8]/20 transition-all duration-300 relative group flex flex-col h-auto min-h-[340px]"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-[#1d4ed8]/5 group-hover:text-[#1d4ed8]/10 transition-colors duration-300" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <p className="text-[15px] lg:text-[16px] text-[#334155] font-medium leading-relaxed mb-8 flex-grow">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#1d4ed8] font-bold text-lg shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold text-[#0f172a]">{testimonial.name}</h4>
                      <p className="text-[13px] text-gray-500 font-medium">
                        {testimonial.role}, <span className="text-[#1d4ed8]">{testimonial.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
