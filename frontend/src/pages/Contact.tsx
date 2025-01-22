import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetter from '../components/NewsLetter';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center text-3xl font-bold pt-12 border-t border-gray-300">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Content Section */}
      <div className="my-16 flex flex-col md:flex-row gap-12 items-center">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            className="w-full max-w-lg mx-auto rounded-xl shadow-md"
            src={assets.contact_img}
            alt="Contact Us"
          />
        </div>

        {/* Contact Information */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Our Store</h2>
          <p className="text-gray-600">
           Mg Road
            <br />
            Pune, Maharashtra
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Tel:</span> (415) 555-022-333
            <br />
            <span className="font-medium">Email:</span>{' '}
            <a
              href="mailto:admin@xyz.com"
              className="text-blue-600 hover:underline"
            >
              admin@xyz.com
            </a>
          </p>
          <div>
            <h3 className="text-lg font-medium text-gray-800">Careers at Fashion World</h3>
            <p className="text-gray-600">
              Learn more about our teams and exciting job openings.
            </p>
          </div>
          <button className="px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition-all">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsLetter />
    </div>
  );
};

export default Contact;