import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../api/client';
import { 
  ArrowLeft, Clock, User, Link as LinkIcon, 
  Search, CheckCircle, Headset, Shield, Truck
} from 'lucide-react';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogData();
  }, [slug]);

  const fetchBlogData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch blog detail
      const res = await apiClient.get(`/blogs/${slug}`);
      setBlog(res.data);
      
      // Fetch categories
      const catRes = await apiClient.get('/blog-categories');
      setCategories(catRes.data);

      // Fetch recent posts
      const recentRes = await apiClient.get('/blogs?status=published');
      setRecentPosts(recentRes.data.slice(0, 4));
      
    } catch (error) {
      console.error('Error fetching blog data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen flex items-center justify-center">
        <div className="text-xl font-bold text-gray-500">Loading Blog...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
        <Link to="/blog" className="text-blue-600 hover:underline">Return to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-[#f8f9fa] min-h-screen font-sans text-gray-900">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-500 mb-6 mt-2">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>›</span>
          <Link to="/blog" className="hover:text-blue-600 transition-colors">Blogs</Link>
          <span>›</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">{blog.category?.name}</span>
          <span>›</span>
          <span className="text-gray-800">{blog.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Main Content */}
          <div className="w-full lg:w-[70%] bg-white rounded-3xl p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
            <Link to="/blog" className="inline-flex items-center gap-2 text-[13px] font-bold text-blue-600 mb-8 hover:gap-3 transition-all duration-300">
              <ArrowLeft className="w-4 h-4" />
              BACK TO BLOGS
            </Link>

            <div className="bg-blue-50/80 text-blue-700 text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-lg inline-block mb-5 border border-blue-100/50">
              {blog.category?.name}
            </div>

            <h1 className="text-[36px] sm:text-[44px] font-black leading-[1.15] text-[#0f172a] mb-6 tracking-tight">
              {blog.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-8 mb-10 gap-6">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] font-bold text-gray-500">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-600" /> {new Date(blog.publishedDate || blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className="flex items-center gap-2"><User className="w-4 h-4 text-blue-600" /> {blog.author}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-bold text-gray-500 mr-1">Share:</span>
                <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:bg-[#005e93] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="w-full h-[350px] sm:h-[500px] rounded-2xl overflow-hidden mb-12 relative group shadow-lg">
              {blog.thumbnailUrl ? (
                 <img src={blog.thumbnailUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                 <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image Available</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Dynamic Content Renderer */}
            <div 
               className="prose prose-lg max-w-none text-gray-600 font-medium leading-loose text-[16px] blog-content"
               dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Related Articles Box Removed as it was mock data */}
            <div className="mt-16 text-center">
                <Link to="/blog" className="inline-flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-lg text-[12px] font-bold text-blue-600 hover:bg-gray-50 transition-colors uppercase">
                  VIEW ALL BLOGS <ArrowLeft className="w-3 h-3 rotate-180" />
                </Link>
            </div>

          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full lg:w-[30%] flex flex-col gap-8">
            
            {/* Search */}
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search blogs..." 
                className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-5 pr-14 text-[14px] font-bold text-gray-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all shadow-sm"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Categories */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="text-[18px] font-black text-[#0f172a] mb-6 tracking-tight">Categories</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <Link to={`/blog?category=${cat._id}`} className={`flex justify-between items-center text-[14px] font-bold py-3 px-4 rounded-xl transition-all ${cat._id === blog.category?._id ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-gray-600 hover:bg-[#f0f5fa] hover:text-blue-600'}`}>
                      <span className="flex items-center gap-2.5">
                        <CheckCircle className={`w-4 h-4 ${cat._id === blog.category?._id ? 'text-white/80' : 'text-blue-600'}`} /> {cat.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-[16px] font-black text-gray-900 mb-4">Recent Posts</h3>
              <div className="flex flex-col gap-4">
                {recentPosts.map(post => (
                  <Link key={post._id} to={`/blog/${post.slug}`} className="flex gap-4 group">
                    <img src={post.thumbnailUrl} alt={post.title} loading="lazy" decoding="async" className="w-20 h-16 object-cover rounded-lg shrink-0" />
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <div className="text-[11px] font-bold text-gray-500">
                        {new Date(post.publishedDate || post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Need Expert Advice Box */}
            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] rounded-3xl p-8 text-white text-center relative overflow-hidden shadow-xl shadow-blue-900/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <Headset className="w-24 h-24 absolute -right-4 -bottom-4 text-white/5 rotate-12" />
              <h3 className="text-[22px] font-black mb-3 relative z-10 tracking-tight">Need Expert Advice?</h3>
              <p className="text-[14px] text-blue-100 font-medium mb-8 relative z-10 leading-relaxed">
                Our team is here to help you find the right solution for your application.
              </p>
              <Link to="/contact" className="inline-block bg-white text-blue-600 font-black text-[13px] px-8 py-3.5 rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 relative z-10 shadow-lg tracking-wider">
                CONTACT US
              </Link>
            </div>

            {/* Features Sidebar */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-8">
              <div className="flex gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#f0f5fa] flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Shield className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="pt-1">
                  <h4 className="text-[14px] font-black text-[#0f172a] mb-1">Premium Quality</h4>
                  <p className="text-[13px] font-medium text-gray-500">Manufactured to the highest standards</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#f0f5fa] flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Truck className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="pt-1">
                  <h4 className="text-[14px] font-black text-[#0f172a] mb-1">Fast Delivery</h4>
                  <p className="text-[13px] font-medium text-gray-500">Timely delivery across India & worldwide</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#f0f5fa] flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Headset className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="pt-1">
                  <h4 className="text-[14px] font-black text-[#0f172a] mb-1">Technical Support</h4>
                  <p className="text-[13px] font-medium text-gray-500">Expert assistance from professionals</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-[16px] font-black text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags?.map((tag, idx) => (
                  <span key={idx} className="border border-gray-200 text-gray-600 text-[11px] font-bold px-3 py-1.5 rounded hover:border-blue-600 hover:text-blue-600 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
