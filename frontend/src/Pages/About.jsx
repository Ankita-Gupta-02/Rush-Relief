import React from 'react';
import { ShieldCheck, Lock, Wallet } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-green-300 py-10 px-5 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-green-600 text-center mb-6">About Us</h1>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Welcome to <span className="font-bold text-green-600">Rush Relief</span>, your trusted online pharmacy committed to providing fast and reliable healthcare solutions. Our mission is to make essential medications accessible and convenient for everyone, ensuring your health remains our top priority.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed mt-2">
          At <span className="font-bold text-green-600">Rush Relief</span>, we strive to deliver high-quality pharmaceutical products with swift service, making sure that you receive your medications safely and on time. We are dedicated to enhancing your healthcare experience through innovation and trust.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg mt-2 space-y-2">
          <li><span className="font-bold text-blue-600">Fast and secure</span> medication delivery</li>
          <li><span className="font-bold text-blue-600">Authentic and certified</span> pharmaceutical products</li>
          <li><span className="font-bold text-blue-600">24/7 customer support</span> for all your queries</li>
          <li><span className="font-bold text-blue-600">Easy online prescription uploads</span> for hassle-free orders</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Contact Us</h2>
        <p className="text-gray-700 text-lg mt-2">
          Have questions? Reach out to us anytime:
        </p>
        <p className="text-gray-900 font-semibold">📧 Email: <a href="mailto:support@rushrelief.com" className="text-blue-600 hover:underline">support@rushrelief.com</a></p>
        <p className="text-gray-900 font-semibold">📞 Phone: <a href="tel:+918024576293" className="text-blue-600 hover:underline">+91 8024576293</a></p>

        <div className="mt-8 bg-gray-50 p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="text-green-600 w-12 h-12 mb-2" />
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Reliable</h2>
              <p className="text-gray-700 text-lg font-medium">Trustworthy & Certified Medications</p>
            </div>
            <div className="flex flex-col items-center">
              <Lock className="text-blue-600 w-12 h-12 mb-2" />
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Secure</h2>
              <p className="text-gray-700 text-lg font-medium">Secure Transactions & Data Protection</p>
            </div>
            <div className="flex flex-col items-center">
              <Wallet className="text-yellow-600 w-12 h-12 mb-2" />
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Affordable</h2>
              <p className="text-gray-700 text-lg font-medium">Affordable Pricing & Great Discounts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
