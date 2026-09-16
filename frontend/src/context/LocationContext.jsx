import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../api/client';

const LocationContext = createContext();

export const useLocationContext = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [currentCityName, setCurrentCityName] = useState('Delhi');
  const [currentCitySlug, setCurrentCitySlug] = useState('delhi');
  const [isLocationRoute, setIsLocationRoute] = useState(false);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await apiClient.get('/locations');
        const activeLocations = response.data.filter(loc => loc.status === 'Active');
        setLocations(activeLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    if (loading) return;

    // Get the first part of the URL (e.g., 'mumbai' from '/mumbai/about')
    const pathSegment = pathname.split('/')[1];

    if (pathSegment) {
      // Find if this segment is a valid location slug
      const foundLocation = locations.find(loc => loc.slug === pathSegment);
      
      if (foundLocation) {
        setCurrentCityName(foundLocation.name);
        setCurrentCitySlug(foundLocation.slug);
        setIsLocationRoute(true);
      } else {
        // Fallback to default if not a location (e.g., it's '/about' or '/products')
        setCurrentCityName('Delhi');
        setCurrentCitySlug('delhi');
        setIsLocationRoute(false);
      }
    } else {
      // Root '/'
      setCurrentCityName('Delhi');
      setCurrentCitySlug('delhi');
      setIsLocationRoute(false);
    }
  }, [pathname, locations, loading]);

  if (loading) {
    return null; // Prevent rendering until locations are loaded to avoid city flash
  }

  return (
    <LocationContext.Provider value={{ cityName: currentCityName, citySlug: currentCitySlug, isLocationRoute, loading }}>
      {children}
    </LocationContext.Provider>
  );
};
