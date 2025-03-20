"use client";
import { useState } from "react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import './login.css';

export default function Login() {
    const router = useRouter();
    const [user,setUser] = React.useState({email:"",password:""});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showTerms, setShowTerms] = useState(false);

  const validateForm = () => {
    let newErrors: { email?: string; password?: string } = {};

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
        const response =  await axios.post("/api/users/login",{ email, password });
       
        console.log("Login success",response.data);
       
        toast.success("Login success");
        setTimeout(()=>{

        },2000);
        router.push("/profile");
        
    } catch (error:any) {

        toast.error(error.response.data.message)
      
    }
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="main-container">
      <Toaster />
      <div className="login-container">
        <button className="bt">
          <h1>WayMart</h1>
        </button>
        <p>Log in to your WayMart account</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={errors.email ? "error-border" : ""}
            />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {Object.keys(errors).length > 0 && (
            <div className="error-messages">
              {errors.email && <p>{errors.email}</p>}
              {errors.password && <p>{errors.password}</p>}
            </div>
          )}
          <button type="submit" className="login-button">
            Login
          </button>
          <Link href={'/signup'}>signup</Link>
          <a href="/forget-password">Forget Password?</a>
          <p className="terms">
            By logging in, you agree to our{" "}
            <span className="terms-link" onClick={() => setShowTerms(true)}>
              Terms & Conditions
            </span>
            .
          </p>
        </form>
      </div>
      {showTerms && <div className="terms-popup">Terms & Conditions Content</div>}
    </div>
  );
}