"use client"
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TermsAndConditions from "../../TermsandConditions/TermsAndConditions";

const LoginBusiness = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passKey, setPassKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; passKey?: string }>({});

  const router = useRouter();

  const validateForm = () => {
    let newErrors: { email?: string; password?: string; passKey?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!passKey) {
      newErrors.passKey = "Passkey is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("/api/vendors/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        
         if (response.status === 400) {
          toast.error("Invalid email or password");
          return;
        }
        else if (response.status === 401) {
          toast.error("Approval is in process. Please wait for admin approval.");
          return;
        }

        const data = await response.json();
        
        if (data.error) {
          toast.error(data.error +"hello");
        } else {
          toast.success("Login successful!");
          router.push("/vendor-profile"); // Redirect to home page after successful login
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An error occurred while logging in. Please try again.");
      }
    } else {
      toast.error(errors.email || errors.password || errors.passKey || "Invalid login details");
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-[#FBF9FA]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 text-[#2B2024]">
        <button
          onClick={() => router.push("/")}
          className="text-[#FD0054] text-3xl font-bold w-full text-center"
        >
          WayMart
        </button>
        <p className="text-center mt-2">Log in to Business Account</p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Business Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring focus:ring-[#FD0054] ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring focus:ring-[#FD0054] ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-[#A80038]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Passkey Input */}
          <div>
            <input
              type="text"
              placeholder="Passkey"
              value={passKey}
              onChange={(e) => setPassKey(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring focus:ring-[#FD0054] ${
                errors.passKey ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.passKey && <p className="text-red-500 text-sm mt-1">{errors.passKey}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!email.trim() || !password.trim() || !passKey.trim()}
            className={`w-full p-3 rounded-lg text-white font-bold ${
              !email.trim() || !password.trim() || !passKey.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#FD0054] hover:bg-[#A80038]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>

          {/* Forgot Password */}
          <p className="text-center">
            <a href="/forget-password" className="text-[#FD0054] hover:underline">
              Forgot Password?
            </a>
          </p>

          {/* Terms & Conditions */}
          <p className="text-center text-sm text-gray-600">
            By logging in, you agree to our{" "}
            <span className="text-[#FD0054] cursor-pointer hover:underline" onClick={() => setShowTerms(true)}>
              Terms & Conditions
            </span>.
          </p>
        </form>
      </div>

      {/* Terms & Conditions Modal */}
      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default LoginBusiness;


