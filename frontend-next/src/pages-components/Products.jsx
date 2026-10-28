'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from '@/compat/react-router';
import { 
  Search, ChevronDown, ChevronRight, Layers, Grid, List, Bookmark, 
  CheckCircle2, ShieldCheck, Truck, Headset, Settings, Play
} from 'lucide-react';
import apiClient from '../api/client';
import { isVideoUrl, getFirstImageUrl, hasVideoMedia } from '../lib/mediaUtils';

export default function Products({ isSpecialOnly = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const isSpecial = Boolean(
    isSpecialOnly || 
    (typeof window !== 'undefined' && window.location.pathname.includes('special-product')) || 
    new URLSearchParams(location.search).get('special') === 'true'
  );
  const defaultCategoryTitle = isSpecial ? 'All Special Products' : 'All Products';
  const [activeCategory, setActiveCategory] = useState(defaultCategoryTitle);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  
  const [dbCategories, setDbCategories] = useState([]);
  const [dbSubcategories, setDbSubcategories] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch products & categories once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, subRes, prodRes] = await Promise.all([
          apiClient.get('/categories'),
          apiClient.get('/subcategories'),
          apiClient.get('/products')
        ]);
        
        const fetchedCategories = (catRes.data || []).filter(c => c.status === 'Active');
        const fetchedSubcategories = (subRes.data || []).filter(s => s.status === 'Active');
        setDbCategories(fetchedCategories);
        setDbSubcategories(fetchedSubcategories);
        setDbProducts(prodRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Sync activeCategory IMMEDIATELY whenever URL query string changes
  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const subcategoryParam = params.get('subcategory');

    if (subcategoryParam) {
      const targetSub = subcategoryParam.toLowerCase().trim();
      const matchedSub = dbSubcategories.find(s => 
        s.slug?.toLowerCase() === targetSub || 
        s.name?.toLowerCase() === targetSub ||
        s.name?.toLowerCase().replace(/\s+/g, '-') === targetSub
      );
      if (matchedSub) {
        setActiveCategory(matchedSub.name);
        return;
      }
    }

    if (categoryParam) {
      const targetCat = categoryParam.toLowerCase().trim();
      const matchedCat = dbCategories.find(c => 
        c.slug?.toLowerCase() === targetCat || 
        c.name?.toLowerCase() === targetCat ||
        c.name?.toLowerCase().replace(/\s+/g, '-') === targetCat
      );
      if (matchedCat) {
        setActiveCategory(matchedCat.name);
        return;
      }
    }

    if (!categoryParam && !subcategoryParam) {
      setActiveCategory(defaultCategoryTitle);
    }
  }, [location.search, dbCategories, dbSubcategories, defaultCategoryTitle]);

  // Reset to first page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const handleSelectCategory = (cat) => {
    setActiveCategory(cat.name);
    const basePath = isSpecial ? '/special-product' : (location.pathname?.startsWith('/special') ? '/special-product' : (location.pathname || '/products'));
    if (cat._id === 'all') {
      navigate(basePath);
    } else {
      const slug = cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`${basePath}?category=${slug}`);
    }
  };

  const handleSelectSubcategory = (sub) => {
    setActiveCategory(sub.name);
    const basePath = isSpecial ? '/special-product' : (location.pathname?.startsWith('/special') ? '/special-product' : (location.pathname || '/products'));
    const slug = sub.slug || sub.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`${basePath}?subcategory=${slug}`);
  };

  const availableProducts = isSpecial ? dbProducts.filter(p => Boolean(p.isSpecial)) : dbProducts;

  const categories = [
    { _id: 'all', name: defaultCategoryTitle, count: availableProducts.length },
    ...dbCategories
      .filter(cat => !isSpecial || availableProducts.some(p => p.category?._id === cat._id))
      .map(cat => ({
        _id: cat._id,
        name: cat.name,
        slug: cat.slug,
        count: availableProducts.filter(p => p.category?._id === cat._id).length
      }))
  ];

  const productsList = availableProducts.map(p => {
    const media = p.images || [];
    const firstImg = getFirstImageUrl(media, '');
    const hasVideo = hasVideoMedia(media);
    return {
      ...p,
      categoryName: p.category?.name?.toUpperCase() || 'N/A',
      subcategoryName: p.subcategory?.name || null,
      image: firstImg,
      hasVideo: hasVideo,
      desc: p.shortDesc || ''
    };
  });

  const filteredProducts = productsList.filter(product => {
    const isAll = activeCategory === 'All Products' || activeCategory === 'All Special Products';
    const matchesCategory = isAll || 
      (product.category?.name && product.category.name.toLowerCase() === activeCategory.toLowerCase()) ||
      (product.subcategory?.name && product.subcategory.name.toLowerCase() === activeCategory.toLowerCase());
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || product.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden mb-10 py-10 bg-white border-b border-gray-200">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-3">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-800">{isSpecial ? 'Special Products' : 'All Products'}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            {isSpecial ? 'Special Products' : 'All Products'}
          </h1>
          <p className="text-gray-600 font-medium text-[16px] max-w-3xl leading-relaxed">
            {isSpecial 
              ? 'Explore our exclusive range of high-performance special products designed for precision and extreme durability.'
              : 'Explore our complete range of precision-engineered products for the printing, packaging, and quality control industry.'}
          </p>
        </div>

        {/* Decorative Gear Background */}
        <div className="absolute right-10 lg:right-32 top-1/2 -translate-y-1/2 text-gray-50 opacity-80 pointer-events-none hidden md:block">
           <Settings className="w-80 h-80" strokeWidth={0.5} />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-1/4 shrink-0 space-y-6">
            
            {/* Product Categories Box */}
            <div className="bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-[16px] text-gray-900 mb-5">Product Categories</h3>
              <ul className="space-y-1.5">
                {categories.map((cat, idx) => {
                  const isActive = activeCategory.toLowerCase() === cat.name.toLowerCase();
                  const subcats = cat._id === 'all' 
                    ? [] 
                    : dbSubcategories.filter(s => (s.category?._id === cat._id || s.category === cat._id) && (!isSpecial || availableProducts.some(p => p.subcategory?._id === s._id)));

                  return (
                    <li key={idx} className="space-y-1">
                      <button 
                        onClick={() => handleSelectCategory(cat)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px] font-semibold transition-all duration-200 ${isActive ? 'bg-[#1e3a8a] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                      >
                        <span className="flex items-center gap-3">
                          {isActive ? (
                            <Grid className="w-4 h-4" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                          )}
                          <span className="truncate">{cat.name}</span>
                        </span>
                        <span className={`text-[12px] px-2.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          {cat.count}
                        </span>
                      </button>

                      {/* Subcategories list if any */}
                      {subcats.length > 0 && (
                        <ul className="pl-6 pr-1 py-1 space-y-1 border-l-2 border-gray-100 ml-4">
                          {subcats.map((sub) => {
                            const isSubActive = activeCategory.toLowerCase() === sub.name.toLowerCase();
                            const subProductCount = availableProducts.filter(p => p.subcategory?._id === sub._id || p.subcategory === sub._id).length;
                            return (
                              <li key={sub._id}>
                                <button
                                  onClick={() => handleSelectSubcategory(sub)}
                                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150 ${
                                    isSubActive 
                                      ? 'bg-blue-50 text-[#1e3a8a] font-bold shadow-xs' 
                                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                  }`}
                                >
                                  <span className="flex items-center gap-1.5 truncate">
                                    <ChevronRight className={`w-3.5 h-3.5 ${isSubActive ? 'text-[#1e3a8a]' : 'text-gray-400'}`} />
                                    <span className="truncate">{sub.name}</span>
                                  </span>
                                  <span className={`text-[11px] px-2 py-0.2 rounded-full font-semibold ${isSubActive ? 'bg-blue-100 text-[#1e3a8a]' : 'bg-gray-100 text-gray-400'}`}>
                                    {subProductCount}
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Need Help CTA */}
            <div className="bg-white rounded-xl border-2 border-[#1e3a8a]/20 p-6 text-center shadow-sm relative overflow-hidden group">
              <div className="w-12 h-12 bg-blue-50 text-[#1e3a8a] rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                <Headset className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Need Custom Tooling?</h4>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed font-medium">
                Our engineering team manufactures tailored doctor blades and machine parts per specifications.
              </p>
              <button 
                type="button"
                onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
                className="w-full bg-[#1e3a8a] hover:bg-[#152960] text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors shadow-sm"
              >
                REQUEST CUSTOM SPECS
              </button>
            </div>

          </div>

          {/* Right Main Content */}
          <div className="w-full lg:w-3/4">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mb-10 bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-gray-200 shadow-sm">
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-5 py-3 bg-white border border-gray-200 rounded-lg text-[14px] font-medium text-gray-900 focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/20 transition-all shadow-sm placeholder:text-gray-400"
                />
              </div>

              {/* Drops & Toggles */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-full sm:w-48 group">
                  <select 
                    value={activeCategory}
                    onChange={(e) => {
                      const val = e.target.value;
                      const basePath = isSpecial ? '/special-product' : (location.pathname?.startsWith('/special') ? '/special-product' : (location.pathname || '/products'));
                      if (val === defaultCategoryTitle) {
                        setActiveCategory(defaultCategoryTitle);
                        navigate(basePath);
                      } else {
                        const matchedCat = dbCategories.find(c => c.name.toLowerCase() === val.toLowerCase());
                        const matchedSub = dbSubcategories.find(s => s.name.toLowerCase() === val.toLowerCase());
                        if (matchedSub) {
                          setActiveCategory(matchedSub.name);
                          navigate(`${basePath}?subcategory=${matchedSub.slug || matchedSub.name.toLowerCase().replace(/\s+/g, '-')}`);
                        } else if (matchedCat) {
                          setActiveCategory(matchedCat.name);
                          navigate(`${basePath}?category=${matchedCat.slug || matchedCat.name.toLowerCase().replace(/\s+/g, '-')}`);
                        } else {
                          setActiveCategory(val);
                        }
                      }
                    }}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 text-[14px] font-semibold text-gray-700 focus:outline-none focus:border-[#1e3a8a] cursor-pointer shadow-sm hover:border-gray-300 transition-colors"
                  >
                    <option value={defaultCategoryTitle}>{defaultCategoryTitle}</option>
                    {categories.filter(c => c._id !== 'all').map((cat) => {
                      const subcats = dbSubcategories.filter(s => (s.category?._id === cat._id || s.category === cat._id) && (!isSpecial || availableProducts.some(p => p.subcategory?._id === s._id)));
                      if (subcats.length > 0) {
                        return (
                          <optgroup key={cat._id} label={cat.name}>
                            <option value={cat.name}>All {cat.name} ({cat.count})</option>
                            {subcats.map((s) => (
                              <option key={s._id} value={s.name}>&nbsp;&nbsp;↳ {s.name}</option>
                            ))}
                          </optgroup>
                        );
                      }
                      return (
                        <option key={cat._id} value={cat.name}>{cat.name} ({cat.count})</option>
                      );
                    })}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none group-hover:text-gray-800 transition-colors" />
                </div>
                
                <div className="relative w-full sm:w-48 group">
                  <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 text-[14px] font-semibold text-gray-700 focus:outline-none focus:border-[#1e3a8a] cursor-pointer shadow-sm hover:border-gray-300 transition-colors">
                    <option>Sort By: Featured</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none group-hover:text-gray-800 transition-colors" />
                </div>

                {/* View Mode Buttons */}
                <div className="hidden sm:flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white text-[#1e3a8a] shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-[#1e3a8a] shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {currentProducts.map((product, idx) => (
                <div 
                  key={idx} 
                  onClick={() => navigate(`/products/${product.slug}`)}
                  className={`bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#1e3a8a]/40 transition-all duration-300 group cursor-pointer ${viewMode === 'list' ? 'flex items-center gap-4' : 'flex flex-col'}`}
                >
                  
                  {/* Image Container */}
                  <Link 
                    to={`/products/${product.slug}`}
                    className={`relative bg-gray-50 border-b border-gray-200 flex items-center justify-center p-1 sm:p-2 ${viewMode === 'list' ? 'w-48 h-48 shrink-0' : 'w-full h-56 sm:h-64'}`}
                  >
                    {isVideoUrl(product.image) ? (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center relative rounded-lg overflow-hidden">
                        <video src={product.image} className="w-full h-full object-cover opacity-70" preload="metadata" muted />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="w-10 h-10 text-white fill-white drop-shadow-lg" />
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                           e.target.onerror = null; 
                           e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCA4MDAgNjAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBzbGljZSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YxZjVmOSIgLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5NDkzYjgiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                    )}
                    {product.isSpecial && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider bg-orange-500 text-white shadow-sm uppercase z-10">
                        Special
                      </span>
                    )}
                    {product.hasVideo && (
                      <span className={`absolute top-3 ${product.isSpecial ? 'left-20' : 'left-3'} px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider bg-purple-600 text-white shadow-sm flex items-center gap-1 z-10 uppercase`}>
                        <Play className="w-2.5 h-2.5 fill-white" /> Video
                      </span>
                    )}
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-md flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors shadow-sm z-10"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </Link>

                  {/* Content */}
                  <div className={`p-5 flex flex-col flex-grow ${viewMode === 'list' ? 'justify-center' : ''}`}>
                    <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider mb-1.5 flex-wrap">
                      <span className="text-blue-700">{product.categoryName}</span>
                      {product.subcategoryName && (
                        <>
                          <span className="text-gray-300 font-normal">/</span>
                          <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-bold text-[10px] lowercase first-letter:uppercase">
                            {product.subcategoryName}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-[17px] font-black text-black mb-2 leading-tight group-hover:text-[#1e3a8a] transition-colors">
                      <Link to={`/products/${product.slug}`} className="hover:text-[#1e3a8a]">
                        {product.title}
                      </Link>
                    </h3>
                    <p className="text-gray-800 text-[13.5px] font-medium leading-relaxed mb-5 flex-grow line-clamp-2">
                      {product.desc}
                    </p>
                    
                    {/* Buttons */}
                    <div className="flex items-center gap-2 mt-auto">
                      <Link 
                        to={`/products/${product.slug}`} 
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center py-2 rounded-lg border-2 border-gray-300 text-gray-800 font-bold text-[12px] hover:bg-gray-100 hover:border-gray-400 hover:text-black transition-all"
                      >
                        VIEW DETAILS
                      </Link>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.dispatchEvent(new Event('open-quote-modal'));
                        }}
                        className="flex-1 text-center py-2 rounded-lg bg-[#1e3a8a] text-white font-bold text-[12px] hover:bg-[#152960] transition-all"
                      >
                        GET A QUOTE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {currentProducts.length === 0 && (
                <div className="col-span-full py-16 px-4 text-center bg-white rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-gray-800 font-bold text-lg mb-2">No products found</p>
                  <p className="text-gray-500 text-sm">There are no products matching your selected category or search filter.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-4">
                <div className="flex items-center gap-1.5">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                     <span className="sr-only">Previous</span>
                     &lsaquo;
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md font-bold text-[14px] shadow-sm transition-colors ${currentPage === i + 1 ? 'bg-[#1e3a8a] text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                    >
                       {i + 1}
                    </button>
                  ))}

                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                     <span className="sr-only">Next</span>
                     &rsaquo;
                  </button>
                </div>
                <p className="text-[13.5px] font-bold text-gray-600">
                  Showing {(currentPage - 1) * productsPerPage + 1} to {Math.min(currentPage * productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
