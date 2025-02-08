import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import Logo from "../assets/medicines.png";
import {
  House,
  Info,
  ShoppingCart,
  LogIn,
  UserRoundPlus,
  Search,
  Zap,
} from "lucide-react";

function Navbar() {
  const [pin, setPin] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  const options = [
    { text: "Home", href: "/dash/home", icon: <House /> },
    { text: "About", href: "/dash/about", icon: <Info /> },
    { text: "Cart", href: "/dash/cart", icon: <ShoppingCart /> },
    { text: "Login", href: "/login", icon: <LogIn /> },
    { text: "Sign up", href: "/register", icon: <UserRoundPlus /> },
  ];

  // Function to handle search and update URL
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/dash/home?name=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex flex-row justify-between p-5 bg-emerald-700 text-white items-center">
      <div className="flex flex-row items-center gap-4 font-bold text-lg">
        <img src={Logo} alt="Logo" className="max-w-16" />
        <p>Rush Relief</p>
      </div>
      <div className="flex items-center gap-20">
        <div className="flex items-center flex-col">
          <p>Express delivery to</p>
          <div className="flex items-center gap-1">
            <Zap size={20} className="text-yellow-300" />
            <input
              type="text"
              placeholder="Enter PIN Code"
              className="p-2 rounded-md text-black w-40"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
        </div>

        {/* Show search bar only on /dash/home */}
        {location.pathname === "/dash/home" && (
          <div className="flex items-center gap-0">
            <input
              type="text"
              placeholder="Search for medicines..."
              className="p-2 text-black rounded-md w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Allow Enter key to trigger search
            />
            <button
              className="bg-green-300 text-black p-3 rounded-md hover:opacity-80"
              onClick={handleSearch}
            >
              <Search size={20} />
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-row gap-4 font-bold">
        {options.map((item, index) => (
          <a
            key={index}
            className="bg-green-300 text-black p-4 rounded-md opacity-90 hover:opacity-80 hover:scale-105 transition-all duration-500 flex flex-row gap-2"
            href={item.href}
          >
            {item.text}
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
