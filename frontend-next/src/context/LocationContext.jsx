'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import apiClient from '../api/client';

const LocationContext = createContext();

let memoryLocations = null;

const standardRoutes = [
  'about', 'products', 'special-product', 'special-products', 'blog', 'pricing', 'contact', 'industries', 
  'features', 'dashboards', 'privacy-policy', 'terms-conditions', 
  'shipping-policy', 'sitemap', 'admin'
];

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    return {
      locations: memoryLocations || [],
      cityName: 'Delhi',
      citySlug: 'delhi',
      stateName: 'Delhi',
      isLocationRoute: false,
      loading: false,
    };
  }
  return context;
};

export const LocationProvider = ({ children, initialLocations = [] }) => {
  const pathname = usePathname() || '/';
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] || '';
  
  const initialIsLocation = Boolean(firstSegment && !standardRoutes.includes(firstSegment));
  const initialSlug = initialIsLocation ? firstSegment : 'delhi';
  const initialName = initialIsLocation 
    ? (firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1)) 
    : 'Delhi';

  const [locations, setLocations] = useState(() => memoryLocations || initialLocations);
  const [currentCityName, setCurrentCityName] = useState(initialName);
  const [currentCitySlug, setCurrentCitySlug] = useState(initialSlug);
  const [currentCityState, setCurrentCityState] = useState(initialName);
  const [isLocationRoute, setIsLocationRoute] = useState(initialIsLocation);

  useEffect(() => {
    if (memoryLocations && memoryLocations.length > 0) return;

    const fetchLocations = async () => {
      try {
        const response = await apiClient.get('/locations');
        const activeLocations = (response.data || []).filter(loc => loc.status === 'Active');
        memoryLocations = activeLocations;
        setLocations(activeLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const currentSegments = pathname.split('/').filter(Boolean);
    const pathSegment = currentSegments[0];

    if (pathSegment && !standardRoutes.includes(pathSegment)) {
      if (locations.length > 0) {
        const foundLocation = locations.find(loc => loc.slug === pathSegment);
        if (foundLocation) {
          setIsLocationRoute(true);
          setCurrentCitySlug(pathSegment);
          setCurrentCityName(foundLocation.name);
          setCurrentCityState(foundLocation.state || foundLocation.name);
          return;
        } else {
          // If locations are loaded and this pathSegment is NOT a valid location slug,
          // it must not be treated as a location route.
          setIsLocationRoute(false);
          setCurrentCityName('Delhi');
          setCurrentCitySlug('delhi');
          setCurrentCityState('Delhi');
          return;
        }
      }
      
      setIsLocationRoute(true);
      setCurrentCitySlug(pathSegment);
      const formatted = pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1);
      setCurrentCityName(formatted);
      setCurrentCityState(formatted);
      return;
    }

    setCurrentCityName('Delhi');
    setCurrentCitySlug('delhi');
    setCurrentCityState('Delhi');
    setIsLocationRoute(false);
  }, [pathname, locations]);

  return (
    <LocationContext.Provider 
      value={{ 
        locations, 
        cityName: currentCityName, 
        citySlug: currentCitySlug, 
        stateName: currentCityState,
        isLocationRoute, 
        loading: false 
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
