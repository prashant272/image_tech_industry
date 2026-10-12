'use client';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from '@/compat/react-router';
import {
  CheckCircle2, Settings, Layout, Maximize, Truck, Target, Shield, Activity,
  Plus, Minus, ArrowRight, ArrowLeft, MapPin
} from 'lucide-react';
import CTA from '../components/home/CTA';
import apiClient from '../api/client';
import NotFound from '@/app/not-found';
import { useLocationContext } from '../context/LocationContext';

const IconMap = {
  Settings: <Settings className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Maximize: <Maximize className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  Target: <Target className="w-6 h-6 text-blue-600" />,
  Shield: <Shield className="w-6 h-6 text-blue-600" />,
  Activity: <Activity className="w-6 h-6 text-blue-600" />
};

export default function ProductDetail({ initialProduct = null, locationData = null, isLocationPseo = false }) {
  const { slug } = useParams();
  const locationCtx = useLocationContext();

  const activeCityName = locationData?.name || (locationCtx.isLocationRoute ? locationCtx.cityName : null);
  const activeStateName = locationData?.state || (locationCtx.isLocationRoute ? locationCtx.stateName : null);
  const isCityPage = Boolean(isLocationPseo || (locationCtx.isLocationRoute && locationCtx.cityName));

  const [product, setProduct] = useState(initialProduct);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(!initialProduct);

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Image Zoom State
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // If initialProduct was already supplied via server-side rendering, just load related products
    const fetchProductDetails = async () => {
      try {
        if (!product) {
          setLoading(true);
        }
        const response = await apiClient.get('/products');
        const allProducts = response.data || [];

        let currentProduct = product;
        if (!currentProduct) {
          // Check direct slug match
          currentProduct = allProducts.find(p => p.slug === slug);

          // If slug contains -in-, extract base product slug
          if (!currentProduct && slug && slug.includes('-in-')) {
            const baseSlug = slug.slice(0, slug.lastIndexOf('-in-'));
            currentProduct = allProducts.find(p => p.slug === baseSlug);
          }
          setProduct(currentProduct || null);
        }

        if (currentProduct) {
          setRelatedProducts(allProducts.filter(p => p._id !== currentProduct._id).slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [slug]);

  if (loading) {
    return <div className="pt-32 pb-20 text-center min-h-screen text-xl font-bold">Loading product details...</div>;
  }

  if (!product) {
    return <NotFound />;
  }

  const displayTitle = isCityPage && activeCityName
    ? `${product.title} in ${activeCityName}`
    : product.title;

  return (
    <div className="pt-24 pb-0 bg-[#f8f9fa] min-h-screen font-sans text-gray-900">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-[14px] font-semibold text-gray-500 mb-6 lg:mb-8 mt-4">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>›</span>
          <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <span>›</span>
          {isCityPage && activeCityName && (
            <>
              <span className="text-blue-600">{activeCityName}</span>
              <span>›</span>
            </>
          )}
          <span className="text-gray-800">{product.category?.name || 'Category'}</span>
          <span>›</span>
          <span className="text-gray-800">{product.title}</span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16 items-start">

          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 md:h-[500px] lg:sticky lg:top-32">
            {/* Thumbnails */}
            <div className="flex flex-row md:flex-col gap-3 md:w-20 shrink-0 overflow-x-auto md:overflow-y-auto hide-scrollbar pb-2 md:pb-0">
              {(product.images || []).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 md:w-full shrink-0 aspect-square rounded-lg border-2 overflow-hidden transition-all ${activeImage === idx ? 'border-blue-600' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div
              className="w-full aspect-square rounded-2xl overflow-hidden bg-white border border-gray-200 relative cursor-zoom-in flex items-center justify-center"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images && product.images[activeImage] ? product.images[activeImage] : '/images/logo.png'}
                alt={displayTitle}
                className={`w-full h-full object-contain transition-transform duration-200 ease-out`}
                style={{
                  transform: isZooming ? 'scale(2.5)' : 'scale(1)',
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {isCityPage && activeCityName && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-[#1e3a8a] text-xs font-bold rounded-full w-max mb-3 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                Available for dispatch to {activeCityName}{activeStateName ? `, ${activeStateName}` : ''}
              </div>
            )}

            <h1 className="text-[32px] sm:text-[36px] font-black leading-tight text-[#0f172a] mb-4">
              {displayTitle}
            </h1>
            <p className="text-base sm:text-[17px] font-medium text-gray-700 leading-relaxed mb-6">
              {product.shortDesc}
            </p>

            <ul className="space-y-3 mb-8">
              {(product.features || []).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-[15px] sm:text-base font-medium text-gray-800">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-10">
              <button
                onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
                className="bg-[#1e3a8a] text-white px-8 py-3.5 rounded-lg font-bold text-[13px] hover:bg-[#152960] transition-colors flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Layout className="w-4 h-4" />
                REQUEST A QUOTE
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`https://wa.me/918448336036?text=Hi, I am interested in ${displayTitle}`}
                target="_blank" rel="noopener noreferrer"
                className="bg-white border-2 border-green-500 text-green-600 px-8 py-3.5 rounded-lg font-bold text-[13px] hover:bg-green-50 transition-colors flex items-center gap-2 shadow-sm"
              >
                WHATSAPP US
              </a>
            </div>

            {/* Info Boxes */}
            <div className="flex flex-wrap gap-x-10 gap-y-6 mt-auto border-t border-gray-200 pt-8">
              {(product.infoBoxes || []).map((box, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="text-orange-500 mt-0.5">{IconMap[box.icon] || <Settings className="w-5 h-5" />}</div>
                  <div>
                    <h5 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">{box.title}</h5>
                    <p className="text-[14px] font-bold text-gray-900 leading-snug">
                      {box.title === 'Delivery' && isCityPage && activeCityName
                        ? `Fast Delivery to ${activeCityName}`
                        : box.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-20">
          <div className="flex items-center border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
            {['overview', 'specifications'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-[14px] font-black uppercase tracking-wider whitespace-nowrap transition-colors relative cursor-pointer ${activeTab === tab ? 'text-[#1e3a8a]' : 'text-gray-500 hover:text-gray-800'}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1e3a8a] rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[400px]">
            {activeTab === 'overview' && (
              <div className="flex flex-col gap-16">
                <div className="w-full">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Overview</h3>
                  <div className="space-y-4 mb-8">
                    {product.longDesc ? (
                      <div
                        className="prose max-w-none text-gray-700 prose-headings:font-bold prose-h2:text-2xl prose-h2:mb-4 prose-h3:text-xl prose-h3:mb-3 prose-p:mb-5 prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2"
                        dangerouslySetInnerHTML={{ __html: product.longDesc }}
                      />
                    ) : (
                      <p className="text-[15px] text-gray-400 italic">No overview available.</p>
                    )}
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-start gap-4">
                    <Shield className="w-8 h-8 text-blue-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px] mb-1">Quality Assured</h4>
                      <p className="text-[13px] text-gray-600 font-medium">
                        Every product is manufactured and inspected to meet strict industrial quality standards for high reliability{isCityPage && activeCityName ? ` in ${activeCityName}` : ''}.
                      </p>
                    </div>
                  </div>
                </div>

                {product.overviewFeatures && product.overviewFeatures.length > 0 && (
                  <div className="w-full">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                      {product.overviewFeatures.map((feat, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                            {IconMap[feat.icon] || <Target className="w-6 h-6 text-blue-600" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-[15px] text-gray-900 mb-1">{feat.title}</h4>
                            <p className="text-[13px] text-gray-600 leading-relaxed">{feat.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                {product.specifications && product.specifications.length > 0 ? (
                  <div className="border border-gray-200 rounded-xl overflow-hidden max-w-2xl">
                    <table className="w-full text-left text-sm text-gray-600">
                      <tbody>
                        {product.specifications.map((spec, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-6 py-4 font-bold text-gray-900 w-1/3 border-b border-gray-100">{spec.label}</td>
                            <td className="px-6 py-4 border-b border-gray-100">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-[15px] text-gray-400 italic">No specifications provided.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((rel) => {
                const targetLink = isCityPage && activeCityName && locationData?.slug
                  ? `/products/${rel.slug}-in-${locationData.slug}`
                  : `/products/${rel.slug}`;
                return (
                  <Link
                    key={rel._id}
                    to={targetLink}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col"
                  >
                    <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                      <img
                        src={rel.images && rel.images[0] ? rel.images[0] : '/images/logo.png'}
                        alt={rel.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-grow">
                        {rel.shortDesc}
                      </p>
                      <span className="text-xs font-bold text-blue-600 flex items-center gap-1 mt-auto">
                        View Product <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
      <CTA />
    </div>
  );
}
