import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Copy } from 'lucide-react';
import apiClient from '../../api/client';

const CustomPageManagement = () => {
  const [pages, setPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const initialFormState = {
    title: '', slug: '', subtitle: '', heroImage: '',
    heroFeatures: [''], section2Title: '', section2Description: '',
    section2Bullets: [''], section2Locations: [''],
    citySectionTitle: '', citySectionDescription: '',
    faqs: [{ question: '', answer: '' }],
    ctaTitle: '', ctaDescription: '',
    seoTitle: '', seoDescription: '', seoKeywords: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await apiClient.get('/custom-pages');
      setPages(response.data);
    } catch (error) {
      console.error('Error fetching custom pages:', error);
    }
  };

  const generateSlug = (text) => {
    return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    if (!editingId) {
      setFormData({ ...formData, title, slug: generateSlug(title) });
    } else {
      setFormData({ ...formData, title });
    }
  };

  // Dynamic Array Handlers
  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };
  const addArrayItem = (field, defaultVal = '') => setFormData({ ...formData, [field]: [...formData[field], defaultVal] });
  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleObjectArrayChange = (field, index, key, value) => {
    const newArray = [...formData[field]];
    newArray[index][key] = value;
    setFormData({ ...formData, [field]: newArray });
  };
  const addObjectArrayItem = (field, defaultObj) => setFormData({ ...formData, [field]: [...formData[field], defaultObj] });
  const removeObjectArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiClient.put(`/custom-pages/${editingId}`, formData);
      } else {
        await apiClient.post('/custom-pages', formData);
      }
      setShowModal(false);
      setFormData(initialFormState);
      setEditingId(null);
      fetchPages();
    } catch (error) {
      console.error('Error saving custom page:', error);
      alert(error.response?.data?.message || 'Error saving page');
    }
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
      setFormData({ ...formData, heroImage: response.data.url });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (page) => {
    setFormData({
      title: page.title || '',
      slug: page.slug || '',
      subtitle: page.subtitle || '',
      heroImage: page.heroImage || '',
      heroFeatures: page.heroFeatures?.length ? page.heroFeatures : [''],
      section2Title: page.section2Title || '',
      section2Description: page.section2Description || '',
      section2Bullets: page.section2Bullets?.length ? page.section2Bullets : [''],
      section2Locations: page.section2Locations?.length ? page.section2Locations : [''],
      citySectionTitle: page.citySectionTitle || '',
      citySectionDescription: page.citySectionDescription || '',
      faqs: page.faqs?.length ? page.faqs : [{ question: '', answer: '' }],
      ctaTitle: page.ctaTitle || '',
      ctaDescription: page.ctaDescription || '',
      seoTitle: page.seoTitle || '',
      seoDescription: page.seoDescription || '',
      seoKeywords: page.seoKeywords || ''
    });
    setEditingId(page._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this custom page?')) {
      try {
        await apiClient.delete(`/custom-pages/${id}`);
        fetchPages();
      } catch (error) {
        console.error('Error deleting custom page:', error);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Custom Pages</h2>
          <p className="text-gray-500 mb-6">Build dynamic pSEO pages matching the custom design. You can use <strong className="text-blue-600">&#123;city&#125;</strong> and <strong className="text-blue-600">&#123;state&#125;</strong> in titles, descriptions, and FAQs to dynamically adapt content for each location.</p>
        </div>
        <button 
          onClick={() => {
            setFormData(initialFormState);
            setEditingId(null);
            setShowModal(true);
          }}
          className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Page
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full sm:max-w-xs pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
          placeholder="Search pages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Page Title</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Slug / URL</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map((page) => (
              <tr key={page._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-bold text-gray-900">{page.title}</div></td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-blue-600 font-medium text-sm">&#123;city&#125;/{page.slug}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href={`/delhi/${page.slug}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-900 mx-1 p-1">View</a>
                  <button onClick={() => handleEdit(page)} className="text-indigo-600 hover:text-indigo-900 mx-1 p-1"><Edit2 className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(page._id)} className="text-red-600 hover:text-red-900 mx-1 p-1"><Trash2 className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr><td colSpan="3" className="px-6 py-10 text-center text-gray-500 font-medium">No custom pages found. Start by creating one.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex bg-gray-900/50 justify-center items-center p-4">
          <div className="w-full max-w-4xl h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b shrink-0">
              <h3 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Custom Page' : 'Create Custom Page'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-500"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden">
              <div className="p-6 space-y-8 overflow-y-auto flex-grow bg-gray-50/50">
                
                {/* Hero Section */}
                <div className="space-y-4 bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                  <h4 className="text-lg font-black text-gray-800 border-b pb-2">Hero Section</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Main Title (H1) *</label>
                      <input type="text" required value={formData.title} onChange={handleTitleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="e.g. Best Carbon Steel Doctor Blade in Delhi" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-bold text-gray-700">URL Slug <span className="text-red-500">*</span></label>
                        <span className="text-[11px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">Used in URL</span>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm font-medium">&#123;city&#125;/</span>
                        </div>
                        <input 
                          type="text" 
                          value={formData.slug} 
                          onChange={(e) => {
                            // Prevent slashes and {city} in slug
                            let val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
                            setFormData({...formData, slug: val});
                          }} 
                          className="w-full pl-[60px] pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow font-mono text-sm" 
                          placeholder="e.g. doctor-blade" 
                          required 
                        />
                      </div>
                      <p className="text-[11.5px] text-gray-500 mt-1.5 font-medium leading-relaxed">
                        Only use lowercase letters, numbers, and hyphens (no spaces, no slashes). <br/>
                        <span className="text-blue-600 font-bold">Note:</span> The city name is automatically handled by the URL. Don't add &#123;city&#125; or &#123;state&#125; here.
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-1">Subtitle</label>
                      <textarea value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows="2" placeholder="High-precision doctor blades for superior coating control..."></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-1">Hero Image</label>
                      <div className="flex gap-2">
                        <input type="text" value={formData.heroImage} onChange={(e) => setFormData({...formData, heroImage: e.target.value})} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" placeholder="Image URL" />
                        <input type="file" id="hero-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        <label htmlFor="hero-upload" className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg font-bold text-sm">
                          {isUploading ? 'Uploading...' : 'Upload'}
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">Hero Features (Icons) <button type="button" onClick={() => addArrayItem('heroFeatures')} className="text-blue-600">+ Add</button></label>
                    {formData.heroFeatures.map((feat, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input type="text" value={feat} onChange={(e) => handleArrayChange('heroFeatures', idx, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" placeholder="e.g. High Quality Carbon Steel" />
                        <button type="button" onClick={() => removeArrayItem('heroFeatures', idx)} className="text-red-500 hover:bg-red-50 px-2 rounded"><Trash2 className="w-5 h-5"/></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Section (Why Choose Us) */}
                <div className="space-y-4 bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                  <h4 className="text-lg font-black text-gray-800 border-b pb-2">Why Choose Us Section</h4>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Section Title</label>
                    <input type="text" value={formData.section2Title} onChange={(e) => setFormData({...formData, section2Title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="e.g. Trusted Carbon Steel Doctor Blade Supplier in Delhi..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Section Description</label>
                    <textarea value={formData.section2Description} onChange={(e) => setFormData({...formData, section2Description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows="3"></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">Bullet Points (Checkmarks) <button type="button" onClick={() => addArrayItem('section2Bullets')} className="text-blue-600">+ Add</button></label>
                      {formData.section2Bullets.map((bullet, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                          <input type="text" value={bullet} onChange={(e) => handleArrayChange('section2Bullets', idx, e.target.value)} className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm" placeholder="e.g. Manufactured from high-grade..." />
                          <button type="button" onClick={() => removeArrayItem('section2Bullets', idx)} className="text-red-500"><X className="w-4 h-4"/></button>
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">Locations for Map Card <button type="button" onClick={() => addArrayItem('section2Locations')} className="text-blue-600">+ Add</button></label>
                      {formData.section2Locations.map((loc, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                          <input type="text" value={loc} onChange={(e) => handleArrayChange('section2Locations', idx, e.target.value)} className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm" placeholder="e.g. Delhi" />
                          <button type="button" onClick={() => removeArrayItem('section2Locations', idx)} className="text-red-500"><X className="w-4 h-4"/></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* City Quote Section */}
                <div className="space-y-4 bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                  <h4 className="text-lg font-black text-gray-800 border-b pb-2">Target City Quote Section</h4>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Quote Section Title</label>
                    <input type="text" value={formData.citySectionTitle} onChange={(e) => setFormData({...formData, citySectionTitle: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="e.g. Best Carbon Steel Doctor Blade in Darbhanga" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Quote Section Description</label>
                    <textarea value={formData.citySectionDescription} onChange={(e) => setFormData({...formData, citySectionDescription: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows="2"></textarea>
                  </div>
                </div>

                {/* FAQs */}
                <div className="space-y-4 bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                  <h4 className="text-lg font-black text-gray-800 border-b pb-2 flex justify-between items-center">
                    FAQs <button type="button" onClick={() => addObjectArrayItem('faqs', {question: '', answer: ''})} className="text-sm text-blue-600 hover:text-blue-800 font-bold">+ Add FAQ</button>
                  </h4>
                  {formData.faqs.map((faq, idx) => (
                    <div key={idx} className="flex flex-col gap-2 p-4 bg-gray-50 border rounded-lg">
                      <div className="flex gap-2">
                        <input type="text" value={faq.question} onChange={(e) => handleObjectArrayChange('faqs', idx, 'question', e.target.value)} className="flex-1 px-4 py-2 border rounded font-semibold" placeholder="Question" />
                        <button type="button" onClick={() => removeObjectArrayItem('faqs', idx)} className="text-red-500 p-2 hover:bg-red-50"><Trash2 className="w-5 h-5"/></button>
                      </div>
                      <textarea value={faq.answer} onChange={(e) => handleObjectArrayChange('faqs', idx, 'answer', e.target.value)} className="w-full px-4 py-2 border rounded" placeholder="Answer" rows="2"></textarea>
                    </div>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="space-y-4 bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                  <h4 className="text-lg font-black text-gray-800 border-b pb-2">Bottom Call-to-Action (CTA)</h4>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">CTA Title</label>
                    <input type="text" value={formData.ctaTitle} onChange={(e) => setFormData({...formData, ctaTitle: e.target.value})} className="w-full px-4 py-2 border rounded" placeholder="e.g. Looking for the Right Doctor Blade for Your Business?" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">CTA Description</label>
                    <textarea value={formData.ctaDescription} onChange={(e) => setFormData({...formData, ctaDescription: e.target.value})} className="w-full px-4 py-2 border rounded" rows="2" placeholder="e.g. Get in touch with our experts for the best pricing..."></textarea>
                  </div>
                </div>

                {/* SEO Configuration */}
                <div className="space-y-4 bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                  <h4 className="text-lg font-black text-gray-800 border-b pb-2">SEO Configuration</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Meta Title</label>
                      <input type="text" value={formData.seoTitle} onChange={(e) => setFormData({...formData, seoTitle: e.target.value})} className="w-full px-4 py-2 border rounded" placeholder="Optimal length: 50-60 characters" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Meta Keywords</label>
                      <input type="text" value={formData.seoKeywords} onChange={(e) => setFormData({...formData, seoKeywords: e.target.value})} className="w-full px-4 py-2 border rounded" placeholder="e.g. doctor blades in delhi, best carbon steel" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Meta Description</label>
                      <textarea value={formData.seoDescription} onChange={(e) => setFormData({...formData, seoDescription: e.target.value})} className="w-full px-4 py-2 border rounded" rows="2" placeholder="Optimal length: 150-160 characters"></textarea>
                    </div>
                  </div>
                </div>

              </div>
              <div className="p-4 flex justify-end space-x-3 bg-white border-t shrink-0">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md">
                  {editingId ? 'Update Page' : 'Save Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPageManagement;
