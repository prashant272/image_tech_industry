import React from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import DashboardDetailPage from './pages/DashboardDetailPage';
import FeatureDetail from './pages/FeatureDetail';
import Industries from './pages/Industries';
import IndustryDetail from './pages/IndustryDetail';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import QuoteModal from './components/common/QuoteModal';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ShippingPolicy from './pages/ShippingPolicy';
import LocationsDirectory from './pages/LocationsDirectory';
import CustomDetails from './pages/CustomDetails';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './components/admin/AdminLayout';
import BlogCategoryManagement from './pages/admin/BlogCategoryManagement';
import BlogManagement from './pages/admin/BlogManagement';
import EnquiryList from './pages/admin/EnquiryList';
import ProductCategoryManagement from './pages/admin/ProductCategoryManagement';
import ProductManagement from './pages/admin/ProductManagement';
import CustomPageManagement from './pages/admin/CustomPageManagement';
import LocationManagement from './pages/admin/LocationManagement';
import { useLocationContext } from './context/LocationContext';

const LocationRouteGuard = ({ children }) => {
  const { isLocationRoute, loading } = useLocationContext();
  
  if (loading) return null;
  
  if (!isLocationRoute) {
    return <NotFound />;
  }
  
  return children;
};

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-[#f4f7f5] selection:bg-[#0b6d4b] selection:text-white">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow flex flex-col relative z-0">
        <Routes>
          {/* Admin Auth Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Routes wrapped in AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="blog-categories" element={<BlogCategoryManagement />} />
            <Route path="blogs" element={<BlogManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="categories" element={<ProductCategoryManagement />} />
            <Route path="custom-pages" element={<CustomPageManagement />} />
            <Route path="locations" element={<LocationManagement />} />
            <Route path="enquiries" element={<EnquiryList />} />
            <Route path="reviews" element={<div className="p-4 bg-white rounded shadow font-bold text-lg">Review Management (Coming Soon)</div>} />
          </Route>

          {/* Standard Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboards/:slug" element={<DashboardDetailPage />} />
          <Route path="/features/:slug" element={<FeatureDetail />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/sitemap" element={<LocationsDirectory />} />
          
          {/* Location-Prefixed Public Routes */}
          <Route path="/:locationSlug" element={<LocationRouteGuard><Outlet /></LocationRouteGuard>}>
            <Route index element={<Home />} />
            
            {/* Custom Page prefixed with city (e.g. /delhi/doctor-blade) */}
            <Route path=":slug" element={<CustomDetails />} />
            
            <Route path="dashboards/:slug" element={<DashboardDetailPage />} />
            <Route path="features/:slug" element={<FeatureDetail />} />
            <Route path="industries" element={<Industries />} />
            <Route path="industries/:slug" element={<IndustryDetail />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:slug" element={<ProductDetail />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-conditions" element={<TermsConditions />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="sitemap" element={<LocationsDirectory />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <QuoteModal />}
    </div>
  );
}

export default App;
