"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const VerifyAccount = () => {
  const [email, setEmail] = useState("");
  const [userotp, setOtp] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.push("/login-homepage");
    }
  }, [router]);

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/validateOtp", { email, userotp });

      if (response.data.success) {
        localStorage.removeItem("userEmail");
        router.push("/");
      } else {
        alert(response.data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("OTP verification failed", error);
    }
  };

  return (
    <div className="flex justify-center  min-h-screen">
      <div className="bg-white  rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700">Verify Your Account</h2>
        <p className="text-sm text-center text-gray-500 mb-4">OTP sent to: <span className="font-medium">{email}</span></p>
        
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your OTP"
            value={userotp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-pink-500 outline-none"
            required
          />
          <button
            type="submit"
            disabled={!userotp}
            className={`w-full p-2 rounded-lg text-white font-bold ${
              !userotp ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            Verify OTP
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Didn't receive an OTP?{" "}
          <span className="text-pink-500 cursor-pointer hover:underline" onClick={() => alert("Resend OTP logic here")}>
            Resend OTP
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyAccount;
