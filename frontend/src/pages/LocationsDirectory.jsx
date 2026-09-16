import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';
import apiClient from '../api/client';

const LocationsDirectory = () => {
  const [locationsByState, setLocationsByState] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await apiClient.get('/locations');
      const activeLocations = response.data.filter(loc => loc.status === 'Active');
      
      // Group by state
      const grouped = {};
      activeLocations.forEach(loc => {
        const stateName = loc.state || 'Other Regions';
        if (!grouped[stateName]) {
          grouped[stateName] = [];
        }
        grouped[stateName].push(loc);
      });
      
      // Sort states alphabetically
      const sortedGrouped = {};
      Object.keys(grouped).sort().forEach(key => {
        // Sort locations within state alphabetically
        sortedGrouped[key] = grouped[key].sort((a, b) => a.name.localeCompare(b.name));
      });
      
      setLocationsByState(sortedGrouped);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      );
    }

    const filteredStates = Object.keys(locationsByState).filter(state => {
      // Check if state matches or any district inside it matches
      if (state.toLowerCase().includes(searchTerm.toLowerCase())) return true;
      return locationsByState[state].some(loc => loc.name.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    if (filteredStates.length === 0) {
      return (
        <div className="text-center py-20 text-gray-400 font-medium">
          No locations found matching your search.
        </div>
      );
    }

    return (
      <div className="space-y-12">
        {filteredStates.map((state) => {
          // Filter locations within state if searching
          const locations = locationsByState[state].filter(loc => 
            state.toLowerCase().includes(searchTerm.toLowerCase()) || 
            loc.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          return (
            <div key={state} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* State Header (Orange) */}
              <div className="bg-orange-500 px-6 py-4 border-b border-orange-600">
                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide flex items-center">
                  <MapPin className="mr-2 h-6 w-6" />
                  {state}
                </h2>
              </div>
              
              {/* Districts Grid */}
              <div className="p-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-px bg-gray-200">
                  {locations.map((loc) => (
                    <Link
                      key={loc._id}
                      to={`/${loc.slug}`}
                      className="bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-600 hover:font-bold transition-all duration-200 px-4 py-3 text-[14px] flex items-center text-center justify-center"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-wider">
            Locations We <span className="text-orange-500">Serve</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            ImageTech Industries provides top-quality printing and manufacturing accessories across India. 
            Select your district below to view our localized services.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative shadow-sm rounded-lg">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-3 py-3.5 border border-gray-200 bg-white rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-medium"
              placeholder="Search for a state or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Directory Content */}
        {renderContent()}

      </div>
    </div>
  );
};

export default LocationsDirectory;
