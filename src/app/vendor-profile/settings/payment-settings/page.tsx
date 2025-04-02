"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { FaUniversity, FaMobileAlt, FaMoneyBillWave, FaSave } from "react-icons/fa";

export default function PaymentSettings() {
  const [bankName, setBankName] = useState("State Bank of India");
  const [accountNumber, setAccountNumber] = useState("123456789012");
  const [ifsc, setIfsc] = useState("SBIN0001234");
  const [upiId, setUpiId] = useState("vendor@sbi");
  const [autoPayout, setAutoPayout] = useState(false);
  const [codEnabled, setCodEnabled] = useState(false);

  const handleSave = () => {
    alert("Payment settings updated successfully! ✅");
  };

  return (
    <div className="container mx-auto py-10 px-8 bg-[#FBF9FA] min-h-screen flex justify-center text-black ">
      <div className="w-2/3 bg-white shadow-lg rounded-lg p-6 border border-[#A80038]">
        <h2 className="text-2xl font-bold text-[#2B2024] mb-6 text-center">💰 Payment Settings</h2>

        {/* Bank Account Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#FD0054] flex items-center gap-2">
            <FaUniversity /> Bank Account Details
          </h3>
          <div className="mt-3 space-y-3 ">
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Bank Name"
            />
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Account Number"
            />
            <input
              type="text"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="IFSC Code"
            />
          </div>
        </div>

        {/* UPI Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#A80038] flex items-center gap-2">
            <FaMobileAlt /> UPI Payment
          </h3>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-6"
            placeholder="UPI ID (e.g., vendor@sbi)"
          />
        </div>

        {/* Payment Preferences */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#2B2024] flex items-center gap-2">
            <FaMoneyBillWave /> Payment Preferences
          </h3>
          <div className="mt-3 flex justify-between items-center p-3 bg-gray-100 rounded-lg">
            <span>Enable Auto Payouts</span>
            <button
              className={`w-12 h-6 flex items-center rounded-full p-1 ${
                autoPayout ? "bg-[#007BFF]" : "bg-gray-300"
              }`}
              onClick={() => setAutoPayout(!autoPayout)}
            >
              <motion.div className="w-5 h-5 bg-white rounded-full shadow-md" animate={{ x: autoPayout ? 20 : 0 }} />
            </button>
          </div>
          <div className="mt-3 flex justify-between items-center p-3 bg-gray-100 rounded-lg">
            <span>Allow Cash on Delivery (COD)</span>
            <button
              className={`w-12 h-6 flex items-center rounded-full p-1 ${
                codEnabled ? "bg-[#007BFF]" : "bg-gray-300"
              }`}
              onClick={() => setCodEnabled(!codEnabled)}
            >
              <motion.div className="w-5 h-5 bg-white rounded-full shadow-md" animate={{ x: codEnabled ? 20 : 0 }} />
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={handleSave}
            className="bg-[#FD0054] hover:bg-[#A80038] text-white py-3 px-6 rounded-lg text-lg flex items-center justify-center gap-2"
          >
            <FaSave /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
