import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetter from '../components/NewsLetter';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title Section */}
      <div className="text-center text-2xl font-bold pt-10 border-t border-gray-200">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Contact Details Section */}
      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28 items-center">
        {/* Image */}
        <img
          className="w-full md:max-w-md rounded-lg shadow-lg"
          src={assets.contact_img}
          alt="Contact Us"
        />

        {/* Contact Information */}
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-2xl text-gray-700">Our Store</p>
          <p className="text-gray-600">
            123 MG Road,
            <br />
            Pune, Maharastra, India - 412101
          </p>
          <p className="text-gray-600">
            Tel: +91 9005 003210
            <br />
            Email: <a href="mailto:admin@xyz.com" className="text-blue-600 hover:underline">admin@xyz.com</a>
          </p>
          <p className="text-gray-600 font-medium">Careers at Forever</p>
          <p className="text-gray-500">
            Learn more about our teams and job openings by exploring opportunities.
          </p>
          <button className="border border-gray-800 px-8 py-3 text-sm font-medium text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 rounded-md">
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