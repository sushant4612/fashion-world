import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetter from '../components/NewsLetter';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* About Us Header */}
      <div className="text-3xl font-bold text-center pt-12 border-t border-gray-300">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* About Us Section */}
      <div className="my-16 flex flex-col md:flex-row gap-16 items-center">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            className="w-full max-w-lg mx-auto rounded-xl shadow-lg"
            src={assets.about_img}
            alt="About Us"
          />
        </div>

        {/* Text Content Section */}
        <div className="flex flex-col gap-6 text-gray-700 md:w-1/2">
          <p>
            Welcome to our company, a trusted name in delivering excellence and
            innovation. Over the years, we’ve established ourselves as a
            leader in providing high-quality products and services that meet
            the evolving needs of our customers.
          </p>
          <p>
            From humble beginnings, we have grown into a dynamic organization,
            driven by a passion for creating value. Our commitment to quality
            and customer satisfaction remains at the heart of everything we do.
          </p>
          <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
          <p>
            Our mission is to empower individuals and businesses by delivering
            products and services that inspire and elevate. We aim to foster a
            culture of trust, innovation, and excellence that benefits our
            customers, employees, and communities.
          </p>
        </div>
      </div>

      {/* Why Choose Us Header */}
      <div className="text-2xl font-bold text-center py-6">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      {/* Why Choose Us Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="border border-gray-300 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
          <h4 className="text-lg font-semibold mb-4">Quality Assurance</h4>
          <p className="text-gray-600">
            We are dedicated to maintaining the highest standards of quality.
            Every product we offer is carefully crafted and thoroughly tested
            to ensure it meets your expectations.
          </p>
        </div>
        <div className="border border-gray-300 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
          <h4 className="text-lg font-semibold mb-4">Convenience</h4>
          <p className="text-gray-600">
            Our user-friendly approach ensures you get what you need when you
            need it. We prioritize making your experience smooth and hassle-free,
            from ordering to delivery.
          </p>
        </div>
        <div className="border border-gray-300 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
          <h4 className="text-lg font-semibold mb-4">
            Exceptional Customer Service
          </h4>
          <p className="text-gray-600">
            Our team is always here to help. Whether you have questions or need
            support, we are committed to providing prompt, reliable assistance
            to ensure your satisfaction.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsLetter />
    </div>
  );
};

export default About;