import React, { useState } from "react";
import BG from "../assets/landing.jpg";
import { Facebook, Instagram, Twitter, Youtube, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const reviews = [
  {
    text: "Excellent service! My medicines arrived on time, and the process was hassle-free.",
    rating: 5,
    author: "Rahul Sharma",
  },
  {
    text: "Affordable prices and secure transactions. Highly recommended!",
    rating: 4,
    author: "Priya Mehta",
  },
];

function Landing() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/dash/home?name=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="relative w-full h-screen">
        <img src={BG} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black bg-opacity-20">
          <div className="absolute flex flex-col">
            <header className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md opacity-90">
              <h1 className="text-4xl font-bold text-green-600">Rush Relief</h1>
              <p className="text-lg text-gray-700 mt-2">
                Your health, our priority - Fast & Reliable Medicine Delivery
              </p>
            </header>
            <main className="w-full max-w-4xl bg-white p-6 mt-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800">
                Order Your Medicines Online
              </h2>
              <p className="text-gray-600 mt-2">
                Get your prescriptions delivered quickly and hassle-free.
              </p>
              <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
                <input
                  type="text"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for medicines..."
                  className="w-full md:w-2/3 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
                <button
                  onClick={() => handleSearch()}
                  className="w-full md:w-1/3 bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition"
                >
                  Search
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <section className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg mt-10 bg-gradient-to-r from-blue-200 to-green-200">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Customer Reviews
        </h2>
        <div className="mt-4 space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-gray-700">"{review.text}"</p>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? "text-yellow-500" : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1">- {review.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-green-100 mt-10 py-10 text-gray-600 text-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
          <div>
            <h3 className="font-bold text-black">Company</h3>
            <p>About Us</p>
            <p>Careers</p>
            <p>Blog</p>
            <p>Partner with Rush Relief</p>
          </div>
          <div>
            <h3 className="font-bold text-black">Our Services</h3>
            <p>Order Medicine</p>
            <p>Healthcare Products</p>
          </div>
          <div>
            <h3 className="font-bold text-black">Need Help</h3>
            <p>Browse All Medicines</p>
            <p>FAQs</p>
            <p>Customer Support</p>
            <p>Return Policy</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-black">Follow Us</h3>
          <div className="flex justify-center gap-4 mt-3">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6 text-gray-600 hover:text-black transition" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="w-6 h-6 text-gray-600 hover:text-black transition" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-6 h-6 text-gray-600 hover:text-black transition" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-6 h-6 text-gray-600 hover:text-black transition" />
            </a>
          </div>
        </div>
        <p className="mt-6">&copy; 2025 Rush Relief. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
