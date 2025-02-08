import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { POST } from "../Helpers/API";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function OTP({ email }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async () => {
    try {
      if (otp.length === 6) {
        setLoading(true);
        const data = await POST("user/verifyOTP", { otp, email });
        localStorage.setItem("token", data.token);
        alert(data.message);
        navigate("/dash/home")
      } else {
        alert("Please enter a valid OTP");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start p-20 flex-col gap-5">
      <h1 className="text-xl font-bold">Enter OTP</h1>
      <p className="text-green-600">
        OTP has been successfully sent to your email{" "}
      </p>

      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>-</span>}
        inputStyle={{
          width: "40px",
          height: "50px",
          fontSize: "20px",
          textAlign: "center",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          color: "black",
          outline: "none",
        }}
        renderInput={(props) => <input {...props} />}
      />
      {loading ? (
        <BeatLoader />
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Verify
        </button>
      )}
    </div>
  );
}

export default OTP;
