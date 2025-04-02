"use client";
import React, { useState } from "react";
import Link from "next/link";

const SecuritySettings = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
  });

interface FormState {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    twoFactorAuth: boolean;
}

interface ChangeEvent {
    target: {
        name: string;
        value: string;
        type: string;
        checked: boolean;
    };
}

const handleChange = (e: ChangeEvent) => {
    const { name, value, type, checked } = e.target;
    setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
    });
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
        alert("New password and confirmation do not match.");
        return;
    }

    alert("Security settings updated successfully!");
    console.log("Updated Security Settings:", form);
};

  return (
    <div className="main-content p-5 bg-gray-100 min-h-screen mt-9">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center lg:text-3xl">Security & Privacy</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Password */}
          <div>
            <label className="block text-gray-700">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter current password"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter new password"
              required
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-gray-700">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Confirm new password"
              required
            />
          </div>

          {/* Two-Factor Authentication */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700">Two-Factor Authentication</label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={form.twoFactorAuth}
                onChange={handleChange}
                className="w-5 h-5 mr-2"
              />
              <span className="text-gray-700">Enable Two-Factor Authentication</span>
            </div>
          </div>

          {/* Save Button */}
          <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-[#A80038] text-white px-6 py-2 rounded-md hover:bg-[#FD0054] sm:w-auto"
            >
              Save Changes
            </button>

            <Link href="/admin/Settings">
              <button
                type="button"
                className="bg-[#FD0054] text-white px-4 py-2 rounded-md hover:bg-[#A80038] w-full sm:w-auto"
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

export default SecuritySettings;