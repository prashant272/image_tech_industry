import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, ChevronDown, Grid, List, Bookmark, 
  CheckCircle2, ShieldCheck, Truck, Headset, Settings
} from 'lucide-react';
import apiClient from '../api/client';

export default function Products() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  
  const [dbCategories, setDbCategories] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, prodRes] = await Promise.all([
          apiClient.get('/categories'),
          apiClient.get('/products')
        ]);
        
        const fetchedCategories = catRes.data.filter(c => c.status === 'Active') || [];
        setDbCategories(fetchedCategories);
        setDbProducts(prodRes.data || []);
        
        if (categoryParam) {
          const matchedCat = fetchedCategories.find(c => c.slug === categoryParam);
          if (matchedCat) {
            setActiveCategory(matchedCat.name);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location.search]);

  // Reset to first page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const categories = [
    { name: 'All Products', count: dbProducts.length },
    ...dbCategories.map(cat => ({
      name: cat.name,
      count: dbProducts.filter(p => p.category?._id === cat._id).length
    }))
  ];

  const productsList = dbProducts.map(p => ({
    ...p,
    categoryName: p.category?.name?.toUpperCase() || 'N/A',
    image: p.images && p.images.length > 0 ? p.images[0] : '',
    desc: p.shortDesc || ''
  }));

  const filteredProducts = productsList.filter(product => {
    const matchesCategory = activeCategory === 'All Products' || (product.category?.name && product.category.name.toLowerCase() === activeCategory.toLowerCase());
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || product.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="pt-24 pb-16 bg-[#f4f7f5] min-h-screen text-black font-sans relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[150px] opacity-70 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute top-[30%] left-0 w-[600px] h-[600px] bg-yellow-100/30 rounded-full blur-[120px] opacity-50 -translate-x-1/2 pointer-events-none"></div>

      {/* 1. Header Section */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 relative overflow-hidden mb-12 shadow-sm">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-500 mb-4">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-gray-800">All Products</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">All Products</h1>
          <p className="text-gray-600 font-medium text-[16px] max-w-3xl leading-relaxed">
            Explore our complete range of precision-engineered products for the printing, packaging, and quality control industry.
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
              <ul className="space-y-1">
                {categories.map((cat, idx) => {
                  const isActive = activeCategory === cat.name;
                  return (
                  <li key={idx}>
                    <button 
                      onClick={() => setActiveCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px] font-semibold transition-all duration-200 ${isActive ? 'bg-[#1e3a8a] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                    >
                      <span className="flex items-center gap-3">
                        {isActive ? (
                          <Grid className="w-4 h-4" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                        )}
                        {cat.name}
                      </span>
                      <span className={`text-[12px] px-2.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {cat.count}
                      </span>
                    </button>
                  </li>
                  )
                })}
              </ul>
            </div>

            {/* Need Help CTA */}
            <div className="bg-white rounded-xl border-2 border-[#1e3a8a]/20 p-6 text-center shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#1e3a8a]"></div>
              <div className="w-12 h-12 bg-blue-50 rounded-full shadow-sm border border-blue-100 flex items-center justify-center text-[#1e3a8a] mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[16px] text-gray-900 mb-2">Need Help Choosing?</h4>
              <p className="text-gray-600 text-[13.5px] font-medium leading-relaxed mb-6">
                Our experts are here to help you find the exactly right product.
              </p>
              <Link to="/contact" className="inline-block w-full py-2.5 rounded-lg border-2 border-[#1e3a8a] text-[#1e3a8a] font-bold text-[13.5px] hover:bg-[#1e3a8a] hover:text-white transition-colors duration-300 shadow-sm">
                CONTACT US
              </Link>
            </div>

          </div>

          {/* Right Main Area */}
          <div className="w-full lg:w-3/4 flex flex-col">
            
            {/* Top Bar (Search & Filters) */}
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
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 text-[14px] font-semibold text-gray-700 focus:outline-none focus:border-[#1e3a8a] cursor-pointer shadow-sm hover:border-gray-300 transition-colors"
                  >
                    {categories.map((cat, i) => (
                      <option key={i} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none group-hover:text-gray-800 transition-colors" />
                </div>
                
                <div className="relative w-full sm:w-48 group">
                  <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 text-[14px] font-semibold text-gray-700 focus:outline-none focus:border-[#1e3a8a] cursor-pointer shadow-sm hover:border-gray-300 transition-colors">
                    <option>Sort By: Featured</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none group-hover:text-black transition-colors" />
                </div>

                <div className="hidden sm:flex items-center bg-gray-100 border border-gray-200 rounded-xl p-1.5 shadow-inner">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-[#1e3a8a] shadow-sm font-bold' : 'text-gray-500 hover:text-black'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-[#1e3a8a] shadow-sm font-bold' : 'text-gray-500 hover:text-black'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {currentProducts.map((product, idx) => (
                <div key={idx} className={`bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#1e3a8a]/40 transition-all duration-300 group ${viewMode === 'list' ? 'flex items-center gap-4' : 'flex flex-col'}`}>
                  
                  {/* Image Container */}
                  <div className={`relative bg-gray-50 border-b border-gray-200 ${viewMode === 'list' ? 'w-48 h-48 shrink-0' : 'w-full h-36 sm:h-44'}`}>
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                         e.target.onerror = null; 
                         e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCA4MDAgNjAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBzbGljZSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YxZjVmOSIgLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5NDkzYjgiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4='; // Simple gray SVG placeholder fallback
                      }}
                    />
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-md flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors shadow-sm">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className={`p-5 flex flex-col flex-grow ${viewMode === 'list' ? 'justify-center' : ''}`}>
                    <span className="text-[11px] font-black text-blue-700 uppercase tracking-widest mb-1.5 block">
                      {product.categoryName}
                    </span>
                    <h3 className="text-[17px] font-black text-black mb-2 leading-tight group-hover:text-[#1e3a8a] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-800 text-[13.5px] font-medium leading-relaxed mb-5 flex-grow line-clamp-2">
                      {product.desc}
                    </p>
                    
                    {/* Buttons */}
                    <div className="flex items-center gap-2 mt-auto">
                      <Link to={`/products/${product.slug}`} className="flex-1 text-center py-2 rounded-lg border-2 border-gray-300 text-gray-800 font-bold text-[12px] hover:bg-gray-100 hover:border-gray-400 hover:text-black transition-all">
                        VIEW DETAILS
                      </Link>
                      <button 
                        onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
                        className="flex-1 text-center py-2 rounded-lg bg-[#1e3a8a] text-white font-bold text-[12px] hover:bg-[#152960] transition-all"
                      >
                        GET A QUOTE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
