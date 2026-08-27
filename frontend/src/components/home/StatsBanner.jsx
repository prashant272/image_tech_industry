import React from 'react';
import { Award, Factory, Truck, ShieldCheck, Globe, Clock } from 'lucide-react';

const StatsBanner = () => {
  const stats = [
    {
      icon: <Award className="w-8 h-8 md:w-10 md:h-10 text-[#294c7a]" strokeWidth={1.5} />,
      title: '35+ Years',
      subtitle: 'Of Manufacturing'
    },
    {
      icon: <Factory className="w-8 h-8 md:w-10 md:h-10 text-[#294c7a]" strokeWidth={1.5} />,
      title: '10,000+',
      subtitle: 'Customers Across Industries'
    },
    {
      icon: <Truck className="w-8 h-8 md:w-10 md:h-10 text-[#294c7a]" strokeWidth={1.5} />,
      title: 'World Wide',
      subtitle: 'Exported To'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-[#294c7a]" strokeWidth={1.5} />,
      title: 'European',
      subtitle: 'Quality Standards'
    },
    {
      icon: <Globe className="w-8 h-8 md:w-10 md:h-10 text-[#294c7a]" strokeWidth={1.5} />,
      title: '100%',
      subtitle: 'Custom Sizes Available'
    },
    {
      icon: <Clock className="w-8 h-8 md:w-10 md:h-10 text-[#294c7a]" strokeWidth={1.5} />,
      title: '24/7',
      subtitle: 'Dedicated Support'
    }
  ];

  return (
    <div className="relative z-30 mt-8 md:-mt-10 px-4 sm:px-6 lg:px-8 max-w-[95rem] mx-auto w-full">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 divide-x-0 lg:divide-x lg:divide-gray-100">
          {stats.map((stat, index) => (
            <div key={index} className={`flex flex-col items-center text-center ${index !== 0 ? 'lg:pl-4' : ''}`}>
              <div className="mb-3 shrink-0 p-3 bg-blue-50/50 rounded-full">{stat.icon}</div>
              <div>
                <div className="font-black text-gray-900 text-base md:text-lg lg:text-xl leading-tight mb-1">
                  {stat.title}
                </div>
                <div className="text-gray-500 font-medium text-[11px] md:text-xs lg:text-sm">
                  {stat.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
