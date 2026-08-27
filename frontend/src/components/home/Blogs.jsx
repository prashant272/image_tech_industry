import React, { useEffect, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/client';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get('/blogs?status=published');
      setBlogs(res.data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-6 lg:py-8 bg-[#fafcff] relative font-sans" id="blogs">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#1d4ed8]"></span>
            <h4 className="text-[#1d4ed8] font-bold tracking-[0.15em] uppercase text-[12px] md:text-[13px]">
              OUR BLOGS
            </h4>
            <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-[#1d4ed8]"></span>
          </div>
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-black text-[#0f172a] leading-[1.2] tracking-tighter mb-4">
            Latest Blogs
          </h2>
          <p className="text-[15px] lg:text-[17px] text-gray-500 font-medium">
            Explore expert insights, industry trends, product knowledge, and packaging industry updates from professionals.
          </p>
        </div>

        {/* Blogs Grid */}
        {isLoading ? (
          <div className="text-center text-gray-500 font-bold py-10">Loading latest blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500 font-bold py-10">No blogs published yet.</div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {blogs.map((blog) => (
            <div 
              key={blog._id} 
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_-10px_rgba(29,78,216,0.12)] hover:border-[#1d4ed8]/20 transition-all duration-300 group flex flex-col h-full"
            >
              {/* Image */}
              <div className="w-full h-44 lg:h-[180px] overflow-hidden relative bg-gray-100 flex items-center justify-center">
                {blog.thumbnailUrl ? (
                  <img 
                    src={blog.thumbnailUrl} 
                    alt={blog.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-gray-400 font-bold">No Image</span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 lg:p-6 flex flex-col flex-grow">
                <span className="text-[#1d4ed8] text-[11px] font-bold tracking-wider uppercase mb-2 block">
                  {blog.category?.name || 'Category'}
                </span>
                <h3 className="text-[16px] lg:text-[18px] font-bold text-[#0f172a] leading-snug mb-3 group-hover:text-[#1d4ed8] transition-colors duration-300 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-[13.5px] text-gray-500 font-medium leading-relaxed mb-6 flex-grow line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[13px] font-medium">{new Date(blog.publishedDate || blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <Link to={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 text-[#1d4ed8] font-bold text-[12px] md:text-[13px] hover:text-[#0f172a] transition-colors group/link mt-auto">
                    READ MORE
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* View All Button */}
        <div className="mt-14 flex justify-center">
          <Link to="/blog" className="flex items-center gap-2 px-8 py-3.5 border-2 border-[#1d4ed8]/20 text-[#1d4ed8] rounded-xl font-bold text-[14px] hover:bg-[#1d4ed8] hover:text-white hover:border-[#1d4ed8] transition-all duration-300">
            VIEW ALL BLOGS
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Blogs;
