"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./forgetpassword.css";

export default function ForgetPassword() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // const validateForm = (): boolean => {
    //     let errorMessage = "";

    //     if (!email || !otp || !password || !confirmPassword) {
    //         errorMessage = "All fields are required";
    //     } else if (!/\S+@\S+\.\S+/.test(email)) {
    //         errorMessage = "Invalid email format";
    //     } else if (password.length < 6) {
    //         errorMessage = "Password must be at least 6 characters";
    //     } else if (password !== confirmPassword) {
    //         errorMessage = "Passwords do not match";
    //     } else if (otp.length !== 6 || otp !== "123456") {
    //         errorMessage = "Invalid OTP";
    //     }

    //     if (errorMessage) {
    //         toast.error(errorMessage);
    //         return false;
    //     }

    //     return true;
    // };

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
                router.push("/login");
            } else {
                toast.error(passwordResponse.data.error || "Failed to change password.");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Something went wrong.");
        }
    };

    return (
        <div className="forget-password-container">
            <Toaster />
            <form className="forget-password-form" onSubmit={handleChangePassword}>
                <h1>WayMart</h1>
                <p>Change your password</p>

                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button type="button" onClick={handleGetOtp}>Get OTP</button>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="input-group1">
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label>Show Password</label>
                </div>

                <button type="submit" className="change-password-button">
                    Change Password
                </button>
            </form>
        </div>
    );
}
