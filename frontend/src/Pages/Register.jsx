import React, { useState } from "react";
import BG from "../assets/bg.jpg";
import { POST } from "../Helpers/API";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import { FadeLoader } from "react-spinners";
import Modal from "react-modal";
import OTP from "../Components/OTP";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "500px",
  },
};

function Register() {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOTPSent] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    contact: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await POST("user/register", form);
      setOTPSent(true);
      alert(data.message);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingOverlay
      active={loading}
      spinner={<FadeLoader color="white" />}
      text="Please wait..."
    >
      <div className="relative w-screen h-screen">
        <Modal 
          isOpen={otpSent} 
          style={customStyles} 
          contentLabel="Enter OTP"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
        >
          <OTP email={form.email} />
        </Modal>
        <img src={BG} alt="Background" className="w-full h-full object-cover" />

        <div className="absolute top-0 w-screen h-screen flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 h-full flex gap-5 lg:gap-10 flex-col text-black opacity-90 justify-center px-4 sm:px-8 lg:ps-20 lg:pr-10">
            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-7xl xl:text-8xl">
              Welcome
            </h1>
            <span className="text-black text-sm sm:text-base">
              We're here to make your health and wellness journey easier. With
              fast and convenient delivery, simple prescription refills. We aim
              to provide you with the care you deserve right at your fingertips.
              <br /> <br />
              Explore our range of services today and take the first step toward
              better health! Convenient, Reliable Pharmacy Services at Your
              Fingertips.
            </span>

            <div className="flex flex-row gap-3 sm:gap-5">
              <Facebook size={24} className="sm:w-7 sm:h-7 cursor-pointer hover:scale-110 transition-transform" />
              <Instagram size={24} className="sm:w-7 sm:h-7 cursor-pointer hover:scale-110 transition-transform" />
              <Twitter size={24} className="sm:w-7 sm:h-7 cursor-pointer hover:scale-110 transition-transform" />
              <Youtube size={24} className="sm:w-7 sm:h-7 cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-full flex justify-center items-center p-4 sm:p-6">
            <div className="w-full max-w-sm p-4 sm:p-6 bg-white bg-opacity-40 backdrop-blur-lg border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <h5 className="text-lg sm:text-2xl font-extrabold text-black text-center">
                  Sign up
                </h5>
                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Your address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Your address"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Your contact
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    id="contact"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Your contact"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors"
                >
                  Register to your account
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Already registered?{" "}
                  <Link
                    to="/login"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default Register;
