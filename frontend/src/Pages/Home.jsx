import React, { useState, useEffect } from "react";
import { GET } from "../Helpers/API";
import { ShoppingCart, ShoppingBag } from "lucide-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ToastContainer, toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addCardItem } from "../Helpers/cartHelpers";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const getProducts = async () => {
    try {
      const data = await GET("product/list");
      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [products, searchParams, selectedCategory]);

  const filterProducts = () => {
    const query = searchParams.get("name")?.toLowerCase() || "";
    let filtered = products;

    if (query) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category.name === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (id) => {
    addCardItem(id);
    toast.success("Item added to cart");
  };

  useEffect(() => {
    getProducts();
  }, []);

  const categories = [
    "All", "Vitamins & Nutrition", "Winter Care Essentials", "Nutritional Drinks",
    "Stomach Care", "Pain Relief", "Fitness Supplements", "Healthy Snacks"
  ];

  const handleBuy = (id) => {
    localStorage.removeItem("cart");
    addCardItem(id);
    navigate("/cart");
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 to-green-200 min-h-screen">
      <ToastContainer />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center py-3 sm:py-4 md:py-6 flex-wrap gap-2 sm:gap-3 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`text-emerald-900 border border-white hover:border-emerald-200 bg-white focus:ring-4 focus:outline-none focus:ring-emerald-300 rounded-full text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-center whitespace-nowrap transition-colors duration-200 ${
                selectedCategory === category ? "bg-emerald-700 text-white" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600 text-lg">No products found</p>
              <p className="text-gray-500 mt-2">Try a different category or search term</p>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const discount = product.mrp - product.price;

              return (
                <div
                  key={product._id}
                  className="border rounded-lg p-4 sm:p-5 shadow-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Carousel 
                    showThumbs={false} 
                    autoPlay 
                    stopOnHover={false} 
                    infiniteLoop
                    showStatus={false}
                    showIndicators={false}
                    className="rounded-lg overflow-hidden"
                  >
                    {product.images.map((image, index) => (
                      <div key={index} className="aspect-square">
                        <img 
                          className="h-full w-full object-cover" 
                          src={image} 
                          alt={product.title} 
                        />
                      </div>
                    ))}
                  </Carousel>
                  <h3 className="text-base sm:text-lg font-semibold mt-3 line-clamp-2">{product.title}</h3>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-base sm:text-lg font-bold text-green-600">₹{product.price}</span>
                    <span className="text-sm sm:text-base text-gray-500 line-through">₹{product.mrp}</span>
                    <span className="text-xs sm:text-sm text-red-500">
                      ({Math.round((discount / product.mrp) * 100)}% OFF)
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mt-4">
                    <button
                      className="flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm sm:text-base transition-colors duration-200"
                      onClick={() => handleAddToCart(product._id)}
                    >
                      <ShoppingCart size={16} className="sm:w-5 sm:h-5" /> Add to Cart
                    </button>
                    <button 
                      onClick={() => handleBuy(product._id)} 
                      className="flex items-center justify-center gap-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm sm:text-base transition-colors duration-200"
                    >
                      <ShoppingBag size={16} className="sm:w-5 sm:h-5" /> Buy Now
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
