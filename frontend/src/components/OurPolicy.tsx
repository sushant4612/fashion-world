import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-center gap-12 sm:gap-6 text-center py-20  text-gray-700">
      <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
        <img 
          src={assets.exchange_icon} 
          className="w-16 h-16 m-auto mb-5 rounded-full bg-blue-100 p-2" 
          alt="Exchange Policy Icon" 
        />
        <p className="font-semibold text-lg">Easy Exchange Policy</p>
        <p className="text-gray-500 mt-2 text-sm">We offer a hassle-free exchange policy for all our customers.</p>
      </div>
      <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
        <img 
          src={assets.quality_icon} 
          className="w-16 h-16 m-auto mb-5 rounded-full bg-green-100 p-2" 
          alt="Quality Icon" 
        />
        <p className="font-semibold text-lg">7 Days Return Policy</p>
        <p className="text-gray-500 mt-2 text-sm">Enjoy a 7-day free return policy on all purchases.</p>
      </div>
      <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
        <img 
          src={assets.support_img} 
          className="w-16 h-16 m-auto mb-5 rounded-full bg-yellow-100 p-2" 
          alt="Customer Support Icon" 
        />
        <p className="font-semibold text-lg">24/7 Customer Support</p>
        <p className="text-gray-500 mt-2 text-sm">Our support team is available 24/7 to assist you.</p>
      </div>
    </div>
  );
};

export default OurPolicy;