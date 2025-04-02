"use client";
import React, { useState } from "react";
import Link from "next/link";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@waymart.com",
    phone: "+91 98765 43210",
    role: "Administrator",
    password: "",
    confirmPassword: "",
  });

  // Removed duplicate handleChange declaration

interface Profile {
    name: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    confirmPassword: string;
}

interface ChangeEvent {
    target: {
        name: string;
        value: string;
    };
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (profile.password !== profile.confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    alert("Profile updated successfully!");
    console.log("Updated Profile:", profile);
};

const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
};

  return (
    <div className="main-content p-5 bg-gray-100 min-h-screen mt-9">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center lg:text-3xl">Profile Settings</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={profile.role}
              disabled
              className="mt-1 p-2 w-full border rounded-md bg-gray-200"
            />
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

export default ProfileSettings;