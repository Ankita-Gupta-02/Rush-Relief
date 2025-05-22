import React, { useState } from "react";
import Modal from "react-modal";
import { POST } from "../Helpers/API";

Modal.setAppElement("#root");

function Checkout({ isOpen, onClose, products }) {
  const [address, setAddress] = useState("");
  const [paymentMode] = useState("Cash on Delivery");

  const handleConfirm = async () => {
    if (!address.trim()) {
      alert("Please enter your address.");
      return;
    }

    try {
      const data = await POST("order/new", { address, paymentMode, products });
      alert(data.message);
      localStorage.removeItem("cart");
    } catch (error) {
      alert(error);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Checkout"
      className="bg-white p-4 sm:p-6 rounded-lg shadow-xl max-w-md w-[90%] sm:w-full mx-auto mt-12 sm:mt-24 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
    >
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800">Checkout</h2>

      {/* Address Input */}
      <label className="block text-sm sm:text-base text-gray-700 font-semibold mb-1 sm:mb-2">
        Enter Delivery Address:
      </label>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-2 border rounded-md mb-3 sm:mb-4 text-sm sm:text-base min-h-[100px]"
        placeholder="Enter your full address"
      />

      {/* Payment Mode Display */}
      <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
        <strong>Payment Mode:</strong> {paymentMode}
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 sm:space-x-4">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Confirm Order
        </button>
      </div>
    </Modal>
  );
}

export default Checkout;
