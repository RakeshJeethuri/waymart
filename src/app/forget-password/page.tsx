"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!otp) {
      newErrors.otp = "OTP is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetOtp = async (): Promise<void> => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        toast.error("Please enter a valid email");
        return;
    }
    try {
        const response = await axios.post("/api/users/sendForgetPasswordOtp", { email });

        if (response.data.success) {
            toast.success("OTP sent successfully! Check your email.");
        } else {
            toast.error(response.data.error || "Failed to send OTP.");
        }
    } catch (error: any) {
        toast.error(error.response?.data?.error || "Something went wrong.");
    }
};

const handleChangePassword = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    // if (validateForm()) {
    //     // Logic to change password
    //     toast.success("Password changed successfully!");
    //     router.push("/login");
    // }
    if (!email || !otp || !password || !confirmPassword) {
        toast.error("All fields are required!");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        toast.error("Invalid email format!");
        return;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters!");
        return;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
    }

    try {
        // Step 1: Verify OTP
        const otpResponse = await axios.post("/api/users/validateForgetPassword", { email, userotp: otp });

        if (!otpResponse.data.success) {
            toast.error(otpResponse.data.error || "Invalid OTP.");
            return;
        }

        // Step 2: If OTP is valid, change the password
        const passwordResponse = await axios.post("/api/users/changePassword", { email, password });

        if (passwordResponse.data.success) {
            toast.success("Password changed successfully!");
            router.push("/login-homepage");
        } else {
            toast.error(passwordResponse.data.error || "Failed to change password.");
        }
    } catch (error: any) {
        toast.error(error.response?.data?.error || "Something went wrong.");
    }
};

  return (
    <div className="flex justify-center items-center min-h-screen text-black bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button onClick={() => router.push("/")} className="text-2xl font-bold text-[#FD0054] mb-4">WayMart</button>
        <p className="text-lg font-semibold mb-4">Change your password</p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 border rounded-lg ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <button onClick={handleGetOtp} className="w-full p-3 bg-[#FD0054] text-white rounded-lg">Get OTP</button>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={`w-full p-3 border rounded-lg ${errors.otp ? "border-red-500" : ""}`}
          />
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}

          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 border rounded-lg ${errors.password ? "border-red-500" : ""}`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full p-3 border rounded-lg ${errors.confirmPassword ? "border-red-500" : ""}`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label>Show Password</label>
          </div>

          <button
            onClick={handleChangePassword}
            className="w-full p-3 bg-[#FD0054] text-white rounded-lg disabled:bg-gray-400"
            disabled={!email || !otp || !password || !confirmPassword}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
