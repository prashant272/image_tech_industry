import React, { useState, useEffect } from 'react';
import { Search, Eye, Trash2, Mail, X, CheckCircle, Clock } from 'lucide-react';
import apiClient from '../../api/client';

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state for viewing full message
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const fetchEnquiries = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get('/enquiry/all');
      setEnquiries(res.data.data || []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiClient.put(`/enquiry/${id}/status`, { status: newStatus });
      fetchEnquiries();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await apiClient.delete(`/enquiry/${id}`);
        fetchEnquiries();
      } catch (error) {
        console.error('Error deleting enquiry:', error);
      }
    }
  };

  const openMessageModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    // Auto-mark as read if it's new
    if (enquiry.status === 'new') {
      handleStatusChange(enquiry._id, 'read');
    }
  };

  const filteredEnquiries = enquiries.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch(status) {
      case 'new': return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">New</span>;
      case 'read': return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">Read</span>;
      case 'replied': return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">Replied</span>;
      default: return null;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Enquiries / Quotes</h2>
          <p className="text-sm text-gray-500 mt-1">Manage contact and quote requests from the website.</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 flex">
        <div className="relative w-full max-w-md">
          <input 
            type="text" 
            placeholder="Search by name, company, or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* List Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 flex-grow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Client</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Subject</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr><td colSpan="5" className="text-center py-8 text-gray-500 font-bold">Loading enquiries...</td></tr>
            ) : filteredEnquiries.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-8 text-gray-500 font-bold">No enquiries found.</td></tr>
            ) : filteredEnquiries.map((enq) => (
              <tr key={enq._id} className={`hover:bg-gray-50 transition-colors ${enq.status === 'new' ? 'bg-blue-50/30' : ''}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(enq.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{enq.name}</div>
                  <div className="text-xs text-gray-500">{enq.company}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 line-clamp-1">{enq.subject}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {getStatusBadge(enq.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openMessageModal(enq)} className="text-blue-600 hover:text-blue-900 mx-2 p-1 rounded-md hover:bg-blue-50 transition-colors" title="View Message">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(enq._id)} className="text-red-600 hover:text-red-900 mx-2 p-1 rounded-md hover:bg-red-50 transition-colors" title="Delete">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Message View Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            <div className="flex justify-between items-center p-6 border-b bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">Enquiry Details</h3>
              <button onClick={() => setSelectedEnquiry(null)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 space-y-6">
              
              <div className="grid grid-cols-2 gap-6 pb-6 border-b border-gray-100">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">From</p>
                  <p className="text-base font-bold text-gray-900">{selectedEnquiry.name}</p>
                  <p className="text-sm text-gray-600">{selectedEnquiry.company}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Contact</p>
                  <p className="text-sm text-blue-600 font-medium hover:underline cursor-pointer flex items-center gap-2"><Mail className="w-3 h-3"/> {selectedEnquiry.email}</p>
                  <p className="text-sm text-gray-600">{selectedEnquiry.phone}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject</p>
                <p className="text-lg font-bold text-gray-900">{selectedEnquiry.subject}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Message</p>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedEnquiry.message}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4">
                 <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <Clock className="w-4 h-4" /> Received: {new Date(selectedEnquiry.createdAt).toLocaleString()}
                 </div>
                 <div className="flex gap-3">
                   {selectedEnquiry.status !== 'replied' && (
                     <button 
                       onClick={() => {
                         handleStatusChange(selectedEnquiry._id, 'replied');
                         setSelectedEnquiry({...selectedEnquiry, status: 'replied'});
                       }}
                       className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors"
                     >
                       <CheckCircle className="w-4 h-4" /> Mark as Replied
                     </button>
                   )}
                   <a href={`mailto:${selectedEnquiry.email}?subject=Re: ${selectedEnquiry.subject}`} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                     <Mail className="w-4 h-4" /> Reply via Email
                   </a>
                 </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryList;
