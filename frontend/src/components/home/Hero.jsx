import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Target, Settings, Droplet, Zap, CheckCircle2, Printer } from 'lucide-react';

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
    <div className="relative w-full h-[100dvh] md:h-[600px] lg:h-[750px] bg-[#000000] overflow-hidden group">
      {/* Slides Container */}
      <div 
        className="w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative flex flex-col justify-center">
            <img 
              src={slide.image} 
              alt={slide.title1 + ' ' + slide.titleHighlight} 
              className="absolute inset-0 w-full h-full object-cover object-[center_30%] z-0" 
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding={index === 0 ? "sync" : "async"}
            />
            {/* Gradient Overlay for Text Readability - Desktop Only now */}
            <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-white/90 via-white/50 to-transparent z-10 pointer-events-none"></div>
            
            <div className="max-w-[85rem] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex items-center md:items-center justify-center md:justify-start">
              <div className="relative w-full md:w-[50%] lg:w-[45%] bg-white/10 md:bg-transparent backdrop-blur-none p-6 sm:p-8 md:p-0 rounded-[2rem] md:rounded-none shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] md:shadow-none border border-white/40 md:border-none mt-8 md:mt-0 flex flex-col">
                 <div className="flex items-center gap-2 mb-2 md:mb-1.5">
                   <div className="w-0.5 h-3 md:h-4" style={{ backgroundColor: slide.themeColor }}></div>
                   <span className={`text-white text-xs md:text-sm font-bold tracking-[0.2em] uppercase ${slide.bgColorClass} px-2 py-1 rounded`}>
                     {slide.tagline}
                   </span>
                 </div>
                 
                 <h1 className={`${slide.textColor} font-black leading-[1.1] mb-2 md:mb-4 drop-shadow-sm md:drop-shadow-none`}>
                   <span className="block text-3xl md:text-4xl lg:text-6xl tracking-tight drop-shadow-md">{slide.title1}</span>
                   <span className="block text-4xl md:text-5xl lg:text-7xl mt-0 md:mt-1 tracking-tighter drop-shadow-md" style={{ color: slide.themeColor, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                     {slide.titleHighlight}
                   </span>
                   {slide.title2 && <span className={slide.id === 3 ? "text-2xl md:text-3xl lg:text-4xl drop-shadow-md mt-0 md:mt-1" : "drop-shadow-md text-base md:text-lg"}>{slide.title2}</span>}
                 </h1>
                 
                 <div className={`text-xs md:text-sm font-bold tracking-widest uppercase mb-1 md:mb-2 opacity-100 text-orange-400 drop-shadow-lg`}>
                   {slide.subtitle}
                 </div>
                 <p className={`hidden md:block font-bold text-xs md:text-sm leading-relaxed mb-6 max-w-sm md:max-w-md ${slide.pBgClass} p-2 rounded-lg text-black backdrop-blur-sm`}>
                   {slide.description}
                 </p>

                 <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:gap-4 lg:gap-8 mb-4 md:mb-8 w-full">
                   {slide.features.map((feature, idx) => (
                     <div key={idx} className="flex flex-col items-center justify-start gap-2 text-center">
                       <div 
                         className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-colors shadow-sm md:shadow-sm"
                         style={{
                           border: `1px solid ${slide.themeColor}`,
                           backgroundColor: 'rgba(255,255,255,0.5)',
                           color: slide.themeColor
                         }}
                       >
                         <feature.icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                       </div>
                       <div className={`text-black text-[10px] md:text-xs font-black uppercase tracking-wider leading-tight max-w-[70px] md:max-w-[80px] drop-shadow-md`}>
                         {feature.label}
                       </div>
                     </div>
                   ))}
                 </div>

                   <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-2">
                     <button 
                       onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
                       className={`flex items-center justify-center gap-2 px-4 py-3 md:px-6 md:py-2.5 rounded-xl md:rounded transition-colors font-bold tracking-widest text-[13px] md:text-sm uppercase shadow-md w-full sm:w-auto ${slide.btnText} ${slide.btnHover}`}
                       style={{ backgroundColor: slide.themeColor }}
                     >
                       ENQUIRE NOW <ArrowRight className="w-4 h-4 md:w-4 md:h-4 ml-1" />
                     </button>
                     <Link 
                       to="/products"
                       className={`flex items-center justify-center gap-2 border-2 md:border px-4 py-3 md:px-6 md:py-2.5 rounded-xl md:rounded transition-colors font-bold tracking-widest text-[13px] md:text-sm uppercase shadow-sm group w-full sm:w-auto text-black hover:bg-orange-500 hover:border-orange-500`}
                       style={{ 
                         borderColor: slide.themeColor
                       }}
                     >
                       EXPLORE PRODUCTS <ArrowRight className="w-4 h-4 md:w-4 md:h-4 ml-1" />
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
