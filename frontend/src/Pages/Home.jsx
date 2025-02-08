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
    } catch (error) {}
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

  const handleBuy = (id)=>{
    localStorage.removeItem("cart")
    addCardItem(id);
    navigate("/cart")
  }

  return (
    <div className="bg-gradient-to-r from-blue-200 to-green-200">
      <ToastContainer />
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`text-emerald-900 border border-white hover:border-emerald-200 bg-white focus:ring-4 focus:outline-none focus:ring-emerald-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 ${
              selectedCategory === category ? "bg-emerald-700 text-black" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => {
          const discount = product.mrp - product.price;

          return (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow-lg bg-white dark:bg-gray-900"
            >
              <Carousel showThumbs={false} autoPlay stopOnHover={false} infiniteLoop>
                {product.images.map((image, index) => (
                  <div key={index}>
                    <img className="h-80 w-full rounded-md" src={image} alt={product.title} />
                  </div>
                ))}
              </Carousel>
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                <span className="text-gray-500 line-through">₹{product.mrp}</span>
                <span className="text-red-500 text-sm">
                  ({Math.round((discount / product.mrp) * 100)}% OFF)
                </span>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                  onClick={() => handleAddToCart(product._id)}
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <button onClick={()=>{handleBuy(product._id)}} className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                  <ShoppingBag size={18} /> Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
