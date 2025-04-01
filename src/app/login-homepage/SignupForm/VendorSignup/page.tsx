"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TermsAndConditions from "../../TermsandConditions/TermsAndConditions";
import PrivacyPolicy from "../../TermsandConditions/PrivacyPolicy";
import { handleUseCurrentLocation } from "@/utils/locationUtils";

const SignupBusiness: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    Raddress:"",
    address: "",
    pinCode: "",
    businessName: "",
    businessType: "",
    panCard: "",
    password: "",
    confirmPassword: ""
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("Name:", e.target.name, "Value:", e.target.value);
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // const formData = new FormData(e.currentTarget);
    // // console.log(formData.get("name"));
    // console.log(formData);
    // const vendorData = {
    //     name: formData.get("name"), 
    //     email: formData.get("email"),
    //     password: formData.get("password"),
    //     phone: formData.get("phone"),
    //     address: formData.get("address"),
    //     businessName: formData.get("businessName"),
    //     businessType: formData.get("businessType"),
    //     PAN: formData.get("PAN"),
    //     proofOfBusiness: formData.get("proofOfBusiness"),
    // };
    // console.log(formData);
    const vendorData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      businessName: formData.businessName,
      businessType: formData.businessType,
      PAN: formData.panCard, // Ensure the key matches your backend
      proofOfBusiness: "ok", // Add this if needed
  };
  console.log(vendorData);

    try {
        // console.log("Submitting form data:", vendorData);
        const response = await fetch("/api/vendors/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vendorData),
        });

        const result = await response.json();
        if (response.ok) {
            toast.success("Vendor registered successfully!");
            router.push("/login");
        } else {
            toast.error(`Error: ${result.error}`);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Something went wrong. Please try again.");
    }
};

  const getLocation = async () => {
    try {
      const data = await handleUseCurrentLocation();
      setFormData({
        ...formData,
        pinCode: data.address.postcode,
        address: data.display_name
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <ToastContainer/>
      <motion.div className="p-2 rounded-lg w-full max-w-lg text-[#2B2024]" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, type: "spring" }}>
        <h2 className="text-2xl font-bold text-center mb-4 text-[#FD0054]">Register Your Business</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Personal & Residence Info</h3>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
              {/* {console.log(formData)}  */}
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
              <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
              <input type="text" name="Raddress" placeholder="Your residential addresss" value={formData.Raddress} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
              <div className="flex justify-between">
                <span></span>
                <button type="button" onClick={() => setCurrentStep(2)} className=" px-3 py-1 bg-[#FD0054] text-white rounded-lg">Next</button>

              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Business Info & Location</h3>
              <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
              <input type="text" name="businessType" placeholder="Business Type" value={formData.businessType} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
              <input type="text" name="panCard" placeholder="PAN Card Number" value={formData.panCard} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
              <button type="button" onClick={getLocation} className="w-full p-3 bg-[#A80038] text-white rounded-lg">Use My Location</button>
              {formData.address && <p className="text-sm text-gray-500">Detected Address: {formData.address.slice(0,15)}</p>}
              <div className="flex justify-between">
                <button type="button" onClick={() => setCurrentStep(1)} className=" px-3 py-1 bg-gray-400 text-white rounded-lg">Back</button>
                <button type="button" onClick={() => setCurrentStep(3)} className=" px-3 py-1 bg-[#FD0054] text-white rounded-lg">Next</button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Set Password</h3>
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
              <input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="showPassword" checked={showPassword} onChange={handleShowPasswordToggle} />
                <label htmlFor="showPassword">Show Password</label>
              </div>
              <p className="text-center text-sm">
                By signing up, you agree to our
                <span className="text-[#FD0054] cursor-pointer hover:underline" onClick={() => setShowTerms(true)}> Terms & Conditions </span>
                and
                <span className="text-[#FD0054] cursor-pointer hover:underline" onClick={() => setShowPrivacy(true)}> Privacy Policy</span>.
              </p>
              <div className="flex justify-between">
                <button type="button" onClick={() => setCurrentStep(2)} className=" px-3 py-1 bg-gray-400 text-white rounded-lg">Back</button>
                <motion.button type="submit" className=" px-3 py-1 bg-[#FD0054] text-white rounded-lg">Register</motion.button>
              </div>
            </div>
          )}
        </form>
      </motion.div>
      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="light" />
    </div>
  );
};

export default SignupBusiness;
