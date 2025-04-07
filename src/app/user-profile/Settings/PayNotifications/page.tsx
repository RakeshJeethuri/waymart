"use client";
import React, { useState } from "react";
import Link from "next/link";
import Layout from "../../layout";

const PaymentSettings = () => {
  const [payment, setPayment] = useState({
    cardNumber: "**** **** **** 1234",
    expiryDate: "12/26",
    cvv: "",
    paymentMethod: "credit_card",
    billingAddress: "123 Main St, City, State, 12345",
    autoBilling: true,
    upiId: "user@upi",
    enableUpi: false,
    wallet: "Paytm",
    enableWallet: false,
  });

interface PaymentSettingsState {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    paymentMethod: string;
    billingAddress: string;
    autoBilling: boolean;
    upiId: string;
    enableUpi: boolean;
    wallet: string;
    enableWallet: boolean;
}

interface HandleChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {}

const handleChange = (e: HandleChangeEvent): void => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : undefined;
    setPayment((prevState: PaymentSettingsState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
    }));
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    alert("Payment settings updated successfully!");
    console.log("Updated Payment Settings:", payment);
};

  return (
    <Layout>
    <div className="main-content p-5 bg-gray-100 min-h-screen mt-9">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center lg:text-3xl">Payment Settings</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Number */}
          <div>
            <label className="block text-gray-700">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={payment.cardNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="**** **** **** 1234"
              required
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-gray-700">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={payment.expiryDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="MM/YY"
              required
            />
          </div>

          {/* CVV */}
          <div>
            <label className="block text-gray-700">CVV</label>
            <input
              type="password"
              name="cvv"
              value={payment.cvv}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter CVV"
              required
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={payment.paymentMethod}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
              <option value="upi">UPI</option>
              <option value="wallet">Wallet</option>
            </select>
          </div>

          {/* Billing Address */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700">Billing Address</label>
            <textarea
              name="billingAddress"
              value={payment.billingAddress}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter billing address"
              rows={3}
              required
            />
          </div>

          {/* Auto Billing */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700">Enable Auto Billing</label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="autoBilling"
                checked={payment.autoBilling}
                onChange={handleChange}
                className="w-5 h-5 cursor-pointer"
              />
              <span className="ml-2 text-gray-700">Automatically bill future payments</span>
            </div>
          </div>

          {/* UPI Management */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="block text-gray-700">Enable UPI Payments</label>
              <input
                type="checkbox"
                name="enableUpi"
                checked={payment.enableUpi}
                onChange={handleChange}
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            {payment.enableUpi && (
              <div className="mt-4">
                <label className="block text-gray-700">UPI ID</label>
                <input
                  type="text"
                  name="upiId"
                  value={payment.upiId}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="user@upi"
                />
              </div>
            )}
          </div>

          {/* Wallet Management */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="block text-gray-700">Enable Wallet Payments</label>
              <input
                type="checkbox"
                name="enableWallet"
                checked={payment.enableWallet}
                onChange={handleChange}
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            {payment.enableWallet && (
              <div className="mt-4">
                <label className="block text-gray-700">Select Wallet</label>
                <select
                  name="wallet"
                  value={payment.wallet}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="Paytm">Paytm</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="Google Pay">Google Pay</option>
                </select>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-[#A80038] cursor-pointer text-white px-6 py-2 rounded-md hover:bg-[#FD0054] sm:w-auto"
            >
              Save Changes
            </button>

            <Link href="/user-profile/Settings">
              <button
                type="button"
                className="bg-[#FD0054] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[#A80038] w-full sm:w-auto"
              >
                Back to Settings
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default PaymentSettings;