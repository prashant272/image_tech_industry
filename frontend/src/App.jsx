import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-[#f4f7f5] selection:bg-[#0b6d4b] selection:text-white">
      <Navbar />
      <main className="flex-grow flex flex-col relative z-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboards/:slug" element={<DashboardDetailPage />} />
          <Route path="/features/:slug" element={<FeatureDetail />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
