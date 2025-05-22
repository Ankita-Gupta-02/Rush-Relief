import React, { useState, useEffect } from "react";
import { getCard, removeCardItem } from "../Helpers/cartHelpers";
import { GET } from "../Helpers/API";
import Checkout from "../Components/Checkout";

function Cart() {
  const [cartItems, setCartItems] = useState(getCard());
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const DELIVERY_CHARGE = 40;
  const PLATFORM_FEE = 2;

  const getProduct = async (id) => {
    try {
      const data = await GET("product/" + id);
      return data.product;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

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
  }, [cartItems]);

  const handleRemove = (id) => {
    removeCardItem(id);
    setCartItems(getCard());
  };

  const totalCartValue = cart.reduce((total, item) => total + item.price, 0) + DELIVERY_CHARGE + PLATFORM_FEE;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">Your cart is empty</p>
          <p className="text-gray-500 mt-2">Add some products to get started!</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:gap-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                />
                <div className="flex-1 w-full sm:w-auto text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-gray-600 mb-1">Price: ₹{item.price}</p>
                  <p className="text-gray-500 text-sm">MRP: ₹{item.mrp}</p>
                  <p className="text-yellow-500 text-sm">⭐ {item.avgRating} / 5</p>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">₹{cart.reduce((total, item) => total + item.price, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charge:</span>
                <span className="font-semibold">₹{DELIVERY_CHARGE}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee:</span>
                <span className="font-semibold">₹{PLATFORM_FEE}</span>
              </div>
              <div className="border-t border-gray-200 my-3"></div>
              <div className="flex justify-between text-lg sm:text-xl">
                <span className="font-bold">Total:</span>
                <span className="font-bold">₹{totalCartValue}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      <Checkout
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        totalCartValue={totalCartValue}
        products={cart}
      />
    </div>
  );
}

export default Cart;
