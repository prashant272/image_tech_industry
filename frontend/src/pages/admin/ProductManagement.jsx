import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Eye } from 'lucide-react';
import apiClient from '../../api/client';
import ProductPreview from '../../components/admin/ProductPreview';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const initialFormState = {
    title: '', slug: '', category: '', isSpecial: false, shortDesc: '', longDesc: '',
    images: [''], features: [''], infoBoxes: [{ title: '', value: '', icon: '' }],
    overviewFeatures: [{ title: '', desc: '', icon: '' }], overviewText: [''],
    faqs: [{ question: '', answer: '' }], specifications: [{ label: '', value: '' }]
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const generateSlug = (text) => {
    return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({ ...formData, title, slug: generateSlug(title) });
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
        await apiClient.put(`/products/${editingId}`, formData);
      } else {
        await apiClient.post('/products', formData);
      }
      setShowModal(false);
      setFormData(initialFormState);
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('image', file);

    try {
      const response = await apiClient.post('/upload', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      handleArrayChange('images', index, response.data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      title: product.title || '',
      slug: product.slug || '',
      category: product.category?._id || '',
      isSpecial: product.isSpecial || false,
      shortDesc: product.shortDesc || '',
      longDesc: product.longDesc || '',
      images: product.images?.length ? product.images : [''],
      features: product.features?.length ? product.features : [''],
      infoBoxes: product.infoBoxes?.length ? product.infoBoxes : [{ title: '', value: '', icon: '' }],
      overviewFeatures: product.overviewFeatures?.length ? product.overviewFeatures : [{ title: '', desc: '', icon: '' }],
      overviewText: product.overviewText?.length ? product.overviewText : [''],
      faqs: product.faqs?.length ? product.faqs : [{ question: '', answer: '' }],
      specifications: product.specifications?.length ? product.specifications : [{ label: '', value: '' }]
    });
    setEditingId(product._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiClient.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Product Management</h2>
          <p className="text-sm font-medium text-gray-500 mt-1">Manage your website's products and specifications.</p>
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
          Add Product
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full sm:max-w-xs pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Product Title</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Special</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-bold text-gray-900">{product.title}</div></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-500">{product.category?.name || 'N/A'}</div></td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex px-3 py-1 text-xs font-bold leading-5 rounded-full ${product.isSpecial ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                    {product.isSpecial ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(product)} className="text-indigo-600 hover:text-indigo-900 mx-2 p-1 rounded-md hover:bg-indigo-50"><Edit2 className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-900 mx-2 p-1 rounded-md hover:bg-red-50"><Trash2 className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan="4" className="px-6 py-10 text-center text-gray-500 font-medium">No products found. Start by adding one.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex bg-gray-50 overflow-hidden">
          {/* Left Pane - Editor Form */}
          <div className="w-full lg:w-1/2 h-full flex flex-col bg-white border-r border-gray-200 shadow-xl z-10">
            <div className="flex justify-between items-center p-6 border-b bg-white shrink-0">
              <h3 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-500"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden">
              <div className="p-6 space-y-8 overflow-y-auto flex-grow">
                {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input type="text" required value={formData.title} onChange={handleTitleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                    <input type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                      <option value="">Select Category</option>
                      {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center mt-6">
                    <input type="checkbox" id="isSpecial" checked={formData.isSpecial} onChange={(e) => setFormData({...formData, isSpecial: e.target.checked})} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    <label htmlFor="isSpecial" className="ml-2 block text-sm text-gray-900 font-medium">Mark as Special Product</label>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                    <textarea value={formData.shortDesc} onChange={(e) => setFormData({...formData, shortDesc: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows="2"></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
                    <textarea value={formData.longDesc} onChange={(e) => setFormData({...formData, longDesc: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows="4"></textarea>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 flex justify-between items-center">
                  Images <button type="button" onClick={() => addArrayItem('images')} className="text-sm text-blue-600 hover:text-blue-800 font-bold">+ Add Image</button>
                </h4>
                {formData.images.map((img, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input type="text" value={img} onChange={(e) => handleArrayChange('images', idx, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" placeholder="Image URL will appear here or paste one..." />
                    
                    <input type="file" id={`image-upload-${idx}`} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, idx)} />
                    <label htmlFor={`image-upload-${idx}`} className="cursor-pointer bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap shadow-sm">
                      {isUploading ? 'Uploading...' : 'Upload S3'}
                    </label>

                    <button type="button" onClick={() => removeArrayItem('images', idx)} className="text-red-500 hover:text-red-700 ml-2"><Trash2 className="w-5 h-5"/></button>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 flex justify-between items-center">
                  Features <button type="button" onClick={() => addArrayItem('features')} className="text-sm text-blue-600 hover:text-blue-800 font-bold">+ Add Feature</button>
                </h4>
                {formData.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input type="text" value={feat} onChange={(e) => handleArrayChange('features', idx, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" placeholder="High precision..." />
                    <button type="button" onClick={() => removeArrayItem('features', idx)} className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5"/></button>
                  </div>
                ))}
              </div>

              {/* Overview Features */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 flex justify-between items-center">
                  Overview Features <button type="button" onClick={() => addObjectArrayItem('overviewFeatures', {title: '', desc: '', icon: ''})} className="text-sm text-blue-600 hover:text-blue-800 font-bold">+ Add Overview Feature</button>
                </h4>
                {formData.overviewFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 flex-col w-full border border-gray-200 p-4 rounded-lg bg-gray-50 mb-2">
                    <div className="flex justify-between w-full gap-2">
                      <input type="text" value={feat.title} onChange={(e) => handleObjectArrayChange('overviewFeatures', idx, 'title', e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg mb-2" placeholder="Feature Title (e.g., Durability)" />
                      <input type="text" value={feat.icon} onChange={(e) => handleObjectArrayChange('overviewFeatures', idx, 'icon', e.target.value)} className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg mb-2" placeholder="Icon (e.g., Target)" />
                      <button type="button" onClick={() => removeObjectArrayItem('overviewFeatures', idx)} className="text-red-500 hover:text-red-700 mt-2"><Trash2 className="w-5 h-5"/></button>
                    </div>
                    <textarea value={feat.desc} onChange={(e) => handleObjectArrayChange('overviewFeatures', idx, 'desc', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Feature Description" rows="2"></textarea>
                  </div>
                ))}
              </div>

              {/* Info Boxes */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 flex justify-between items-center">
                  Info Boxes <button type="button" onClick={() => addObjectArrayItem('infoBoxes', {title: '', value: '', icon: ''})} className="text-sm text-blue-600 hover:text-blue-800 font-bold">+ Add Info Box</button>
                </h4>
                {formData.infoBoxes.map((box, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input type="text" value={box.title} onChange={(e) => handleObjectArrayChange('infoBoxes', idx, 'title', e.target.value)} className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg" placeholder="Title (e.g., Material)" />
                    <input type="text" value={box.value} onChange={(e) => handleObjectArrayChange('infoBoxes', idx, 'value', e.target.value)} className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg" placeholder="Value (e.g., Carbon Steel)" />
                    <input type="text" value={box.icon} onChange={(e) => handleObjectArrayChange('infoBoxes', idx, 'icon', e.target.value)} className="w-1/4 px-4 py-2 border border-gray-300 rounded-lg" placeholder="Icon (e.g., Settings)" />
                    <button type="button" onClick={() => removeObjectArrayItem('infoBoxes', idx)} className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5"/></button>
                  </div>
                ))}
              </div>

              {/* FAQs */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 flex justify-between items-center">
                  FAQs <button type="button" onClick={() => addObjectArrayItem('faqs', {question: '', answer: ''})} className="text-sm text-blue-600 hover:text-blue-800 font-bold">+ Add FAQ</button>
                </h4>
                {formData.faqs.map((faq, idx) => (
                  <div key={idx} className="flex items-start gap-2 flex-col w-full border p-4 rounded bg-gray-50 mb-2">
                    <div className="flex justify-between w-full">
                      <input type="text" value={faq.question} onChange={(e) => handleObjectArrayChange('faqs', idx, 'question', e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg mb-2" placeholder="Question" />
                      <button type="button" onClick={() => removeObjectArrayItem('faqs', idx)} className="text-red-500 hover:text-red-700 ml-2 mt-2"><Trash2 className="w-5 h-5"/></button>
                    </div>
                    <textarea value={faq.answer} onChange={(e) => handleObjectArrayChange('faqs', idx, 'answer', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Answer" rows="2"></textarea>
                  </div>
                ))}
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 flex justify-between items-center">
                  Specifications <button type="button" onClick={() => addObjectArrayItem('specifications', {label: '', value: ''})} className="text-sm text-blue-600 hover:text-blue-800 font-bold">+ Add Spec</button>
                </h4>
                {formData.specifications.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input type="text" value={spec.label} onChange={(e) => handleObjectArrayChange('specifications', idx, 'label', e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" placeholder="Label (e.g., Hardness)" />
                    <input type="text" value={spec.value} onChange={(e) => handleObjectArrayChange('specifications', idx, 'value', e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" placeholder="Value (e.g., 580 - 600 HV)" />
                    <button type="button" onClick={() => removeObjectArrayItem('specifications', idx)} className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5"/></button>
                  </div>
                ))}
              </div>
              </div>
              
              <div className="p-4 flex justify-end space-x-3 bg-white border-t shrink-0">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md">
                  {editingId ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Pane - Live Preview */}
          <div className="hidden lg:block w-1/2 h-full bg-gray-100 overflow-y-auto p-6">
            <ProductPreview product={formData} categories={categories} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
