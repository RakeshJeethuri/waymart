'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import manlogo from "./manlogo.png";
import axios from "axios";
import "./login.css";

const VerifyAccount = () => {
  const [email, setEmail] = useState("");
  const [userotp, setOtp] = useState("");
  const router = useRouter();

  // Retrieve email from localStorage when component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.push("/signup"); // Redirect to signup if no email is found
    }
  }, [router]);

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        console.log(email,userotp)
      const response = await axios.post("/api/users/validateOtp", { email, userotp });

      if (response.data.success) {
        localStorage.removeItem("userEmail"); // Remove email after verification
        router.push("/login"); // Redirect to login page
      } else {
        alert(response.data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("OTP verification failed", error);
    }
  };

  return (
    <>
      <div className="main-container1">
        <div className="signup-container">
          <div className="signup-image-container">
            <Image src={manlogo} alt="Verify Account" className="signup-image" />
          </div>

          <div className="signup-form-container">
            <h2 className="signup-title">Verify Your Account</h2>
            <p className="email-display">OTP sent to: {email}</p>
            <form onSubmit={handleOtpSubmit} className="signup-form">
              <input
                type="text"
                placeholder="Enter your OTP"
                value={userotp}
                onChange={(e) => setOtp(e.target.value)}
                className="signup-input"
                required
              />
              <button
                type="submit"
                disabled={!userotp}
                className={`signup-button ${!userotp ? "disabled-button" : "active-button"}`}
              >
                Verify OTP
              </button>
            </form>
            <p className="login-text">
              Didn't receive an OTP? 
              <span className="login-link" onClick={() => alert("Resend OTP logic here")}>
                Resend OTP
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyAccount;
