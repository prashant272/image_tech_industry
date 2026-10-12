'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Layers } from 'lucide-react';
import apiClient from '../../api/client';

const ProductSubcategoryManagement = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', slug: '', category: '', status: 'Active' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [subRes, catRes] = await Promise.all([
        apiClient.get('/subcategories'),
        apiClient.get('/categories')
      ]);
      setSubcategories(subRes.data || []);
      setCategories(catRes.data || []);
    } catch (error) {
      console.error('Error fetching subcategories data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await apiClient.get('/subcategories');
      setSubcategories(response.data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const generateSlug = (text) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData({ ...formData, name, slug: generateSlug(name) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) {
      alert('Please select a parent category');
      return;
    }
    try {
      if (editingId) {
        await apiClient.put(`/subcategories/${editingId}`, formData);
      } else {
        await apiClient.post('/subcategories', formData);
      }
      setShowModal(false);
      setFormData({ name: '', slug: '', category: '', status: 'Active' });
      setEditingId(null);
      fetchSubcategories();
    } catch (error) {
      console.error('Error saving subcategory:', error);
      alert(error.response?.data?.message || 'Error saving subcategory');
    }
  };

  const handleEdit = (sub) => {
    setFormData({
      name: sub.name,
      slug: sub.slug,
      category: sub.category?._id || sub.category || '',
      status: sub.status || 'Active'
    });
    setEditingId(sub._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      try {
        await apiClient.delete(`/subcategories/${id}`);
        fetchSubcategories();
      } catch (error) {
        console.error('Error deleting subcategory:', error);
      }
    }
  };

  const filteredSubcategories = subcategories.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (sub.category?.name && sub.category.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = categoryFilter === 'All' || sub.category?._id === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 border border-gray-100">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Product Subcategory Management
          </h2>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Create and organize subcategories under categories for multi-level navigation.
          </p>
        </div>
        <button 
          onClick={() => {
            setFormData({ name: '', slug: '', category: categories[0]?._id || '', status: 'Active' });
            setEditingId(null);
            setShowModal(true);
          }}
          className="flex items-center px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Subcategory
        </button>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="sm:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search subcategory by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-medium text-gray-700"
          >
            <option value="All">All Categories</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Subcategory Name</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Parent Category</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Slug</th>
              <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubcategories.map((sub) => (
              <tr key={sub._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-bold text-gray-900">{sub.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    {sub.category?.name || 'Unassigned'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                  {sub.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex px-3 py-1 text-xs font-bold leading-5 rounded-full ${
                    sub.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {sub.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleEdit(sub)} 
                    className="text-indigo-600 hover:text-indigo-900 mx-2 p-1 rounded-md hover:bg-indigo-50"
                    title="Edit Subcategory"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(sub._id)} 
                    className="text-red-600 hover:text-red-900 mx-2 p-1 rounded-md hover:bg-red-50"
                    title="Delete Subcategory"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredSubcategories.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-500 font-medium">
                  {loading ? 'Loading subcategories...' : 'No subcategories found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingId ? 'Edit Subcategory' : 'Add New Subcategory'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="e.g., Polymer Doctor Blade"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-sm"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSubcategoryManagement;
