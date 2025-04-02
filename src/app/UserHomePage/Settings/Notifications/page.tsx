"use client";
import React, { useState } from "react";
import Link from "next/link";

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderUpdates: true,
    promoOffers: false,
    appAlerts: true,
  });

  const handleToggle = (e: { target: { name: any; checked: any; }; }) => {
    const { name, checked } = e.target;
    setPreferences({ ...preferences, [name]: checked });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert("Notification preferences updated successfully!");
    console.log("Updated Preferences:", preferences);
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen mt-9">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-6 lg:text-3xl text-center">Notification Preferences</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Email Notifications</label>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={preferences.emailNotifications}
              onChange={handleToggle}
              className="w-5 h-5 cursor-pointer"
            />
          </div>

          {/* SMS Notifications */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700">SMS Notifications</label>
            <input
              type="checkbox"
              name="smsNotifications"
              checked={preferences.smsNotifications}
              onChange={handleToggle}
              className="w-5 h-5 cursor-pointer"
            />
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Push Notifications</label>
            <input
              type="checkbox"
              name="pushNotifications"
              checked={preferences.pushNotifications}
              onChange={handleToggle}
              className="w-5 h-5 cursor-pointer"
            />
          </div>

          {/* Order Updates */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Order Updates</label>
            <input
              type="checkbox"
              name="orderUpdates"
              checked={preferences.orderUpdates}
              onChange={handleToggle}
              className="w-5 h-5 cursor-pointer"
            />
          </div>

          {/* Promo Offers */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Promotional Offers</label>
            <input
              type="checkbox"
              name="promoOffers"
              checked={preferences.promoOffers}
              onChange={handleToggle}
              className="w-5 h-5 cursor-pointer"
            />
          </div>

          {/* App Alerts */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700">App Alerts</label>
            <input
              type="checkbox"
              name="appAlerts"
              checked={preferences.appAlerts}
              onChange={handleToggle}
              className="w-5 h-5 cursor-pointer"
            />
          </div>

          {/* Save Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-[#A80038] text-white px-6 py-2 rounded-md hover:bg-[#FD0054]  sm:w-auto"
            >
              Save Changes
            </button>

            <Link href="/admin/Settings">
              <button
                type="button"
                className="bg-[#FD0054] text-white px-4 py-2 rounded-md hover:bg-[#A80038] sm:w-auto"
              >
                Back to Settings
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationPreferences;
