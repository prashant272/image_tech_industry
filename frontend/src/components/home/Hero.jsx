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
    themeColor: '#1d4ed8',
    textColor: 'text-blue-950',
    bgColorClass: 'bg-white/70',
    pBgClass: 'bg-white/50',
    btnText: 'text-white',
    btnHover: 'hover:bg-blue-800',
    btnBorderHover: 'hover:bg-blue-800 hover:text-white hover:border-blue-800',
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
    themeColor: '#1d4ed8',
    textColor: 'text-blue-950',
    bgColorClass: 'bg-white/70',
    pBgClass: 'bg-white/50',
    btnText: 'text-white',
    btnHover: 'hover:bg-blue-800',
    btnBorderHover: 'hover:bg-blue-800 hover:text-white hover:border-blue-800',
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
    themeColor: '#1d4ed8',
    textColor: 'text-blue-950',
    bgColorClass: 'bg-white/70',
    pBgClass: 'bg-white/50',
    btnText: 'text-white',
    btnHover: 'hover:bg-blue-800',
    btnBorderHover: 'hover:bg-blue-800 hover:text-white hover:border-blue-800',
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
    themeColor: '#1d4ed8',
    textColor: 'text-blue-950',
    bgColorClass: 'bg-white/70',
    pBgClass: 'bg-white/50',
    btnText: 'text-white',
    btnHover: 'hover:bg-blue-800',
    btnBorderHover: 'hover:bg-blue-800 hover:text-white hover:border-blue-800',
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
    themeColor: '#1d4ed8',
    textColor: 'text-blue-950',
    bgColorClass: 'bg-white/70',
    pBgClass: 'bg-white/50',
    btnText: 'text-white',
    btnHover: 'hover:bg-blue-800',
    btnBorderHover: 'hover:bg-blue-800 hover:text-white hover:border-blue-800',
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
            
            <div className="max-w-[85rem] w-full mx-auto px-5 sm:px-6 lg:px-8 relative z-20 h-full flex items-start md:items-center">
              <div className="relative w-full md:w-[50%] lg:w-[45%] mt-0 md:-mt-16 pt-[90px] md:pt-0 pb-4 md:pb-12">
                 <div className="flex items-center gap-2 mb-1.5">
                   <div className="w-0.5 h-3" style={{ backgroundColor: slide.themeColor }}></div>
                   <span className={`${slide.textColor} text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase ${slide.bgColorClass} px-2 py-1 rounded`}>
                     {slide.tagline}
                   </span>
                 </div>
                 
                 <h1 className={`${slide.textColor} font-black leading-[1.1] mb-2 md:mb-4`}>
                   <span className="block text-2xl md:text-4xl lg:text-6xl tracking-tight drop-shadow-md">{slide.title1}</span>
                   <span className="block text-3xl md:text-5xl lg:text-7xl mt-0 md:mt-1 tracking-tighter" style={{ color: slide.themeColor, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                     {slide.titleHighlight}
                   </span>
                   {slide.title2 && <span className={slide.id === 3 ? "text-xl md:text-3xl lg:text-4xl drop-shadow-md mt-0 md:mt-1" : "drop-shadow-md text-sm md:text-base"}>{slide.title2}</span>}
                 </h1>
                 
                 <div className={`text-[10px] md:text-sm font-bold tracking-widest uppercase mb-1 md:mb-2 opacity-90 text-blue-900`}>
                   {slide.subtitle}
                 </div>
                 <p className={`hidden md:block font-medium text-xs md:text-sm leading-relaxed mb-6 max-w-sm md:max-w-md ${slide.pBgClass} p-2 rounded-lg text-blue-950 backdrop-blur-sm`}>
                   {slide.description}
                 </p>

                 <div className="flex flex-wrap gap-2 md:gap-4 lg:gap-8 mb-4 md:mb-8">
                   {slide.features.map((feature, idx) => (
                     <div key={idx} className="flex flex-col items-center gap-2 text-center">
                       <div 
                         className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors shadow-sm"
                         style={{
                           border: `1px solid ${slide.themeColor}`,
                           backgroundColor: 'rgba(255,255,255,0.7)',
                           color: slide.themeColor
                         }}
                       >
                         <feature.icon className="w-4 h-4" strokeWidth={1.5} />
                       </div>
                       <div className={`text-blue-950 text-[8px] md:text-[10px] font-bold uppercase tracking-wider leading-tight max-w-[60px] md:max-w-[80px]`}>
                         {feature.label}
                       </div>
                     </div>
                   ))}
                 </div>

                 <div className="flex flex-wrap gap-3 mt-2">
                   <button 
                     onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
                     className={`flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-2.5 rounded transition-colors font-bold tracking-widest text-[10px] md:text-xs uppercase shadow-md flex-1 md:flex-none ${slide.btnText} ${slide.btnHover}`}
                     style={{ backgroundColor: slide.themeColor }}
                   >
                     ENQUIRE NOW <ArrowRight className="w-3 h-3 ml-1" />
                   </button>
                   <Link 
                     to="/products"
                     className={`flex items-center justify-center gap-2 border px-4 py-2 md:px-6 md:py-2.5 rounded transition-colors font-bold tracking-widest text-[10px] md:text-xs uppercase shadow-sm group flex-1 md:flex-none ${slide.btnBorderHover}`}
                     style={{ 
                       borderColor: slide.themeColor,
                       color: '#0f172a'
                     }}
                   >
                     EXPLORE PRODUCTS <ArrowRight className="w-3 h-3 ml-1" />
                   </Link>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators & Navigation */}
      <div className="absolute top-[30%] right-8 z-30 flex flex-col gap-4">
        <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center justify-center text-xs font-bold tracking-widest text-white/50 gap-1">
          <span style={{ color: slides[currentSlide].themeColor }}>{(currentSlide + 1).toString().padStart(2, '0')}</span>
          <span className="w-4 h-[1px] bg-white/20"></span>
          <span>{totalSlides.toString().padStart(2, '0')}</span>
        </div>
        <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
