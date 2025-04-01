"use client"
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import axios from "axios";
export default function ChangePassword()
{
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
      });
      const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
      };
      const handlePasswordReset = async (e) => {
        e.preventDefault();
        const res = await axios.get("http://192.168.22.171:3000/api/admin/vendorList");
        console.log(res.data);
        alert("Password reset successfully!");
      };
        
    return (

        <section className="bg-white shadow-lg  p-6 self-center h-screen text-black">
        <h2 className="text-[#A80038] text-lg font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div className="flex items-center border w-2xs rounded-lg p-2 bg-gray-100">
            <FaLock className="text-gray-500 mr-3" />
            <input type="password" name="oldPassword" placeholder="Old Password" value={passwords.oldPassword} onChange={handlePasswordChange} className=" w-full bg-transparent focus:outline-none" />
          </div>
          <div className="flex items-center border w-2xs rounded-lg p-2 bg-gray-100">
            <FaLock className="text-gray-500 mr-3" />
            <input type="password" name="newPassword" placeholder="New Password" value={passwords.newPassword} onChange={handlePasswordChange} className="bg-transparent focus:outline-none" />
          </div>
          <button type="submit" className=" self-center max-w-3xl p-2 bg-[#A80038] text-white font-semibold rounded-lg hover:bg-[#FD0054] transition-all mt-6 self-center">Reset Password</button>
        </form>
      </section>

    );
}