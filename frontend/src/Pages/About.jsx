import React from 'react';
import { ShieldCheck, Lock, Wallet } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-green-300 py-6 sm:py-10 px-4 sm:px-8 md:px-16 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-600 text-center mb-4 sm:mb-6">About Us</h1>
        
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
          Welcome to <span className="font-bold text-green-600">Rush Relief</span>, your trusted online pharmacy committed to providing fast and reliable healthcare solutions. Our mission is to make essential medications accessible and convenient for everyone, ensuring your health remains our top priority.
        </p>
        
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-4 sm:mt-6">Our Mission</h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mt-2">
          At <span className="font-bold text-green-600">Rush Relief</span>, we strive to deliver high-quality pharmaceutical products with swift service, making sure that you receive your medications safely and on time. We are dedicated to enhancing your healthcare experience through innovation and trust.
        </p>
        
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-4 sm:mt-6">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700 text-base sm:text-lg mt-2 space-y-2">
          <li><span className="font-bold text-blue-600">Fast and secure</span> medication delivery</li>
          <li><span className="font-bold text-blue-600">Authentic and certified</span> pharmaceutical products</li>
          <li><span className="font-bold text-blue-600">24/7 customer support</span> for all your queries</li>
          <li><span className="font-bold text-blue-600">Easy online prescription uploads</span> for hassle-free orders</li>
        </ul>
        
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-4 sm:mt-6">Contact Us</h2>
        <p className="text-gray-700 text-base sm:text-lg mt-2">
          Have questions? Reach out to us anytime:
        </p>
        <div className="space-y-2 mt-2">
          <p className="text-gray-900 font-semibold">📧 Email: <a href="mailto:support@rushrelief.com" className="text-blue-600 hover:underline">support@rushrelief.com</a></p>
          <p className="text-gray-900 font-semibold">📞 Phone: <a href="tel:+918024576293" className="text-blue-600 hover:underline">+91 8024576293</a></p>
        </div>

        <div className="mt-6 sm:mt-8 bg-gray-50 p-6 sm:p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <ShieldCheck className="text-green-600 w-10 h-10 sm:w-12 sm:h-12 mb-2" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Reliable</h2>
              <p className="text-gray-700 text-base sm:text-lg font-medium">Trustworthy & Certified Medications</p>
            </div>
            <div className="flex flex-col items-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <Lock className="text-blue-600 w-10 h-10 sm:w-12 sm:h-12 mb-2" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Secure</h2>
              <p className="text-gray-700 text-base sm:text-lg font-medium">Secure Transactions & Data Protection</p>
            </div>
            <div className="flex flex-col items-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <Wallet className="text-yellow-600 w-10 h-10 sm:w-12 sm:h-12 mb-2" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Affordable</h2>
              <p className="text-gray-700 text-base sm:text-lg font-medium">Affordable Pricing & Great Discounts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
