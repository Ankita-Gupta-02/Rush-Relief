import React, { useEffect, useState } from "react";
import { getCard } from "../Helpers/cartHelpers";
import { GET } from "../Helpers/API";
import Checkout from "../Components/Checkout";

function Cart() {
  const cartItems = getCard();
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const DELIVERY_CHARGE = 40;
  const PLATFORM_FEE = 2;

  useEffect(() => {
    const fetchProducts = async () => {
      let fetchedCart = [];
      for (let index = 0; index < cartItems.length; index++) {
        const element = cartItems[index];
        const product = await getProduct(element);
        if (product) {
          fetchedCart.push(product);
        }
      }
      setCart(fetchedCart);
    };

    fetchProducts();
  }, []);

  const getProduct = async (id) => {
    try {
      const data = await GET("product/" + id);
      return data.product;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id); // Remove from local storage
    setCart((prevCart) => prevCart.filter((item) => item._id !== id)); // Update UI
  };
  

  const totalCartValue = cart.reduce((total, item) => total + item.price, 0) + DELIVERY_CHARGE + PLATFORM_FEE;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="space-y-4">
          <ul>
            {cart.map((item) => (
              <li key={item._id} className="p-4 bg-white shadow-md rounded-md flex flex-col md:flex-row items-center gap-4">
                <img src={item.images[0]} alt={item.title} className="w-20 h-20 rounded-md object-cover" />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-700">Price: ₹{item.price}</p>
                  <p className="text-gray-500 text-sm">MRP: ₹{item.mrp}</p>
                  <p className="text-yellow-500 text-sm">⭐ {item.avgRating} / 5</p>
                </div>
                <div className="flex gap-2">
            
                <button 
                    onClick={() => handleRemove(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition w-full md:w-auto"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-4 bg-white shadow-md rounded-md">
            <p className="text-lg font-semibold">Subtotal: ₹{cart.reduce((total, item) => total + item.price, 0)}</p>
            <p className="text-gray-600">Delivery Charge: ₹{DELIVERY_CHARGE}</p>
            <p className="text-gray-600">Platform Fee: ₹{PLATFORM_FEE}</p>
            <hr className="my-2" />
            <p className="text-xl font-bold">Total: ₹{totalCartValue}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)} // Open modal when clicked
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      {/* Checkout Modal */}
      <Checkout
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} // Close modal
        totalCartValue={totalCartValue} products={cart}
      />
    </div>
  );
}

export default Cart;
