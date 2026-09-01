import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2, Settings, Layout, Maximize, Truck, Target, Shield, Activity,
  Plus, Minus, ArrowRight, ArrowLeft
} from 'lucide-react';
import CTA from '../components/home/CTA';
import apiClient from '../api/client';

const IconMap = {
  Settings: <Settings className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Maximize: <Maximize className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  Target: <Target className="w-6 h-6 text-blue-600" />,
  Shield: <Shield className="w-6 h-6 text-blue-600" />,
  Activity: <Activity className="w-6 h-6 text-blue-600" />
};

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // Fetch all products to get related products as well
        const response = await apiClient.get('/products');
        const allProducts = response.data;
        const currentProduct = allProducts.find(p => p.slug === slug);
        setProduct(currentProduct);
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
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/products" className="text-blue-600 hover:underline">Return to Products</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-0 bg-[#f8f9fa] min-h-screen font-sans text-gray-900">
      {/* Native React 19 Document Head tags */}
      <title>{product.seoTitle || `${product.title} | Imagetech Industries`}</title>
      <meta name="description" content={product.seoDescription || product.shortDesc} />
      {product.seoKeywords && <meta name="keywords" content={product.seoKeywords} />}

      {/* Open Graph Tags for Social Sharing */}
      <meta property="og:title" content={product.seoTitle || product.title} />
      <meta property="og:description" content={product.seoDescription || product.shortDesc} />
      {product.images?.length > 0 && <meta property="og:image" content={product.images[0]} />}
      <meta property="og:type" content="product" />
      <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />

      {/* Canonical Link */}
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />

      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-[14px] font-semibold text-gray-500 mb-6 lg:mb-8 mt-4">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>›</span>
          <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <span>›</span>
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
              {product.images.map((img, idx) => (
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
              className="w-full aspect-square md:aspect-auto md:flex-grow rounded-2xl overflow-hidden bg-white border border-gray-200 relative cursor-zoom-in"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[activeImage]}
                alt={product.title}
                className={`w-full h-full object-contain md:object-fill transition-transform duration-200 ease-out`}
                style={{
                  transform: isZooming ? 'scale(2.5)' : 'scale(1)',
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="text-[36px] font-black leading-tight text-[#0f172a] mb-4">
              {product.title}
            </h1>
            <p className="text-base sm:text-[17px] font-medium text-gray-700 leading-relaxed mb-6">
              {product.shortDesc}
            </p>

            <ul className="space-y-3 mb-8">
              {product.features.map((feature, idx) => (
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
                className="bg-[#1e3a8a] text-white px-8 py-3.5 rounded-lg font-bold text-[13px] hover:bg-[#152960] transition-colors flex items-center gap-2 shadow-md"
              >
                <Layout className="w-4 h-4" />
                REQUEST A QUOTE
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`https://wa.me/918448336036?text=Hi, I am interested in your ${product.title}`}
                target="_blank" rel="noopener noreferrer"
                className="bg-white border-2 border-green-500 text-green-600 px-8 py-3.5 rounded-lg font-bold text-[13px] hover:bg-green-50 transition-colors flex items-center gap-2 shadow-sm"
              >
                WHATSAPP US
              </a>
            </div>

            {/* Info Boxes */}
            <div className="flex flex-wrap gap-x-10 gap-y-6 mt-auto border-t border-gray-200 pt-8">
              {product.infoBoxes.map((box, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="text-orange-500 mt-0.5">{IconMap[box.icon] || <Settings className="w-5 h-5" />}</div>
                  <div>
                    <h5 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">{box.title}</h5>
                    <p className="text-[14px] font-bold text-gray-900 leading-snug">{box.value}</p>
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
                className={`px-8 py-4 text-[14px] font-black uppercase tracking-wider whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-[#1e3a8a]' : 'text-gray-500 hover:text-gray-800'}`}
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
                      <p className="text-[13px] text-gray-600 font-medium">Every blade is manufactured and inspected to meet strict quality standards for consistent performance.</p>
                    </div>
                  </div>
                </div>

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
                          <p className="text-[13px] font-medium text-gray-600 leading-relaxed">{feat.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {product.specifications.map((spec, idx) => (
                        <tr key={idx} className="border-b border-gray-200 last:border-0 hover:bg-gray-50">
                          <th className="py-4 px-6 text-[14px] font-bold text-gray-700 bg-gray-50/50 w-1/3">{spec.label}</th>
                          <td className="py-4 px-6 text-[14px] font-medium text-gray-900">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        {product.faqs && product.faqs.length > 0 && (
          <div className="mb-20 flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/3 bg-[#0f172a] rounded-2xl p-10 text-white flex flex-col justify-center">
              <h3 className="text-3xl font-black mb-4 leading-tight">Frequently Asked Questions</h3>
              <p className="text-gray-300 font-medium text-[15px] mb-8">
                Find answers to the most common questions about our {product.title}.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white px-6 py-3 rounded-lg font-bold text-[13px] transition-colors self-start">
                VIEW ALL FAQS
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="w-full lg:w-2/3 bg-white rounded-2xl border border-gray-200 p-2">
              {product.faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-gray-100 last:border-0">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                  >
                    <span className="font-bold text-[15px] text-gray-900 group-hover:text-blue-600 transition-colors">
                      {faq.question}
                    </span>
                    <div className="shrink-0 ml-4 text-gray-400 group-hover:text-blue-600 transition-colors">
                      {openFaqIndex === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openFaqIndex === idx ? 'max-h-40 pb-6 px-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-[14px] font-medium text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-gray-900">Related Products</h3>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {relatedProducts.map(p => (
              <div key={p.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gray-50 border-b border-gray-100 p-4">
                  <img src={p.images[0]} alt={p.title} loading="lazy" decoding="async" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 flex flex-col h-[140px]">
                  <h4 className="font-bold text-[14px] text-gray-900 leading-snug mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {p.title}
                  </h4>
                  <div className="mt-auto pt-4">
                    <Link to={`/products/${p.slug}`} className="w-full bg-[#0f172a] hover:bg-blue-700 text-white py-2 rounded-lg text-[12px] font-bold transition-colors flex items-center justify-center gap-2">
                      VIEW DETAILS
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Reused Home Page CTA */}
      <CTA />

    </div>
  );
}
