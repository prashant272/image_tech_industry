import React from 'react';
import { ShieldCheck, Server, Cloud, Lock, Zap } from 'lucide-react';

const TrustStats = () => {
  const stats = [
    { title: 'Enterprise Security', icon: <ShieldCheck className="w-8 h-8 mb-4 text-[#12a070]" /> },
    { title: '99.9% Uptime Target', icon: <Server className="w-8 h-8 mb-4 text-[#12a070]" /> },
    { title: 'Cloud Hosted', icon: <Cloud className="w-8 h-8 mb-4 text-[#12a070]" /> },
    { title: 'Encrypted Data', icon: <Lock className="w-8 h-8 mb-4 text-[#12a070]" /> },
    { title: 'Instant Updates', icon: <Zap className="w-8 h-8 mb-4 text-[#12a070]" /> }
  ];

  return (
    <section className="py-12 lg:py-16 bg-white relative border-y border-gray-100" id="trust">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 lg:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              {stat.icon}
              <h3 className="text-gray-900 font-bold text-[15px] sm:text-[17px] tracking-wide">
                {stat.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
