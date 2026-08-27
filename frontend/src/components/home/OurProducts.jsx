import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowRight, CheckCircle, Truck, Wrench, Handshake, PenTool, Settings, Camera, FlaskConical, FileText, Blocks } from 'lucide-react';
import apiClient from '../../api/client';

const OurProducts = () => {
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/products');
        setDbProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching home products:', error);
      }
    };
    fetchProducts();
  }, []);

  const productIcons = {
    'Doctor Blades': <Blocks className="w-5 h-5 text-[#0a192f]" />,
    'Dyne Test Pen': <PenTool className="w-5 h-5 text-[#0a192f]" />,
    'Ink Mixing Roller': <Settings className="w-5 h-5 text-[#0a192f]" />,
    'Stroboscope': <Camera className="w-5 h-5 text-[#0a192f]" />,
    'Laboratory Instruments': <FlaskConical className="w-5 h-5 text-[#0a192f]" />
  };

  const products = dbProducts.slice(0, 5).map(p => ({
    ...p,
    image: p.images && p.images.length > 0 && p.images[0].trim() !== '' ? p.images[0] : '',
    desc: p.shortDesc || '',
    icon: productIcons[p.category?.name] || <Blocks className="w-5 h-5 text-[#0a192f]" />
  }));

  const features = [
    {
      title: 'Premium Quality',
      desc: 'Manufactured with the highest standards',
      icon: <CheckCircle className="w-7 h-7 text-[#0a192f]" />
    },
    {
      title: 'Fast Delivery',
      desc: 'Timely delivery across India & Worldwide',
      icon: <Truck className="w-7 h-7 text-[#0a192f]" />
    },
    {
      title: 'Expert Support',
      desc: 'Technical guidance from industry experts',
      icon: <Wrench className="w-7 h-7 text-[#0a192f]" />
    },
    {
      title: 'Trusted by Industry',
      desc: 'Preferred by leading printing companies worldwide',
      icon: <Handshake className="w-7 h-7 text-[#0a192f]" />
    }
  ];

  return (
    <section className="pb-20 lg:pb-28 pt-4 lg:pt-6 bg-[#f8f9fa] relative font-sans overflow-hidden" id="our-products">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#d4af37]"></span>
            <span className="text-[#d4af37] font-bold tracking-[0.25em] uppercase text-[12px] md:text-[13px]">OUR PRODUCTS</span>
            <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-[#d4af37]"></span>
          </div>
          
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-black text-[#0f172a] leading-[1.2] tracking-tighter mb-4">
            Complete Printing & Packaging Solutions
          </h2>
          <p className="text-[15px] lg:text-[17px] text-gray-600 font-bold">
            High-performance products engineered for precision, reliability, and superior results.
          </p>
        </div>

        {/* Products Grid (Responsive: 1 -> 2 -> 3 -> 5 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-200 hover:shadow-[0_20px_40px_-15px_rgba(29,78,216,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              {/* Product Image Box */}
              <div className="relative h-56 xl:h-52 bg-gray-100 overflow-hidden border-b border-gray-100">
                <img 
                  src={product.image || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCA4MDAgNjAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBzbGljZSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YxZjVmOSIgLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5NDkzYjgiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4='} 
                  alt={product.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCA4MDAgNjAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBzbGljZSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YxZjVmOSIgLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5NDkzYjgiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Eye Icon (Visible by default) */}
                <button className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md transform scale-100 hover:bg-[#1d4ed8] hover:text-white text-[#1d4ed8] z-10 transition-colors duration-300">
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Product Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 flex items-center justify-center text-[#1d4ed8]">
                    {product.icon}
                  </div>
                  <h3 className="text-[17px] font-extrabold text-[#0f172a] leading-tight">
                    {product.title}
                  </h3>
                </div>
                
                <p className="text-[14px] text-gray-600 font-semibold leading-relaxed mb-6 flex-grow">
                  {product.desc}
                </p>
                
                {/* View Details Button */}
                <Link to={`/products/${product.slug}`} className="w-full bg-[#f0f5fa] hover:bg-[#1d4ed8] text-[#1d4ed8] hover:text-white py-3.5 px-4 rounded-xl flex items-center justify-between transition-colors duration-300 font-extrabold text-[12px] tracking-wide mt-auto">
                  VIEW DETAILS
                  <ArrowRight className="w-4 h-4 font-bold" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 lg:mt-10">
          <Link to="/products" className="w-full sm:w-auto bg-[#1d4ed8] hover:bg-[#1e3a8a] text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgba(29,78,216,0.25)] hover:shadow-[0_10px_25px_rgba(29,78,216,0.35)] hover:-translate-y-0.5 font-extrabold tracking-widest text-[13px] uppercase flex items-center justify-center gap-3 group">
            <Blocks className="w-4 h-4" />
            VIEW ALL PRODUCTS
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button 
            onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
            className="w-full sm:w-auto bg-white hover:bg-gray-50 text-[#1d4ed8] border-2 border-gray-300 hover:border-[#1d4ed8] px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-extrabold tracking-widest text-[13px] uppercase flex items-center justify-center gap-3"
          >
            <FileText className="w-4 h-4 font-bold" />
            GET A QUOTE
          </button>
        </div>

        {/* Bottom Features Row */}
        <div className="mt-8 lg:mt-10 bg-white rounded-2xl p-8 lg:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-5 px-0 md:px-6 pt-6 md:pt-0 first:pt-0 first:px-0">
                <div className="shrink-0 group">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-[#1d4ed8] group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0f172a] text-[15px] mb-1">{feature.title}</h4>
                  <p className="text-gray-600 text-[13px] font-semibold leading-tight">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurProducts;
