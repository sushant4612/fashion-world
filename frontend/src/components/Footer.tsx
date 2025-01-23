import React from 'react';
import { assets } from '../assets/assets';

export const Footer: React.FC = () => {
  return (
    <footer className=" text-gray-700">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14">
        {/* Logo and About Section */}
        <div>
          <img src={assets.logo} className="mb-5 w-40" alt="Company Logo" />
          <p className="text-gray-600 md:w-2/3">
            At Fashion World, we believe style is a way to say who you are without having to speak. Our collections
            blend timeless elegance with modern trends, offering something unique for everyone.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Company</h2>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <a href="#" className="hover:text-gray-900 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900 transition">
                Delivery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900 transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <a href="tel:+12124567890" className="hover:text-gray-900 transition">
                +1-212-456-7890
              </a>
            </li>
            <li>
              <a href="mailto:xyz@gmail.com" className="hover:text-gray-900 transition">
                xyz@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="">
        <hr className="border-gray-300" />
        <p className="py-5 text-center text-sm text-gray-500">
          Copyright 2025 &copy; fashionWorld.com - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};