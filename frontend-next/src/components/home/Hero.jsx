'use client';
import React, { useState, useEffect } from 'react';
import { Link } from '@/compat/react-router';
import { ArrowRight, ShieldCheck, Target, Settings, Zap, CheckCircle2 } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: '/hero-image.jpg',
    tagline: 'IMAGETECH INDUSTRIES',
    title1: 'WIPEX DOCTOR',
    titleHighlight: 'BLADES',
    title2: '',
    subtitle: 'PREMIUM DOCTORING. FLAWLESS PRINTING.',
    description: 'High-quality Carbon Steel, Stainless Steel, and Polymer doctor blades. Engineered for precise wiping and extended cylinder life in Rotogravure & Flexographic printing.',
    themeColor: '#f97316',
    textColor: 'text-black',
    bgColorClass: 'bg-orange-600',
    pBgClass: 'bg-white/40',
    btnText: 'text-white',
    btnHover: 'hover:bg-orange-700 hover:text-white',
    btnBorderHover: 'hover:bg-orange-500 hover:text-black hover:border-orange-500',
    features: [
      { icon: ShieldCheck, label: 'SUPERIOR EDGE' },
      { icon: Settings, label: 'PRECISE WIPING' },
      { icon: ShieldCheck, label: 'CYLINDER SAFE' },
      { icon: Zap, label: 'LONG LASTING' },
    ]
  },

  {
    id: 3,
    image: '/hero-stroboscope.jpg',
    tagline: 'IMAGETECH INDUSTRIES',
    title1: 'INDUSTRIAL',
    titleHighlight: 'STROBOSCOPES',
    title2: '',
    subtitle: 'HANDHELD & U-TUBE MODELS. PRECISION INSPECTION.',
    description: 'Advanced stroboscope solutions for high-speed motion analysis, quality control and industrial inspection applications.',
    themeColor: '#f97316',
    textColor: 'text-black',
    bgColorClass: 'bg-orange-600',
    pBgClass: 'bg-white/40',
    btnText: 'text-white',
    btnHover: 'hover:bg-orange-700 hover:text-white',
    btnBorderHover: 'hover:bg-orange-500 hover:text-black hover:border-orange-500',
    features: [
      { icon: Target, label: 'HIGH ACCURACY' },
      { icon: ShieldCheck, label: 'RELIABLE & DURABLE' },
      { icon: Zap, label: 'WIDE SPEED RANGE' },
      { icon: Settings, label: 'BUILT FOR INDUSTRY' },
    ]
  },
  {
    id: 4,
    image: '/hero-dyne-pen.jpg',
    tagline: 'IMAGETECH INDUSTRIES',
    title1: 'DYNE',
    titleHighlight: 'TEST PENS',
    title2: '',
    subtitle: 'ACCURATE SURFACE TESTING. RELIABLE RESULTS.',
    description: 'Dyne Test Pens ensure precise measurement of surface tension for inks, coatings and treatments. Consistent performance you can trust, every time.',
    themeColor: '#f97316',
    textColor: 'text-black',
    bgColorClass: 'bg-orange-600',
    pBgClass: 'bg-white/40',
    btnText: 'text-white',
    btnHover: 'hover:bg-orange-700 hover:text-white',
    btnBorderHover: 'hover:bg-orange-500 hover:text-black hover:border-orange-500',
    features: [
      { icon: Target, label: 'PRECISE MEASUREMENTS' },
      { icon: ShieldCheck, label: 'CONSISTENT PERFORMANCE' },
      { icon: CheckCircle2, label: 'EASY TO USE' },
      { icon: Settings, label: 'VERSATILE INKS' },
    ]
  },

  {
    id: 6,
    image: '/hero-bar-coater.jpg',
    tagline: 'IMAGETECH INDUSTRIES',
    title1: 'PREMIUM',
    titleHighlight: 'BAR COATERS',
    title2: '',
    subtitle: 'CONSISTENT COATING. PERFECT RESULTS.',
    description: 'High-precision wire wound bar coaters for uniform and accurate coating thickness in laboratories and production environments.',
    themeColor: '#f97316',
    textColor: 'text-black',
    bgColorClass: 'bg-orange-600',
    pBgClass: 'bg-white/40',
    btnText: 'text-white',
    btnHover: 'hover:bg-orange-700 hover:text-white',
    btnBorderHover: 'hover:bg-orange-500 hover:text-black hover:border-orange-500',
    features: [
      { icon: Target, label: 'HIGH PRECISION' },
      { icon: ShieldCheck, label: 'RELIABLE BUILD' },
      { icon: CheckCircle2, label: 'EASY TO USE' },
      { icon: Settings, label: 'UNIFORM COATING' },
    ]
  },
  {
    id: 7,
    image: '/hero-viscosity-cup.jpg',
    tagline: 'IMAGETECH INDUSTRIES',
    title1: 'B4',
    titleHighlight: 'VISCOSITY CUP',
    title2: '',
    subtitle: 'PRECISE MEASUREMENT. OPTIMAL FLOW.',
    description: 'High-quality B4 Viscosity Cups for accurate measurement of ink and fluid viscosity. Ensure consistent quality in every batch.',
    themeColor: '#f97316',
    textColor: 'text-black',
    bgColorClass: 'bg-orange-600',
    pBgClass: 'bg-white/40',
    btnText: 'text-white',
    btnHover: 'hover:bg-orange-700 hover:text-white',
    btnBorderHover: 'hover:bg-orange-500 hover:text-black hover:border-orange-500',
    features: [
      { icon: Target, label: 'ACCURATE READING' },
      { icon: ShieldCheck, label: 'BRASS BUILD' },
      { icon: CheckCircle2, label: 'EASY TO CLEAN' },
      { icon: Settings, label: 'CONSISTENT FLOW' },
    ]
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

  return (
    <div className="relative w-full h-[280px] sm:h-[320px] md:h-[620px] lg:h-[720px] mt-[80px] sm:mt-[84px] md:mt-[88px] bg-white overflow-hidden group">
      <h1 className="sr-only">Doctor Blades & Printing Machinery Accessories</h1>
      {/* Slides Container */}
      <div
        className="w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative flex flex-col justify-center">
            {/* Background Image - full bleed, vertically centered to show both top and bottom completely */}
            <img
              src={slide.image}
              alt={slide.title1 + ' ' + slide.titleHighlight}
              className="absolute inset-0 w-full h-full object-cover object-[78%_center] sm:object-[72%_center] md:object-[center_25%] z-0"
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding={index === 0 ? "sync" : "async"}
            />

            {/* Subtle left gradient strictly for text legibility */}
            <div className="absolute inset-y-0 left-0 w-[58%] sm:w-[52%] md:w-[48%] lg:w-[45%] bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10 pointer-events-none"></div>

            <div className="max-w-[85rem] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex items-center justify-start py-3 sm:py-4 md:py-8">
              {/* Content Box */}
              <div className="relative w-[50%] sm:w-[48%] md:w-[55%] lg:w-[50%] max-w-[170px] sm:max-w-none flex flex-col justify-center">
                <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-1.5">
                  <div className="w-0.5 h-2.5 md:h-4" style={{ backgroundColor: slide.themeColor }}></div>
                  <span className={`text-white text-[7px] sm:text-[9.5px] md:text-sm font-bold tracking-[0.12em] uppercase ${slide.bgColorClass} px-1.5 py-0.5 md:px-2 md:py-1 rounded truncate`}>
                    {slide.tagline}
                  </span>
                </div>

                <h2 className={`${slide.textColor} font-black leading-[1.08] mb-1 md:mb-2.5 drop-shadow-sm md:drop-shadow-none`}>
                  <span className="block text-[13px] sm:text-[18px] md:text-4xl lg:text-5xl tracking-tight leading-tight drop-shadow-sm truncate">
                    {slide.title1}
                  </span>
                  <span className="block text-[14px] sm:text-[20px] md:text-5xl lg:text-6xl mt-0.5 md:mt-1 tracking-tight leading-tight drop-shadow-sm truncate" style={{ color: slide.themeColor, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    {slide.titleHighlight}
                  </span>
                  {slide.title2 && (
                    <span className={slide.id === 3 ? "text-[10px] sm:text-base md:text-2xl lg:text-3xl drop-shadow-sm mt-0.5 block truncate" : "drop-shadow-sm text-[9px] sm:text-sm md:text-base block truncate"}>
                      {slide.title2}
                    </span>
                  )}
                </h2>

                <div className="text-[7.5px] sm:text-[9.5px] md:text-sm font-bold tracking-wider uppercase mb-1.5 md:mb-2 opacity-100 text-orange-500 drop-shadow-sm line-clamp-2 md:line-clamp-none leading-tight">
                  {slide.subtitle}
                </div>
                <p className={`hidden md:block font-bold text-xs md:text-sm leading-relaxed mb-3 md:mb-5 max-w-sm md:max-w-md ${slide.pBgClass} p-2 rounded-lg text-black backdrop-blur-sm`}>
                  {slide.description}
                </p>

                {/* Features (Badges) - desktop only */}
                <div className="hidden md:flex md:flex-wrap md:gap-3 lg:gap-6 mb-3 md:mb-6 w-full">
                  {slide.features.map((feature, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-start gap-1.5 text-center">
                      <div
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors shadow-sm"
                        style={{
                          border: `1px solid ${slide.themeColor}`,
                          backgroundColor: 'rgba(255,255,255,0.7)',
                          color: slide.themeColor
                        }}
                      >
                        <feature.icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                      </div>
                      <div className="text-black text-[9px] md:text-[11px] font-black uppercase tracking-wider leading-tight max-w-[65px] md:max-w-[75px] drop-shadow-sm">
                        {feature.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons - both buttons exact same size */}
                <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-3 mt-1 md:mt-2">
                  <button
                    onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
                    className={`flex items-center justify-center gap-1 w-[108px] sm:w-[130px] md:w-auto h-[32px] sm:h-[38px] md:h-auto px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 rounded-md font-bold tracking-wider text-[9.5px] sm:text-xs md:text-sm uppercase shadow-sm ${slide.btnText} ${slide.btnHover}`}
                    style={{ backgroundColor: slide.themeColor }}
                  >
                    ENQUIRE NOW <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ml-0.5" />
                  </button>
                  <Link
                    to="/products"
                    className="flex items-center justify-center gap-1 w-[108px] sm:w-[130px] md:w-auto h-[32px] sm:h-[38px] md:h-auto border px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 rounded-md font-bold tracking-wider text-[9.5px] sm:text-xs md:text-sm uppercase shadow-sm text-black hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors"
                    style={{ borderColor: slide.themeColor }}
                  >
                    EXPLORE <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ml-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
