"use client";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import LoginTypeSelector from "./LoginTypeSelector/page";
import UserLogin from "./LoginForm/UserLoginForm/page";
import VendorLogin from "./LoginForm/VendorLoginForm/page";
import UserSignup from "./SignupForm/UserSignup/page";
import VendorSignup from "./SignupForm/VendorSignup/page";
import VerifyAccount from "./SignupForm/UserSignup/VerifyAccount/page";
const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [otpPage ,setOtpPage] = useState(false);
  const [loginType, setLoginType] = useState(null);

  // Function to get the image based on loginType
  const getImage = () => {
    if (loginType === "user") return "/images/user-logo.png";
    if (loginType === "vendor") return "/images/vendor-logo.png";
    return "/images/image1.webp"; // Default image
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gray-100 text-black">
      <ToastContainer />
      <div className="w-full h-full max-w-4xl bg-white rounded-xl shadow-lg flex overflow-hidden">
        {/* Image Section */}
        <div className={`w-1/2 hidden md:flex items-center justify-center bg-white  `}
>
          <img
            src="/images/image1.webp"
            alt="Login Illustration"
            className={`w-full h-full object-cover rounded-lg transition-all duration-300 bg-transparent`}
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-3">
          <div className="flex mb-3">
            <button
              onClick={() => {
                setActiveTab("login");
                setLoginType(null);
              }}
              className={`w-1/2 p-3 border-b-2 cursor-pointer ${
                activeTab === "login" ? "border-red-500" : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setActiveTab("signup");
                setLoginType(null);
              }}
              className={`w-1/2 p-3 border-b-2 cursor-pointer ${
                activeTab === "signup" ? "border-red-500" : "text-gray-400"
              }`}
            >
              Sign Up
            </button>
          </div>

          {activeTab === "login" && !loginType && (
            <LoginTypeSelector setLoginType={setLoginType} />
          )}
          {activeTab === "signup" && !loginType && (
            <LoginTypeSelector setLoginType={setLoginType} />
          )}
          { otpPage && <VerifyAccount/>}
          {activeTab === "login" && loginType === "user" && <UserLogin />}
          {activeTab === "login" && loginType === "vendor" && <VendorLogin />}
          {activeTab === "signup" && loginType === "user" && (<UserSignup  setOtpPage={setOtpPage}/>)}
          
          {activeTab === "signup" && loginType === "vendor" && <VendorSignup />}
         
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
