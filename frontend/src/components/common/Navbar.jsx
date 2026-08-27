import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X, FileText } from 'lucide-react';
import { productsData } from '../../data/products';
import apiClient from '../../api/client';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  const [dbCategories, setDbCategories] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          apiClient.get('/categories'),
          apiClient.get('/products')
        ]);
        setDbCategories(catRes.data.filter(c => c.status === 'Active') || []);
        setDbProducts(prodRes.data || []);
      } catch (error) {
        console.error('Error fetching dynamic navbar data:', error);
      }
    };
    fetchData();
  }, []);

  const getProductsByCategory = (categoryId, isSpecial = false) => {
    return dbProducts.filter(p => p.category?._id === categoryId && (isSpecial ? p.isSpecial : true));
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products', hasDropdown: true },
    { name: 'Special Product', path: '/special-product', hasDropdown: true },
    { name: 'Certifications', path: '/images/certification.jpg', isExternal: true },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${!isTransparent ? 'bg-white shadow-sm border-b border-gray-100 py-3' : 'bg-transparent pt-1 pb-2 md:py-5'}`}>
      <div className="max-w-[100rem] mx-auto px-2 md:px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center min-h-[4rem]">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt="ImageTech Industries" 
              className={`h-14 md:h-16 w-auto object-contain transition-all ${isTransparent ? 'bg-white/90 p-2 rounded-xl' : ''}`}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link, idx) => (
              <div key={idx} className="relative group">
                {link.isExternal ? (
                  <a 
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 text-[15px] font-bold transition-colors ${isTransparent ? 'text-gray-900 hover:text-blue-700 drop-shadow-md' : 'text-[#1e293b] hover:text-blue-600'}`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    to={link.path}
                    className={`flex items-center gap-1 text-[15px] font-bold transition-colors ${isTransparent ? 'text-gray-900 hover:text-blue-700 drop-shadow-md' : 'text-[#1e293b] hover:text-blue-600'}`}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                )}
                
                {link.hasDropdown && link.name === 'Products' && (
                  <div className="absolute top-full left-0 mt-4 w-64 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    {dbCategories.map(category => {
                      const categoryProds = getProductsByCategory(category._id);
                      return (
                      <div key={category._id} className="relative group/cat">
                        <Link 
                          to={`/products?category=${category.slug}`} 
                          className="flex items-center justify-between px-5 py-3 text-[14px] font-bold text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        >
                          {category.name}
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover/cat:text-blue-600" />
                        </Link>
                        
                        {/* Secondary Flyout for Products */}
                        {categoryProds.length > 0 && (
                          <div className="absolute top-0 left-[100%] w-72 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover/cat:opacity-100 group-hover/cat:visible transition-all duration-200 ml-1">
                            {categoryProds.map(p => (
                              <Link 
                                key={p._id}
                                to={`/products/${p.slug}`} 
                                className="block px-5 py-3 text-[13.5px] font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:pl-6 transition-all"
                              >
                                {p.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )})}
                  </div>
                )}

                {link.hasDropdown && link.name === 'Special Product' && (
                  <div className="absolute top-full left-0 mt-4 w-64 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    {dbCategories.map(category => {
                      const specialProds = getProductsByCategory(category._id, true);
                      if (specialProds.length === 0) return null;
                      return (
                      <div key={category._id} className="relative group/cat">
                        <Link 
                          to={`/products?category=${category.slug}`} 
                          className="flex items-center justify-between px-5 py-3 text-[14px] font-bold text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        >
                          {category.name}
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover/cat:text-blue-600" />
                        </Link>
                        
                        {/* Secondary Flyout for Products */}
                        <div className="absolute top-0 left-[100%] w-72 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover/cat:opacity-100 group-hover/cat:visible transition-all duration-200 ml-1">
                          {specialProds.map(p => (
                            <Link 
                              key={p._id}
                              to={`/products/${p.slug}`} 
                              className="block px-5 py-3 text-[13.5px] font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:pl-6 transition-all"
                            >
                              {p.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )})}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
              className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-5 py-2.5 rounded font-bold text-[13px] flex items-center gap-2 transition-colors"
            >
              <FileText className="w-4 h-4" />
              GET A QUOTE
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 focus:outline-none transition-colors text-gray-900"
            >
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
           {navLinks.map((link, idx) => (
              <div key={idx} className="flex flex-col">
                {link.isExternal ? (
                  <a href={link.path} target="_blank" rel="noopener noreferrer" className="font-bold text-gray-800 text-lg flex justify-between items-center py-2">
                    {link.name}
                  </a>
                ) : (
                  <div className="flex flex-col">
                    <div 
                      onClick={(e) => {
                        if (link.hasDropdown) {
                          e.preventDefault();
                          setOpenMobileDropdown(openMobileDropdown === link.name ? null : link.name);
                        }
                      }}
                      className="flex justify-between items-center py-2 cursor-pointer group"
                    >
                      {link.hasDropdown ? (
                        <span className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">{link.name}</span>
                      ) : (
                        <Link to={link.path} className="font-bold text-gray-800 text-lg w-full hover:text-blue-600 transition-colors">{link.name}</Link>
                      )}
                      {link.hasDropdown && (
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openMobileDropdown === link.name ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                    
                    {/* Render accordion content if this dropdown is open */}
                    {link.hasDropdown && openMobileDropdown === link.name && (
                      <div className="flex flex-col pl-4 gap-4 py-3 border-l-2 border-gray-100 ml-2 mt-1">
                        <Link to={link.path} className="text-[15px] font-bold text-blue-600">
                          View All {link.name} →
                        </Link>
                        {dbCategories.map(category => {
                          const categoryProds = getProductsByCategory(category._id, link.name === 'Special Product');
                          if (link.name === 'Special Product' && categoryProds.length === 0) return null;
                          if (link.name === 'Products' && categoryProds.length === 0) return null;
                          return (
                            <div key={category._id} className="flex flex-col gap-2">
                              <Link to={`/products?category=${category.slug}`} className="font-bold text-[14px] text-gray-800 hover:text-blue-600">
                                {category.name}
                              </Link>
                              <div className="flex flex-col pl-3 gap-2.5 mt-1 border-l border-gray-100">
                                {categoryProds.map(p => (
                                  <Link 
                                    key={p._id} 
                                    to={`/products/${p.slug}`} 
                                    className="text-[13.5px] font-medium text-gray-500 hover:text-blue-600 pl-2"
                                  >
                                    {p.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
           ))}
          <hr className="border-gray-100 my-2" />
          <button 
            onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
            className="bg-[#1e3a8a] text-white px-5 py-3.5 rounded font-bold text-[16px] w-full text-center flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            GET A QUOTE
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
