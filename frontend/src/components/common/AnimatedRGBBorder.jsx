import React from 'react';

const AnimatedRGBBorder = ({ children, className = '' }) => {
  return (
    <div className={`relative group overflow-hidden rounded-[1.1rem] p-[2.5px] cursor-default ${className}`}>
      {/* Continuous Full RGB Border - Slowed Down */}
      <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,#ff0000,#ff7f00,#ffff00,#00ff00,#0000ff,#4b0082,#9400d3,#ff0000)] opacity-100"></div>
      
      {/* Inner Content Wrapper */}
      <div className="relative flex w-full h-full items-center justify-center bg-white rounded-[15px] z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedRGBBorder;
