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
  },
};

function Register() {
  const iconSize = 30;
  const [loading, setLoading] = useState(false);
  const [otpSent, setOTPSent] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
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
        <Modal isOpen={otpSent} style={customStyles} contentLabel="Enter OTP">
          <OTP email={form.email} />
        </Modal>
        <img src={BG} alt="Background" className="w-full h-full object-cover" />

        <div className="absolute top-0 w-screen h-screen flex flex-row">
          <div className="w-1/2 h-full flex gap-10 flex-col text-black opacity-90 justify-center ps-40 pr-20">
            <h1 className="font-extrabold text-8xl ">Welcome</h1>
            <span className="text-black ">
              we’re here to make your health and wellness journey easier. With
              fast and convenient delivery, simple prescription refills. We aim
              to provide you with the care you deserve right at your fingertips.
              <br /> <br />
              Explore our range of services today and take the first step toward
              better health! Convenient, Reliable Pharmacy Services at Your
              Fingertips.
            </span>

            <div className="flex flex-row gap-5">
              <Facebook size={iconSize} cursor={"pointer"} />
              <Instagram size={iconSize} cursor={"pointer"} />
              <Twitter size={iconSize} cursor={"pointer"} />
              <Youtube size={iconSize} cursor={"pointer"} />
            </div>
          </div>
          <div className="w-1/2 h-full flex justify-center items-center">
            <div class="w-full max-w-sm p-4 border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
              <form class="space-y-6" onSubmit={handleSubmit}>
                <h5 class="text-2xl font-extrabold text-black text-center">
                  Sign up to our platform
                </h5>
                <div>
                  <label
                    for="address"
                    class="block mb-2 text-sm font-medium text-black"
                  >
                    Your address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Your address"
                    required
                  />
                </div>
                <div>
                  <label
                    for="contact"
                    class="block mb-2 text-sm font-medium text-black"
                  >
                    Your contact
                  </label>
                  <input
                    type="phone"
                    name="contact"
                    id="contact"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Your contact"
                    required
                  />
                </div>
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-black"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="User name"
                    required
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-black"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-black"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  class="w-180px text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Register to your account
                </button>
                <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Already registered?{" "}
                  <Link
                    to="/login"
                    class="text-blue-700 hover:underline dark:text-blue-500"
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
