import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import apiClient from '../../api/client';

const LocationManagement = () => {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', slug: '', state: '', status: 'Active' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await apiClient.get('/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
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
    try {
      if (editingId) {
        await apiClient.put(`/locations/${editingId}`, formData);
      } else {
        await apiClient.post('/locations', formData);
      }
      setShowModal(false);
      setFormData({ name: '', slug: '', state: '', status: 'Active' });
      setEditingId(null);
      fetchLocations();
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  const handleEdit = (location) => {
    setFormData({ name: location.name, slug: location.slug, state: location.state || '', status: location.status });
    setEditingId(location._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      try {
        await apiClient.delete(`/locations/${id}`);
        fetchLocations();
      } catch (error) {
        console.error('Error deleting location:', error);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 border border-gray-100">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Location Management (pSEO)
          </h2>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Manage target cities to dynamically generate programmatic SEO location pages.
          </p>
        </div>
        <button 
          onClick={() => {
            setFormData({ name: '', slug: '', state: '', status: 'Active' });
            setEditingId(null);
            setShowModal(true);
          }}
          className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Location
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full sm:max-w-xs pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                City / Name
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                State
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Slug
              </th>
              <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {locations.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((location) => (
              <tr key={location._id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">{location.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-500">{location.state || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-500">{location.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex px-3 py-1 text-xs font-bold leading-5 rounded-full ${
                    location.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {location.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleEdit(location)}
                    className="text-indigo-600 hover:text-indigo-900 mx-2 p-1 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(location._id)}
                    className="text-red-600 hover:text-red-900 mx-2 p-1 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {locations.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-500 font-medium">
                  No locations found. Start by adding one to generate dynamic SEO pages.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-bold text-gray-900">
                {editingId ? 'Edit Location' : 'Add New Location'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City / Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Delhi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State (Optional)</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., New Delhi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  placeholder="e.g., delhi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {editingId ? 'Update Location' : 'Save Location'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationManagement;
