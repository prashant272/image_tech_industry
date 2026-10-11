'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import QuoteModal from '../common/QuoteModal';
import { LocationProvider } from '../../context/LocationContext';

export default function AppShell({ children }) {
  const pathname = usePathname() || '/';
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <LocationProvider>
      <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-[#f4f7f5] selection:bg-[#0b6d4b] selection:text-white">
        {!isAdminRoute && (
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
        )}
        <main className="flex-grow flex flex-col relative z-0">
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </main>
        {!isAdminRoute && (
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        )}
        {!isAdminRoute && (
          <Suspense fallback={null}>
            <QuoteModal />
          </Suspense>
        )}
      </div>
    </LocationProvider>
  );
}
