import React from 'react';
import { assets } from '../assets/assets';

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-white shadow-lg overflow-hidden">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141] max-w-md px-5 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <div className="w-8 md:w-11 h-[2px] bg-[#414141]"></div>
            <p className="font-medium text-sm md:text-base tracking-wide">OUR BESTSELLER</p>
          </div>
          <h1 className="prata-regular text-4xl sm:py-3 lg:text-5xl leading-snug tracking-wide text-gray-800 transition-transform duration-500 ease-in-out hover:scale-105">
            Discover the Latest Arrivals
          </h1>
          <div className="flex items-center gap-3 mt-4 justify-center sm:justify-start">
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300">
              Shop Now
            </button>
            <p className="font-semibold text-sm md:text-base underline cursor-pointer hover:text-gray-600">
              Learn More
            </p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 relative group">
        <img
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          src={assets.heroImg}
          alt="Hero Image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
      </div>
    </div>
  );
};

export default Hero;