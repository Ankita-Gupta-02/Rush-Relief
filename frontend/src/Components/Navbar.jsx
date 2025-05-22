import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Logo from "../assets/medicines.png";
import {
  House,
  Info,
  ShoppingCart,
  LogIn,
  UserRoundPlus,
  Search,
  Zap,
  Menu,
  X
} from "lucide-react";

function Navbar() {
  const [pin, setPin] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const options = [
    { text: "Home", href: "/dash/home", icon: <House /> },
    { text: "About", href: "/dash/about", icon: <Info /> },
    { text: "Cart", href: "/dash/cart", icon: <ShoppingCart /> },
    { text: "Login", href: "/login", icon: <LogIn /> },
    { text: "Sign up", href: "/register", icon: <UserRoundPlus /> },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/dash/home?name=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-emerald-700 text-white p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/dash/landing" className="flex items-center gap-2 md:gap-4 font-bold text-base md:text-lg">
            <img src={Logo} alt="Logo" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
            <p>Rush Relief</p>
          </Link>

          <button
            className="md:hidden block p-2 hover:bg-emerald-600 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            <div className="flex flex-col text-xs md:text-sm">
              <p>Express delivery to</p>
              <div className="flex items-center gap-1">
                <Zap size={16} className="text-yellow-300" />
                <input
                  type="text"
                  placeholder="Enter PIN Code"
                  className="p-1.5 md:p-2 rounded-md text-black w-24 md:w-32 text-sm"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
              </div>
            </div>

            {location.pathname === "/dash/home" && (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="p-1.5 md:p-2 rounded-l-md text-black w-32 md:w-40 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  className="bg-green-300 text-black p-1.5 md:p-2 rounded-r-md hover:opacity-80 transition-opacity"
                  onClick={handleSearch}
                >
                  <Search size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div 
          className={`${isMenuOpen ? "block" : "hidden"} md:flex mt-4 md:mt-0 flex-col md:flex-row gap-2 md:gap-4 font-bold`}
        >
          {options.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="bg-green-300 text-black p-2 md:p-3 rounded-md hover:opacity-80 hover:scale-105 transition-all flex items-center gap-2 text-sm md:text-base"
            >
              {item.icon}
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
