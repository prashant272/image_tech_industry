import React from 'react';
import { ArrowLeft, Clock, User, Link as LinkIcon, Search, CheckCircle } from 'lucide-react';

const BlogPreview = ({ blog, categories = [] }) => {
  return (
    <div className="w-full h-full bg-[#f8f9fa] overflow-y-auto custom-scrollbar font-sans text-gray-900">
      <div className="max-w-[95rem] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Main Content */}
          <div className="w-full lg:w-[70%] bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
            <div className="inline-flex items-center gap-2 text-[13px] font-bold text-blue-600 mb-8">
              <ArrowLeft className="w-4 h-4" /> BACK TO BLOGS
            </div>

            <div className="bg-blue-50/80 text-blue-700 text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-lg inline-block mb-5 border border-blue-100/50">
              {blog.categoryName || 'Category Name'}
            </div>

            <h1 className="text-[36px] sm:text-[44px] font-black leading-[1.15] text-[#0f172a] mb-6 tracking-tight">
              {blog.title || 'Your Blog Title'}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-8 mb-10 gap-6">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] font-bold text-gray-500">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-600" /> {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className="flex items-center gap-2"><User className="w-4 h-4 text-blue-600" /> {blog.author || 'Author Name'}</span>
              </div>
            </div>

            <div className="w-full h-[350px] sm:h-[500px] rounded-2xl overflow-hidden mb-12 relative group shadow-lg bg-gray-100 flex items-center justify-center">
              {blog.thumbnailUrl ? (
                <img src={blog.thumbnailUrl} alt={blog.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 font-bold text-xl">Image Placeholder</span>
              )}
            </div>

            {/* Dynamic Content Renderer */}
            <div 
                className="prose prose-lg max-w-none text-gray-600 font-medium leading-loose text-[16px]"
                dangerouslySetInnerHTML={{ __html: blog.content || '<p>Start writing your blog content...</p>' }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-semibold">{tag}</span>
                        ))}
                    </div>
                </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full lg:w-[30%] flex flex-col gap-8">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="text-[18px] font-black text-[#0f172a] mb-6 tracking-tight">Categories</h3>
              <ul className="space-y-2">
                {categories.map((cat, i) => (
                  <li key={i}>
                    <div className={`flex justify-between items-center text-[14px] font-bold py-3 px-4 rounded-xl transition-all ${cat._id === blog.category ? 'bg-blue-600 text-white' : 'text-gray-600'}`}>
                      <span className="flex items-center gap-2.5">
                        <CheckCircle className={`w-4 h-4 ${cat._id === blog.category ? 'text-white/80' : 'text-blue-600'}`} /> {cat.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
