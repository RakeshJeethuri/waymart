
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TermsAndConditions from "../../TermsandConditions/TermsAndConditions";
import PrivacyPolicy from "../../TermsandConditions/PrivacyPolicy";
import { set } from "mongoose";
interface UserSignupProps {
  setOtpPage: React.Dispatch<React.SetStateAction<boolean>>;
}
const Signup: React.FC<UserSignupProps> = ({ setOtpPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
 const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res =await axios.post("/api/users/signup", { username:formData.name, email:formData.email, password:formData.password });
      localStorage.setItem("userEmail", formData.email);
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      const respo = await axios.post("/api/users/sendVerifyOtp", {email:formData.email});
    console.log("OTP sent to email:", formData.email);
      setOtpPage(true);

      // router.push("login-homepage/SignupForm/UserSignup/verifyUser");
    } catch (error:any) {
      console.error(error);
      toast.error(error.response.data.message || "An error occurred during signup.");
    }
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const newErrors: Record<string, string> = {};
  //   if (formData.name.trim().length < 3) {
  //     newErrors.name = "Name must be at least 3 characters";
  //   }
  //   if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = "Enter a valid email address";
  //   }
  //   if (!/^\d{10}$/.test(formData.phone)) {
  //     newErrors.phone = "Enter a valid 10-digit phone number";
  //   }
  //   if (formData.password.length < 6) {
  //     newErrors.password = "Password must be at least 6 characters";
  //   } else if (!/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
  //     newErrors.password = "Password must include at least one uppercase letter and one number";
  //   }
  //   if (formData.confirmPassword !== formData.password) {
  //     newErrors.confirmPassword = "Passwords do not match";
  //   }

  //   if (Object.keys(newErrors).length === 0) {
  //     toast.success("Signup Successful!");
  //     setFormData({
  //       name: "",
  //       email: "",
  //       phone: "",
  //       password: "",
  //       confirmPassword: "",
  //     });
  //     setFormError("");
  //   } else {
  //     setFormError(newErrors[Object.keys(newErrors)[0]] || "");
  //     toast.error(newErrors[Object.keys(newErrors)[0]]);
  //   }
  // };

  return (
    <div className="flex  justify-center min-h-screen bg-[#FBF9FA]">
      <motion.div
        className="p-1 rounded-lg w-full max-w-md bg-white shadow-lg text-[#2B2024]"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h2 className="text-2xl font-bold text-center mb-2 text-[#FD0054]">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-[#FD0054]" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-[#FD0054]" required />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-[#FD0054]" required />
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-[#FD0054]" required />
          <input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring focus:ring-[#FD0054]" required />
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="showPassword" checked={showPassword} onChange={handleShowPasswordToggle} />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          <motion.button
            type="submit"
            disabled={Object.values(formData).some(val => val.trim() === "")}
            className={`w-full p-2 rounded-lg text-white font-bold ${Object.values(formData).some(val => val.trim() === "") ? "bg-gray-400 cursor-not-allowed" : "bg-[#FD0054] hover:bg-[#A80038]"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>
        <p className="text-xs text-center mt-4 text-gray-600">
          By continuing, you agree to our
          <span className="text-[#FD0054] cursor-pointer hover:underline" onClick={() => setShowTerms(true)}> Terms of Service </span>
          and
          <span className="text-[#FD0054] cursor-pointer hover:underline" onClick={() => setShowPrivacy(true)}> Privacy Policy</span>.
        </p>
        {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
        {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
        <p className="text-sm text-center mt-4">
          Already have an account? <a href="" className="text-[#FD0054] hover:underline">Login</a>
        </p>
      </motion.div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="light" />
    </div>
  );
};

export default Signup;

