import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';
import { Calendar, ArrowRightCircle } from 'lucide-react';
import CTA from '../components/home/CTA';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get('/blogs?status=published');
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-0 bg-[#f8f9fa] min-h-screen font-sans text-gray-900">
      
      {/* Header Section */}
      <div className="bg-[#0f172a] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-blue-500"></span>
            <h4 className="text-blue-400 font-bold tracking-[0.2em] uppercase text-[12px] md:text-[14px]">
              KNOWLEDGE HUB
            </h4>
            <span className="w-12 h-[2px] bg-blue-500"></span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Our Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Insights</span>
          </h1>
          <p className="text-[16px] md:text-[18px] text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Discover the latest trends, expert advice, and technical guides in the printing and packaging industry.
          </p>
        </div>
      </div>

      {/* Main Blog Grid */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {isLoading ? (
          <div className="text-center py-20 text-gray-500 font-bold">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-bold">No blogs found.</div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col group">
              
              <div className="relative h-56 overflow-hidden bg-gray-100 flex items-center justify-center">
                {blog.thumbnailUrl ? (
                  <img 
                    src={blog.thumbnailUrl} 
                    alt={blog.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <span className="text-gray-400 font-bold">No Image</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-blue-700 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded shadow-sm">
                  {blog.category?.name || 'Category'}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-[13px] font-bold">
                    {new Date(blog.publishedDate || blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                
                <h3 className="text-[20px] font-black text-[#0f172a] mb-4 leading-snug group-hover:text-blue-600 transition-colors">
                  <Link to={`/blog/${blog.slug}`} className="line-clamp-2">
                    {blog.title}
                  </Link>
                </h3>
                
                <p className="text-[14px] text-gray-600 font-medium leading-relaxed mb-8 line-clamp-3 flex-grow">
                  {blog.excerpt}
                </p>
                
                <Link to={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 text-blue-600 font-black text-[13px] group-hover:gap-3 transition-all mt-auto uppercase tracking-wider">
                  Read Full Article
                  <ArrowRightCircle className="w-5 h-5" />
                </Link>
              </div>

            </div>
          ))}
        </div>
        )}
      </div>

      <CTA />
    </div>
  );
}
