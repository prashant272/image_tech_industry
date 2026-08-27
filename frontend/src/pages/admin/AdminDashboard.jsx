import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards for dashboard stats */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <h4 className="text-green-800 text-sm font-medium uppercase tracking-wide">Total Products</h4>
          <p className="mt-2 text-3xl font-bold text-green-600">--</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h4 className="text-blue-800 text-sm font-medium uppercase tracking-wide">Total Blogs</h4>
          <p className="mt-2 text-3xl font-bold text-blue-600">--</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
          <h4 className="text-purple-800 text-sm font-medium uppercase tracking-wide">New Enquiries</h4>
          <p className="mt-2 text-3xl font-bold text-purple-600">--</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
