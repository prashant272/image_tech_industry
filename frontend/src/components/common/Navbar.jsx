import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, ArrowRight, ShieldCheck, Users, MessageSquare, Wallet, Wrench, Building2, LayoutGrid, Home, Building } from 'lucide-react';
import { navigation } from '../../data/navigation';

const deptIcons = {
  security: <ShieldCheck className="w-4 h-4" />,
  residents: <Users className="w-4 h-4" />,
  community: <MessageSquare className="w-4 h-4" />,
  finance: <Wallet className="w-4 h-4" />,
  maintenance: <Wrench className="w-4 h-4" />,
  amenities: <Building2 className="w-4 h-4" />,
  administration: <LayoutGrid className="w-4 h-4" />
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [isIndPinned, setIsIndPinned] = useState(false);
  const [activeTab, setActiveTab] = useState(navigation.departments[0].id);
  const location = useLocation();
  const megaRef = useRef(null);

  // Close mega menu on route change
  useEffect(() => {
    setMegaOpen(false);
    setIsPinned(false);
    setIndustriesOpen(false);
    setIsIndPinned(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaOpen(false);
        setIsPinned(false);
        setIndustriesOpen(false);
        setIsIndPinned(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const activeDept = navigation.departments.find(d => d.id === activeTab);

  const industriesData = [
    { name: 'Housing Societies', icon: <Home className="w-5 h-5" />, desc: 'Standard residential apartments' },
    { name: 'Gated Townships', icon: <Building2 className="w-5 h-5" />, desc: 'Large scale townships & villas' },
    { name: 'Commercial', icon: <Building className="w-5 h-5" />, desc: 'IT parks and corporate spaces' },
    { name: 'Co-living Spaces', icon: <Users className="w-5 h-5" />, desc: 'PGs and co-living providers' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' : 'bg-white py-5'}`}>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-10">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0b6d4b] rounded-lg flex flex-col items-center justify-center text-white p-1 shadow-md">
              <div className="flex gap-0.5 items-end h-full">
                <div className="w-1.5 h-[60%] bg-white rounded-t-sm"></div>
                <div className="w-1.5 h-[100%] bg-white rounded-t-sm"></div>
                <div className="w-1.5 h-[80%] bg-white rounded-t-sm"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl text-gray-900 tracking-tight leading-none">
                Society<span className="text-[#0b6d4b]">Pro</span>
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-1" ref={megaRef}>
            {/* Features Cascading Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => {
                if (!isPinned) setMegaOpen(true);
                if (!isPinned && industriesOpen) { setIndustriesOpen(false); setIsIndPinned(false); }
              }}
              onMouseLeave={() => !isPinned && setMegaOpen(false)}
            >
              <button 
                onClick={() => {
                  const newPinState = !isPinned;
                  setIsPinned(newPinState);
                  setMegaOpen(newPinState);
                  if (newPinState) { setIndustriesOpen(false); setIsIndPinned(false); }
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-[14px] transition-colors ${megaOpen ? 'bg-gray-100 text-[#0b6d4b]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                Features
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Primary Dropdown */}
              {megaOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] py-2">
                  {navigation.departments.map(dept => (
                    <div key={dept.id} className="relative group">
                      {/* Department Item */}
                      <button className="w-full flex items-center justify-between px-5 py-3 text-[14.5px] font-bold text-gray-900 hover:bg-[#e6f5ef] hover:text-[#0b6d4b] transition-colors">
                        <span className="flex items-center gap-3">
                          <span className="text-[#0b6d4b] opacity-80">{deptIcons[dept.id]}</span>
                          {dept.label}
                        </span>
                        <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                      </button>

                      {/* Secondary Flyout Menu (Features) */}
                      <div className="absolute top-0 left-full ml-1 w-72 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                        <div className="px-5 py-2 mb-1 border-b border-gray-50">
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{dept.label} Modules</span>
                        </div>
                        {dept.features.map(feat => (
                          <Link
                            key={feat.slug}
                            to={`/features/${feat.slug}`}
                            onClick={() => setMegaOpen(false)}
                            className="flex items-center gap-2 px-5 py-2.5 text-[14px] font-semibold text-gray-900 hover:bg-[#e6f5ef] hover:text-[#0b6d4b] transition-colors"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                            {feat.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/industries" className="px-4 py-2 text-[14px] font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors">Industries</Link>

            {/* Standard Links */}
            <Link to="/pricing" className="px-4 py-2 text-[14px] font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors">Pricing</Link>
            <Link to="/about" className="px-4 py-2 text-[14px] font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors">About Us</Link>
            <Link to="/contact" className="px-4 py-2 text-[14px] font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors">Contact</Link>
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-[14px] font-bold text-gray-600 hover:text-gray-900">Sign in</Link>
            <button className="bg-[#0b6d4b] hover:bg-[#09573c] text-white px-5 py-2.5 rounded-xl font-bold text-[14px] transition-all shadow-md shadow-[#0b6d4b]/20 hover:-translate-y-0.5">
              Book a Demo
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-gray-900 p-2 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
