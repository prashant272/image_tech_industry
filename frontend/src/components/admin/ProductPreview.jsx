import React, { useState } from 'react';
import { 
  CheckCircle2, Settings, Layout, Maximize, Truck, Target, Shield, Activity, 
  Plus, Minus, ArrowRight
} from 'lucide-react';

const IconMap = {
  Settings: <Settings className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Maximize: <Maximize className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  Target: <Target className="w-6 h-6 text-blue-600" />,
  Shield: <Shield className="w-6 h-6 text-blue-600" />,
  Activity: <Activity className="w-6 h-6 text-blue-600" />
};

export default function ProductPreview({ product, categories }) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  if (!product) return null;

  // Find category name
  const categoryName = categories.find(c => c._id === product.category)?.name || 'Category Name';
  
  // Clean arrays (remove empty strings) for cleaner preview
  const validImages = product.images.filter(i => i && i.trim() !== '');
  const mainImage = validImages.length > 0 ? validImages[activeImage] || validImages[0] : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCA4MDAgNjAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBzbGljZSI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YxZjVmOSIgLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5NDkzYjgiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=';

  const validFeatures = product.features.filter(f => f && f.trim() !== '');
  const validOverviewText = product.overviewText.filter(t => t && t.trim() !== '');

  return (
    <div className="bg-[#f8f9fa] min-h-full font-sans text-gray-900 select-none rounded-xl overflow-hidden border-2 border-gray-200 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-center font-bold text-gray-500 text-xs tracking-widest uppercase shrink-0">
        Live Preview
      </div>
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 w-full">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-500 mb-8">
          <span>Home</span>
          <span>›</span>
          <span>Products</span>
          <span>›</span>
          <span className="text-gray-800">{categoryName}</span>
          <span>›</span>
          <span className="text-gray-800">{product.title || 'Product Title'}</span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col xl:flex-row gap-8 mb-12">
          
          {/* Image Gallery */}
          <div className="w-full xl:w-1/2 flex gap-3 h-[300px]">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 w-16 shrink-0 overflow-y-auto hide-scrollbar">
              {validImages.map((img, idx) => (
                <div 
                  key={idx}
                  className={`w-full aspect-square rounded-md border-2 overflow-hidden transition-all ${activeImage === idx ? 'border-blue-600' : 'border-gray-200'}`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </div>
              ))}
              {validImages.length === 0 && (
                 <div className="w-full aspect-square rounded-md border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                    <span className="text-[9px] text-gray-400 font-bold">Image</span>
                 </div>
              )}
            </div>
            {/* Main Image */}
            <div className="flex-grow rounded-xl overflow-hidden bg-white border border-gray-200 relative">
              <img 
                src={mainImage} 
                alt={product.title} 
                className="w-full h-full object-contain p-2"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full xl:w-1/2 flex flex-col">
            <h1 className="text-[24px] font-black leading-tight text-[#0f172a] mb-3">
              {product.title || 'Product Title...'}
            </h1>
            <p className="text-[13px] font-medium text-gray-700 leading-relaxed mb-4">
              {product.shortDesc || 'Short description will appear here...'}
            </p>

            <ul className="space-y-2 mb-6">
              {validFeatures.length > 0 ? validFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-[12px] font-semibold text-gray-800">{feature}</span>
                </li>
              )) : (
                <li className="flex items-start gap-2 text-gray-400 italic">
                  <span className="text-[12px]">No features added yet.</span>
                </li>
              )}
            </ul>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#1e3a8a] text-white px-5 py-2 rounded-lg font-bold text-[11px] flex items-center gap-2 shadow-sm opacity-80">
                <Layout className="w-3 h-3" />
                REQUEST A QUOTE
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Info Boxes */}
            <div className="grid grid-cols-2 gap-2 mt-auto">
              {product.infoBoxes.map((box, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col justify-center gap-1 shadow-sm">
                  <div className="text-gray-400 scale-75 origin-left">{IconMap[box.icon] || <Settings className="w-4 h-4" />}</div>
                  <div>
                    <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">{box.title || 'Title'}</h5>
                    <p className="text-[11.5px] font-bold text-gray-900 leading-snug">{box.value || 'Value'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-10">
          <div className="flex items-center border-b border-gray-200 mb-6 overflow-x-auto hide-scrollbar">
            {['overview', 'specifications'].map(tab => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-[12px] font-black uppercase tracking-wider whitespace-nowrap transition-colors relative cursor-pointer ${activeTab === tab ? 'text-[#1e3a8a]' : 'text-gray-500 hover:text-gray-800'}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1e3a8a] rounded-t-full"></div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            {activeTab === 'overview' && (
              <div className="flex flex-col xl:flex-row gap-8">
                <div className="w-full xl:w-1/2">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Product Overview</h3>
                  <div className="space-y-3 mb-6">
                    {product.longDesc ? (
                      <p className="text-[13px] font-medium text-gray-700 leading-relaxed whitespace-pre-line">
                        {product.longDesc}
                      </p>
                    ) : (
                      <p className="text-[13px] text-gray-400 italic">Long description will appear here in the overview...</p>
                    )}
                  </div>
                </div>
                
                <div className="w-full xl:w-1/2">
                  <div className="grid grid-cols-1 gap-4">
                    {product.overviewFeatures.map((feat, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                           {IconMap[feat.icon] || <Target className="w-4 h-4 text-blue-600" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-[13px] text-gray-900 mb-0.5">{feat.title || 'Feature Title'}</h4>
                          <p className="text-[12px] font-medium text-gray-600 leading-relaxed">{feat.desc || 'Description'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Technical Specifications</h3>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {product.specifications.map((spec, idx) => (
                        <tr key={idx} className="border-b border-gray-200 last:border-0 bg-white">
                          <th className="py-2 px-3 text-[12px] font-bold text-gray-700 bg-gray-50 w-1/3">{spec.label || 'Label'}</th>
                          <td className="py-2 px-3 text-[12px] font-medium text-gray-900">{spec.value || 'Value'}</td>
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
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="w-full xl:w-1/3 bg-[#0f172a] rounded-xl p-6 text-white flex flex-col justify-center">
              <h3 className="text-xl font-black mb-2">FAQs</h3>
              <p className="text-gray-300 font-medium text-[12px]">
                Questions about {product.title || 'this product'}?
              </p>
            </div>
            <div className="w-full xl:w-2/3 bg-white rounded-xl border border-gray-200 p-2">
              {product.faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-gray-100 last:border-0">
                  <div className="w-full flex items-center justify-between p-3 text-left">
                    <span className="font-bold text-[13px] text-gray-900">
                      {faq.question || 'Question?'}
                    </span>
                    <Plus className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
