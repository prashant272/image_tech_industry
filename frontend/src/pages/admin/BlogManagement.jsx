import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Image as ImageIcon } from 'lucide-react';
import apiClient from '../../api/client';
import BlogPreview from '../../components/admin/BlogPreview';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const initialFormState = {
    title: '', slug: '', excerpt: '', content: '', category: '', 
    author: 'Admin', thumbnailUrl: '', tags: [], status: 'draft'
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await apiClient.get('/blogs?status=all');
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await apiClient.get('/blog-categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === 'title' && !editingId) {
        newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return newData;
    });
  };

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('image', file);

    try {
      const response = await apiClient.post('/upload', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, thumbnailUrl: response.data.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiClient.put(`/blogs/${editingId}`, formData);
      } else {
        await apiClient.post('/blogs', formData);
      }
      setShowModal(false);
      setFormData(initialFormState);
      setEditingId(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog');
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: blog.category?._id || blog.category || '',
      author: blog.author || '',
      thumbnailUrl: blog.thumbnailUrl || '',
      tags: blog.tags || [],
      status: blog.status || 'draft'
    });
    setEditingId(blog._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await apiClient.delete(`/blogs/${id}`);
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  // Get category name for preview
  const previewData = { ...formData };
  const selectedCat = categories.find(c => c._id === formData.category);
  previewData.categoryName = selectedCat ? selectedCat.name : 'Select Category';

  return (
    <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Blog Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your blog posts here.</p>
        </div>
        <button onClick={() => { setFormData(initialFormState); setEditingId(null); setShowModal(true); }} className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all">
          <Plus className="w-5 h-5 mr-2" /> Add Blog
        </button>
      </div>

      {/* Blog List Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 flex-grow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Blog Title</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Category</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-900">{blog.title}</td>
                <td className="px-6 py-4 text-gray-500">{blog.category?.name || 'Unknown'}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(blog)} className="text-indigo-600 hover:text-indigo-900 mx-2 p-1"><Edit2 className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:text-red-900 mx-2 p-1"><Trash2 className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full Screen Split-View Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex bg-gray-50 overflow-hidden">
          {/* Left Pane - Editor Form */}
          <div className="w-full lg:w-1/2 h-full flex flex-col bg-white border-r border-gray-200 shadow-xl z-10">
            <div className="flex justify-between items-center p-6 border-b bg-white shrink-0">
              <h3 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Blog' : 'Add New Blog'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-500"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden">
              <div className="p-6 space-y-6 overflow-y-auto flex-grow">
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Slug</label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
                </div>

                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                        <select name="category" value={formData.category} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg">
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                        <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Excerpt (Short Description)</label>
                  <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} required rows="2" className="w-full px-4 py-2 border rounded-lg"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Content (HTML allowed)</label>
                  <textarea name="content" value={formData.content} onChange={handleInputChange} required rows="10" className="w-full px-4 py-2 border rounded-lg font-mono text-sm"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Thumbnail Image</label>
                  <div className="flex items-center gap-2">
                    <input type="text" name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleInputChange} className="flex-1 px-4 py-2 border rounded-lg bg-gray-50" placeholder="Image URL..." />
                    <input type="file" id="thumbnail-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    <label htmlFor="thumbnail-upload" className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-gray-50">
                      {isUploading ? 'Uploading...' : 'Upload S3'}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Tags (comma separated)</label>
                  <input type="text" value={formData.tags.join(', ')} onChange={handleTagsChange} className="w-full px-4 py-2 border rounded-lg" placeholder="react, frontend, tutorial" />
                </div>

              </div>

              {/* Form Actions */}
              <div className="p-6 border-t bg-gray-50 flex justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 text-gray-700 font-bold hover:bg-gray-200 rounded-lg">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Save Blog</button>
              </div>
            </form>
          </div>

          {/* Right Pane - Live Preview */}
          <div className="hidden lg:block lg:w-1/2 h-full bg-gray-100 overflow-hidden relative">
            <div className="absolute top-0 inset-x-0 h-12 bg-gray-800 flex items-center px-4 z-10 shadow-md">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto bg-gray-700 text-gray-300 text-xs px-4 py-1 rounded-md font-mono flex items-center gap-2">
                Live Preview
              </div>
            </div>
            
            {/* The preview container, simulating a browser viewport */}
            <div className="w-full h-full pt-12">
               <BlogPreview blog={previewData} categories={categories} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
