'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import manlogo from "./manlogo.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./login.css";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // const evaluatePasswordStrength = (password) => {
  //   let strength = "Weak";
  //   if (password.length >= 8) {
  //     strength = "Medium";
  //   }
  //   if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
  //     strength = "Strong";
  //   }
  // };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/signup", { username, email, password,phone });
      localStorage.setItem("userEmail", email);
      setUserName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setConfirmPassword("");
      const respo = await axios.post("/api/users/sendVerifyOtp", {email});
      router.push("/verifyUser");
    } catch (error:any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="main-container1">
        <Toaster/>
        <div className="signup-container">
          <div className="signup-image-container">
            <Image src={manlogo} alt="Signup" className="signup-image" />
          </div>

          <div className="signup-form-container">
            <h2 className="signup-title">Create an Account</h2>
            <form onSubmit={handleSubmit} className="signup-form">
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="signup-input"
                required
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signup-input"
                required
              />
              <input
                type="text"
                placeholder="Enter your mobile"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="signup-input"
                required
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signup-input"
                required
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="signup-input"
                required
              />
              <div className="show-password-container">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="showPassword">Show Password</label>
              </div>
              <button
                type="submit"
                disabled={!username || !email || !password || !confirmPassword || !phone}
                className={`signup-button ${!username || !email || !password || !confirmPassword ||!phone ? "disabled-button" : "active-button"}`}
              >
                Sign Up
              </button>
            </form>
            <p className="login-text">
              Already have an account? 
              <span className="login-link" onClick={() => router.push("/login")}>
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;