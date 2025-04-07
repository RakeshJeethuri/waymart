"use client";

import React, { useState } from "react";

const CustomerSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center text-[#A80038] mb-6">Customer Support</h1>
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Submit Your Query</h2>
        {submitted && (
          <p className="text-green-600 mb-4">Thank you! Your query has been submitted successfully.</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A80038] focus:border-[#A80038]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A80038] focus:border-[#A80038]"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A80038] focus:border-[#A80038]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#A80038] text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-md shadow-sm">
            <h3 className="font-semibold text-gray-800">How can I track my order?</h3>
            <p className="text-sm text-gray-600">
              You can track your order by visiting the "Orders" section in your profile and clicking on the "Track Order" button.
            </p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md shadow-sm">
            <h3 className="font-semibold text-gray-800">What is the return policy?</h3>
            <p className="text-sm text-gray-600">
              Our return policy allows you to return items within 30 days of delivery. Please ensure the items are in their original condition.
            </p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md shadow-sm">
            <h3 className="font-semibold text-gray-800">How can I contact customer support?</h3>
            <p className="text-sm text-gray-600">
              You can contact customer support by submitting the form above or emailing us at support@waymart.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;