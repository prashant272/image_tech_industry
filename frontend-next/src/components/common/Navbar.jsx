'use client';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@/compat/react-router';
import { ChevronDown, ChevronRight, Menu, X, FileText, Phone } from 'lucide-react';
import { productsData } from '../../data/products';
import apiClient from '../../api/client';

import { useLocationContext } from '../../context/LocationContext';

let cachedNavCategories = null;
let cachedNavSubcategories = null;
let cachedNavProducts = null;

const Navbar = () => {
  const { citySlug, isLocationRoute } = useLocationContext();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);
  const [hoveredSpecialCategory, setHoveredSpecialCategory] = useState(null);
  const [hoveredSpecialSubcategory, setHoveredSpecialSubcategory] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
    setHoveredCategory(null);
    setHoveredSubcategory(null);
    setHoveredSpecialCategory(null);
    setHoveredSpecialSubcategory(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/' || location.pathname === `/${citySlug}`;

  const standardRoutes = ['products', 'special-product', 'special-products', 'about', 'contact', 'blog', 'pricing', 'dashboards', 'features', 'industries', 'privacy-policy', 'terms-conditions', 'shipping-policy', 'sitemap', 'admin'];
  const parts = location.pathname.split('/').filter(Boolean);
  let isCustomPage = false;
  if (parts.length === 1 && !standardRoutes.includes(parts[0])) {
    isCustomPage = true;
  } else if (parts.length === 2 && !standardRoutes.includes(parts[0]) && !standardRoutes.includes(parts[1])) {
    isCustomPage = true;
  }

  const isTransparent = false;

  const [dbCategories, setDbCategories] = useState(() => cachedNavCategories || []);
  const [dbSubcategories, setDbSubcategories] = useState(() => cachedNavSubcategories || []);
  const [dbProducts, setDbProducts] = useState(() => cachedNavProducts || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, subRes, prodRes] = await Promise.all([
          apiClient.get('/categories'),
          apiClient.get('/subcategories'),
          apiClient.get('/products')
        ]);
        const activeCategories = (catRes.data || []).filter(c => c.status === 'Active');
        const activeSubcategories = (subRes.data || []).filter(s => s.status === 'Active');
        const prods = prodRes.data || [];
        cachedNavCategories = activeCategories;
        cachedNavSubcategories = activeSubcategories;
        cachedNavProducts = prods;
        setDbCategories(activeCategories);
        setDbSubcategories(activeSubcategories);
        setDbProducts(prods);
      } catch (error) {
        console.error('Error fetching dynamic navbar data:', error);
      }
    };
    fetchData();
  }, [location.pathname]);

  const getSubcategoriesByCategory = (categoryId) => {
    return dbSubcategories.filter(s => s.category?._id === categoryId || s.category === categoryId);
  };

  const getProductsByCategory = (categoryId, isSpecial = false) => {
    return dbProducts.filter(p => p.category?._id === categoryId && (isSpecial ? p.isSpecial : true));
  };

  const getProductsBySubcategory = (subcategoryId, isSpecial = false) => {
    return dbProducts.filter(p => (p.subcategory?._id === subcategoryId || p.subcategory === subcategoryId) && (isSpecial ? p.isSpecial : true));
  };

  const getDirectCategoryProducts = (categoryId, isSpecial = false) => {
    return dbProducts.filter(p => p.category?._id === categoryId && !p.subcategory && (isSpecial ? p.isSpecial : true));
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products', hasDropdown: true },
    { name: 'Special Product', path: '/special-product', hasDropdown: true },
    { name: 'Certifications', path: '/images/certification.jpg', isExternal: true },
    { name: 'Blog', path: '/blog' },
    // { name: 'Sitemap', path: '/sitemap' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const getPath = (basePath) => {
    if (!isLocationRoute) return basePath;
    if (basePath === '/special-product' || basePath === '/special-products') return basePath;
    if (basePath === '/') return `/${citySlug}`;
    return `/${citySlug}${basePath}`;
  };

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
          <div className="hidden lg:flex items-center space-x-4 lg:space-x-6">
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
                    to={getPath(link.path)}
                    className={`flex items-center gap-1 text-[15px] font-bold transition-colors ${isTransparent ? 'text-gray-900 hover:text-blue-700 drop-shadow-md' : 'text-[#1e293b] hover:text-blue-600'}`}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                )}

                {link.hasDropdown && link.name === 'Products' && (
                  <div
                    onMouseLeave={() => {
                      setHoveredCategory(null);
                      setHoveredSubcategory(null);
                    }}
                    onWheel={(e) => e.stopPropagation()}
                    className="absolute top-full left-0 pt-2 flex items-start opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto before:absolute before:-top-3 before:left-0 before:w-full before:h-3 before:content-['']"
                  >
                    {/* Tier 1: Categories List */}
                    <div className="w-64 bg-white border border-gray-200/90 rounded-xl shadow-xl py-1 max-h-[80vh] overflow-y-auto overscroll-contain [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                      {dbCategories.map(category => {
                        const categorySubs = getSubcategoriesByCategory(category._id);
                        const categoryProds = getProductsByCategory(category._id);
                        const hasItems = categorySubs.length > 0 || categoryProds.length > 0;
                        const isHovered = hoveredCategory === category._id;
                        return (
                          <div
                            key={category._id}
                            onMouseEnter={() => {
                              setHoveredCategory(category._id);
                              setHoveredSubcategory(null);
                            }}
                            className="relative"
                          >
                            <Link
                              to={`${getPath('/products')}?category=${category.slug}`}
                              className={`flex items-center justify-between px-3.5 py-2 text-[13.5px] font-semibold transition-colors rounded-lg mx-1 ${
                                isHovered ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                              }`}
                            >
                              <span className="truncate pr-2">{category.name}</span>
                              {hasItems && (
                                <ChevronRight className={`w-4 h-4 shrink-0 transition-colors ${isHovered ? 'text-blue-600' : 'text-gray-400'}`} />
                              )}
                            </Link>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tier 2: Subcategories (or direct products if no subcategories) */}
                    {(() => {
                      if (!hoveredCategory) return null;
                      const activeSubs = getSubcategoriesByCategory(hoveredCategory);
                      const directProds = getDirectCategoryProducts(hoveredCategory);
                      const allCategoryProds = getProductsByCategory(hoveredCategory);

                      if (activeSubs.length === 0 && allCategoryProds.length === 0) return null;

                      const hoveredIndex = Math.max(0, dbCategories.findIndex(c => c._id === hoveredCategory));
                      const itemCount = activeSubs.length + directProds.length;
                      const itemHeight = 35;
                      const tier2Height = Math.max(40, itemCount * itemHeight);
                      const maxOffset = Math.max(0, (dbCategories.length * 35) - tier2Height);
                      const topOffset = Math.min(hoveredIndex * 35, maxOffset);

                      if (activeSubs.length > 0) {
                        return (
                          <div
                            style={{ marginTop: `${topOffset}px` }}
                            className="w-64 bg-white border border-gray-200/90 rounded-xl shadow-xl py-1 ml-1 h-fit max-h-[80vh] overflow-y-auto overscroll-contain relative before:absolute before:-left-3 before:top-0 before:w-3 before:h-full [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 transition-all duration-150"
                          >
                            {activeSubs.map(sub => {
                              const subProds = getProductsBySubcategory(sub._id);
                              const isSubHovered = hoveredSubcategory === sub._id;
                              return (
                                <div
                                  key={sub._id}
                                  onMouseEnter={() => setHoveredSubcategory(sub._id)}
                                  className="relative"
                                >
                                  <Link
                                    to={`${getPath('/products')}?subcategory=${sub.slug}`}
                                    className={`flex items-center justify-between px-3.5 py-2 text-[13.5px] font-semibold rounded-lg transition-colors mx-1 ${
                                      isSubHovered ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                    }`}
                                  >
                                    <span className="truncate pr-2">{sub.name}</span>
                                    {subProds.length > 0 && (
                                      <ChevronRight className={`w-4 h-4 shrink-0 transition-colors ${isSubHovered ? 'text-blue-600' : 'text-gray-400'}`} />
                                    )}
                                  </Link>
                                </div>
                              );
                            })}

                            {directProds.length > 0 && (
                              <>
                                {activeSubs.length > 0 && <div className="my-1 border-t border-gray-100 mx-2" />}
                                {directProds.map(p => (
                                  <Link
                                    key={p._id}
                                    to={getPath(`/products/${p.slug}`)}
                                    className="block px-3.5 py-2 text-[13px] font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors mx-1 truncate"
                                  >
                                    {p.title}
                                  </Link>
                                ))}
                              </>
                            )}
                          </div>
                        );
                      }

                      return (
                        <div
                          style={{ marginTop: `${topOffset}px` }}
                          className="w-72 bg-white border border-gray-200/90 rounded-xl shadow-xl py-1 ml-1 h-fit max-h-[80vh] overflow-y-auto overscroll-contain relative before:absolute before:-left-3 before:top-0 before:w-3 before:h-full [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 transition-all duration-150"
                        >
                          {allCategoryProds.map(p => (
                            <Link
                              key={p._id}
                              to={getPath(`/products/${p.slug}`)}
                              className="block px-3.5 py-2 text-[13.5px] font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors mx-1 truncate"
                            >
                              {p.title}
                            </Link>
                          ))}
                        </div>
                      );
                    })()}

                    {/* Tier 3: Products under Hovered Subcategory */}
                    {(() => {
                      if (!hoveredSubcategory) return null;
                      const subProds = getProductsBySubcategory(hoveredSubcategory);
                      if (subProds.length === 0) return null;

                      const activeSubs = getSubcategoriesByCategory(hoveredCategory);
                      const subIndex = Math.max(0, activeSubs.findIndex(s => s._id === hoveredSubcategory));
                      const hoveredCatIndex = Math.max(0, dbCategories.findIndex(c => c._id === hoveredCategory));
                      
                      const itemHeight = 35;
                      const tier2ItemCount = activeSubs.length + (getDirectCategoryProducts(hoveredCategory).length > 0 ? getDirectCategoryProducts(hoveredCategory).length + 0.5 : 0);
                      const tier2Height = Math.max(40, tier2ItemCount * itemHeight);
                      const maxOffset = Math.max(0, (dbCategories.length * 35) - tier2Height);
                      const tier2Top = Math.min(hoveredCatIndex * 35, maxOffset);

                      const isLargeList = subProds.length > 8;
                      const tier3Height = subProds.length * itemHeight;
                      const maxSubOffset = Math.max(0, tier2Height - tier3Height);
                      const tier3Top = isLargeList ? 0 : (tier2Top + Math.min(subIndex * itemHeight, maxSubOffset));

                      const sortedSubProds = [...subProds].sort((a, b) => {
                        const numA = parseInt((a.title.match(/(\d+)\s*Dyne/i) || [])[1]);
                        const numB = parseInt((b.title.match(/(\d+)\s*Dyne/i) || [])[1]);
                        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
                        return (a.title || '').localeCompare(b.title || '');
                      });

                      return (
                        <div
                          style={{
                            marginTop: `${tier3Top}px`,
                            maxHeight: isLargeList ? 'calc(100vh - 100px)' : `calc(100vh - 100px - ${tier3Top}px)`
                          }}
                          className="w-72 bg-white border border-gray-200/90 rounded-xl shadow-xl py-1 pb-3 ml-1 h-fit overflow-y-auto overscroll-contain relative before:absolute before:-left-3 before:top-0 before:w-3 before:h-full [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 transition-all duration-150"
                        >
                          {sortedSubProds.map(p => (
                            <Link
                              key={p._id}
                              to={getPath(`/products/${p.slug}`)}
                              className="block px-3.5 py-2 text-[13.5px] font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors mx-1 truncate"
                            >
                              {p.title}
                            </Link>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}

                {link.hasDropdown && link.name === 'Special Product' && (
                  <div
                    onMouseLeave={() => {
                      setHoveredSpecialCategory(null);
                      setHoveredSpecialSubcategory(null);
                    }}
                    onWheel={(e) => e.stopPropagation()}
                    className="absolute top-full left-0 pt-2 flex items-start opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto before:absolute before:-top-3 before:left-0 before:w-full before:h-3 before:content-['']"
                  >
                    {/* Special Categories List */}
                    <div className="w-64 bg-white border border-gray-200/90 rounded-xl shadow-xl py-1 max-h-[80vh] overflow-y-auto overscroll-contain [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                      {dbCategories.map(category => {
                        const specialProds = getProductsByCategory(category._id, true);
                        if (specialProds.length === 0) return null;
                        const isHovered = hoveredSpecialCategory === category._id;
                        return (
                          <div
                            key={category._id}
                            onMouseEnter={() => {
                              setHoveredSpecialCategory(category._id);
                              setHoveredSpecialSubcategory(null);
                            }}
                            className="relative"
                          >
                            <Link
                              to={`/special-product?category=${category.slug}`}
                              className={`flex items-center justify-between px-3.5 py-2 text-[13.5px] font-semibold transition-colors rounded-lg mx-1 ${
                                isHovered ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                              }`}
                            >
                              <span className="truncate pr-2">{category.name}</span>
                              <ChevronRight className={`w-4 h-4 shrink-0 transition-colors ${isHovered ? 'text-blue-600' : 'text-gray-400'}`} />
                            </Link>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tier 2 for Special: Subcategories or Products */}
                    {(() => {
                      if (!hoveredSpecialCategory) return null;
                      const activeSubs = getSubcategoriesByCategory(hoveredSpecialCategory).filter(s => {
                        return getProductsBySubcategory(s._id, true).length > 0;
                      });
                      const directProds = getDirectCategoryProducts(hoveredSpecialCategory, true);
                      const allSpecialProds = getProductsByCategory(hoveredSpecialCategory, true);

                      if (allSpecialProds.length === 0) return null;

                      const categoriesWithSpecial = dbCategories.filter(c => getProductsByCategory(c._id, true).length > 0);
                      const hoveredIndex = Math.max(0, categoriesWithSpecial.findIndex(c => c._id === hoveredSpecialCategory));
                      const itemCount = activeSubs.length + directProds.length;
                      const itemHeight = 35;
                      const tier2Height = Math.max(40, itemCount * itemHeight);
                      const maxOffset = Math.max(0, (categoriesWithSpecial.length * 35) - tier2Height);
                      const topOffset = Math.min(hoveredIndex * 35, maxOffset);

                      if (activeSubs.length > 0) {
                        return (
                          <div
                            style={{ marginTop: `${topOffset}px` }}
                            className="w-64 bg-white border border-gray-200/90 rounded-xl shadow-xl py-1 ml-1 h-fit max-h-[80vh] overflow-y-auto overscroll-contain relative before:absolute before:-left-3 before:top-0 before:w-3 before:h-full [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 transition-all duration-150"
                          >
                            {activeSubs.map(sub => {
                              const subProds = getProductsBySubcategory(sub._id, true);
                              const isSubHovered = hoveredSpecialSubcategory === sub._id;
                              return (
                                <div
                                  key={sub._id}
                                  onMouseEnter={() => setHoveredSpecialSubcategory(sub._id)}
                                  className="relative"
                                >
                                  <Link
                                    to={`/special-product?subcategory=${sub.slug}`}
                                    className={`flex items-center justify-between px-3.5 py-2 text-[13.5px] font-semibold rounded-lg transition-colors mx-1 ${
                                      isSubHovered ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                    }`}
                                  >
                                    <span className="truncate pr-2">{sub.name}</span>
                                    {subProds.length > 0 && (
                                      <ChevronRight className={`w-4 h-4 shrink-0 transition-colors ${isSubHovered ? 'text-blue-600' : 'text-gray-400'}`} />
                                    )}
                                  </Link>
                                </div>
                              );
                            })}
                            {directProds.length > 0 && (
                              <>
                                {activeSubs.length > 0 && <div className="my-1 border-t border-gray-100 mx-2" />}
                                {directProds.map(p => (
                                  <Link
                                    key={p._id}
                                    to={getPath(`/products/${p.slug}`)}
                                    className="block px-3.5 py-2 text-[13px] font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors mx-1 truncate"
                                  >
                                    {p.title}
                                  </Link>
                                ))}
                              </>
                            )}
                          </div>
                        );
                      }

                      return (
                        <div
                          style={{ marginTop: `${topOffset}px` }}
                          className="w-72 bg-white border border-gray-200/90 rounded-xl shadow-xl py-1 ml-1 h-fit max-h-[80vh] overflow-y-auto overscroll-contain relative before:absolute before:-left-3 before:top-0 before:w-3 before:h-full [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 transition-all duration-150"
                        >
                          {allSpecialProds.map(p => (
                            <Link
                              key={p._id}
                              to={getPath(`/products/${p.slug}`)}
                              className="block px-3.5 py-2 text-[13.5px] font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors mx-1 truncate"
                            >
                              {p.title}
                            </Link>
                          ))}
                        </div>
                      );
                    })()}

                    {/* Tier 3 for Special Products */}
                    {(() => {
                      if (!hoveredSpecialSubcategory) return null;
                      const subProds = getProductsBySubcategory(hoveredSpecialSubcategory, true);
                      if (subProds.length === 0) return null;

                      const categoriesWithSpecial = dbCategories.filter(c => getProductsByCategory(c._id, true).length > 0);
                      const hoveredCatIndex = Math.max(0, categoriesWithSpecial.findIndex(c => c._id === hoveredSpecialCategory));
                      const activeSubs = getSubcategoriesByCategory(hoveredSpecialCategory).filter(s => getProductsBySubcategory(s._id, true).length > 0);
                      const subIndex = Math.max(0, activeSubs.findIndex(s => s._id === hoveredSpecialSubcategory));

                      const itemHeight = 35;
                      const tier2ItemCount = activeSubs.length + (getDirectCategoryProducts(hoveredSpecialCategory, true).length > 0 ? getDirectCategoryProducts(hoveredSpecialCategory, true).length + 0.5 : 0);
                      const tier2Height = Math.max(40, tier2ItemCount * itemHeight);
                      const maxOffset = Math.max(0, (categoriesWithSpecial.length * 35) - tier2Height);
                      const tier2Top = Math.min(hoveredCatIndex * 35, maxOffset);

                      const isLargeList = subProds.length > 8;
                      const tier3Height = subProds.length * itemHeight;
                      const maxSubOffset = Math.max(0, tier2Height - tier3Height);
                      const tier3Top = isLargeList ? 0 : (tier2Top + Math.min(subIndex * itemHeight, maxSubOffset));

                      const sortedSubProds = [...subProds].sort((a, b) => {
                        const numA = parseInt((a.title.match(/(\d+)\s*Dyne/i) || [])[1]);
                        const numB = parseInt((b.title.match(/(\d+)\s*Dyne/i) || [])[1]);
                        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
                        return (a.title || '').localeCompare(b.title || '');
                      });

                      return (
                        <div
                          style={{
                            marginTop: `${tier3Top}px`,
                            maxHeight: isLargeList ? 'calc(100vh - 100px)' : `calc(100vh - 100px - ${tier3Top}px)`
                          }}
                          className="w-72 bg-white border border-gray-200/90 rounded-xl shadow-xl py-1 pb-3 ml-1 h-fit overflow-y-auto overscroll-contain relative before:absolute before:-left-3 before:top-0 before:w-3 before:h-full [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 transition-all duration-150"
                        >
                          {sortedSubProds.map(p => (
                            <Link
                              key={p._id}
                              to={getPath(`/products/${p.slug}`)}
                              className="block px-3.5 py-2 text-[13.5px] font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors mx-1 truncate"
                            >
                              {p.title}
                            </Link>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Button & Phone */}
          <div className="hidden lg:flex items-center gap-3 lg:gap-4">
            <a
              href="tel:+918448441345"
              className={`flex items-center gap-2 font-bold text-[13px] lg:text-[14px] transition-all hover:scale-105 px-4 py-2 rounded-full animate-pulse hover:animate-none ${isTransparent ? 'bg-orange-500 text-white shadow-lg' : 'bg-orange-500 text-white shadow-md hover:bg-orange-600'}`}
            >
              <Phone className="w-4 h-4" />
              +91 8448441345
            </a>
            <button
              onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
              className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-5 py-2.5 rounded font-bold text-[13px] flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
            >
              <FileText className="w-4 h-4" />
              GET A QUOTE
            </button>
          </div>

          {/* Mobile Quick Actions & Menu Button */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
            <a
              href="tel:+918448441345"
              className={`flex items-center gap-1 px-2 py-1.5 rounded-md font-bold text-[10px] sm:text-[11px] animate-pulse ${isTransparent ? 'bg-orange-500 text-white shadow-md' : 'bg-orange-500 text-white shadow-sm'}`}
            >
              <Phone className="w-3 h-3" />
              +91 8448441345
            </a>
            <button
              onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
              className="bg-[#1e3a8a] text-white px-2 py-1.5 rounded-md font-bold text-[10px] sm:text-[11px] flex items-center gap-1 shadow-sm"
            >
              <FileText className="w-3 h-3" />
              QUOTE
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1 focus:outline-none transition-colors ${isTransparent ? 'text-gray-900 bg-white/80 rounded-md' : 'text-gray-900'}`}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
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
                      <Link to={getPath(link.path)} className="font-bold text-gray-800 text-lg w-full hover:text-blue-600 transition-colors">{link.name}</Link>
                    )}
                    {link.hasDropdown && (
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openMobileDropdown === link.name ? 'rotate-180' : ''}`} />
                    )}
                  </div>

                  {/* Render accordion content if this dropdown is open */}
                  {link.hasDropdown && openMobileDropdown === link.name && (
                    <div className="flex flex-col pl-4 gap-4 py-3 border-l-2 border-gray-100 ml-2 mt-1">
                      <Link to={getPath(link.path)} className="text-[15px] font-bold text-blue-600">
                        View All {link.name} →
                      </Link>
                      {dbCategories.map(category => {
                        const isSpecialNav = link.name === 'Special Product';
                        const categorySubs = getSubcategoriesByCategory(category._id).filter(s => {
                          return !isSpecialNav || getProductsBySubcategory(s._id, true).length > 0;
                        });
                        const directProds = getDirectCategoryProducts(category._id, isSpecialNav);
                        const categoryProds = getProductsByCategory(category._id, isSpecialNav);

                        if (categoryProds.length === 0 && categorySubs.length === 0) return null;

                        return (
                          <div key={category._id} className="flex flex-col gap-2">
                            <Link 
                              to={isSpecialNav ? `/special-product?category=${category.slug}` : `${getPath('/products')}?category=${category.slug}`} 
                              className="font-bold text-[14px] text-gray-800 hover:text-blue-600"
                            >
                              {category.name}
                            </Link>

                            {/* If category has subcategories */}
                            {categorySubs.length > 0 && (
                              <div className="flex flex-col pl-3 gap-3 mt-1 border-l border-gray-200">
                                {categorySubs.map(sub => {
                                  const subProds = getProductsBySubcategory(sub._id, isSpecialNav);
                                  return (
                                    <div key={sub._id} className="flex flex-col gap-1.5">
                                      <Link
                                        to={isSpecialNav ? `/special-product?subcategory=${sub.slug}` : `${getPath('/products')}?subcategory=${sub.slug}`}
                                        className="text-[13px] font-bold text-gray-700 hover:text-blue-600"
                                      >
                                        ↳ {sub.name}
                                      </Link>
                                      {subProds.length > 0 && (
                                        <div className="flex flex-col pl-3 gap-1 border-l border-gray-100">
                                          {subProds.map(p => (
                                            <Link
                                              key={p._id}
                                              to={getPath(`/products/${p.slug}`)}
                                              className="text-[12.5px] font-medium text-gray-500 hover:text-blue-600 pl-1"
                                            >
                                              {p.title}
                                            </Link>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}

                                {directProds.length > 0 && (
                                  <div className="flex flex-col gap-1 mt-1">
                                    <span className="text-[11px] font-semibold text-gray-400 uppercase">Other Products</span>
                                    {directProds.map(p => (
                                      <Link
                                        key={p._id}
                                        to={getPath(`/products/${p.slug}`)}
                                        className="text-[12.5px] font-medium text-gray-500 hover:text-blue-600 pl-2"
                                      >
                                        {p.title}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* If category has NO subcategories, list its products directly */}
                            {categorySubs.length === 0 && (
                              <div className="flex flex-col pl-3 gap-2 mt-1 border-l border-gray-100">
                                {categoryProds.map(p => (
                                  <Link
                                    key={p._id}
                                    to={getPath(`/products/${p.slug}`)}
                                    className="text-[13.5px] font-medium text-gray-500 hover:text-blue-600 pl-2"
                                  >
                                    {p.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {/* Mobile Actions */}
          <div className="flex flex-col gap-3 mt-2">
            <a
              href="tel:+918448441345"
              className="bg-orange-500 text-white px-5 py-3.5 rounded font-bold text-[16px] w-full text-center flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-md"
            >
              <Phone className="w-5 h-5" />
              +91 8448441345
            </a>
            <button
              onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
              className="bg-[#1e3a8a] text-white px-5 py-3.5 rounded font-bold text-[16px] w-full text-center flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              GET A QUOTE
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
