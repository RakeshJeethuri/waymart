
"use client";
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TermsAndConditions from "../../TermsandConditions/TermsAndConditions";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
   const [showTerms, setShowTerms] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      console.log("hello");
        const response =  await axios.post("/api/users/login",{ email, password });
       
        console.log("Login success",response.data);
       
        toast.success("Login success");
        setTimeout(()=>{

        },2000);
        router.push("/UserHomePage/Home");
        
    } catch (error:any) {

        toast.error(error.response.data.message)
      
    }
    console.log("Email:", email);
    console.log("Password:", password);
    // if (validateForm()) {
    //   toast.success("Login Successful!");
    //   console.log("Login Successful", { email, password });
    // } else {
    //   toast.error(errors.email || errors.password || "Invalid login details");
    // }
  };

  return (
    <div className="flex justify-center  min-h-full ">
      <div className="w-full max-w-md bg-white  rounded-xl p-6 text-[#2B2024]">
        <button onClick={() => router.push("/")} className="text-[#FD0054] text-3xl font-bold w-full text-center">
          WayMart
        </button>
        <p className="text-center mt-2">Log in to your WayMart account</p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring focus:ring-[#FD0054] ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

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
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-[#A80038]" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <motion.button
            type="submit"
            disabled={!email.trim() || !password.trim()}
            className={`w-full p-3 rounded-lg text-white font-bold ${
              !email.trim() || !password.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-[#FD0054] hover:bg-[#A80038]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>

          <p className="text-center">
            <a href="/forget-password" className="text-[#FD0054] hover:underline">
              Forgot Password?
            </a>
          </p>
          <p className="text-xs text-center mt-4">
          By continuing, you agree to our
          <span className="text-blue-500 cursor-pointer" onClick={() => setShowTerms(true)}> Terms of Service </span>
        </p>

          {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
        </form>
      </div>
    </div>
  );
};

export default Login;
