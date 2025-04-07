"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../layout";

const AppPreferences = () => {
  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "en",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12",
    timezone: "Asia/Kolkata",
    accessibility: {
      highContrast: false,
      largeText: false,
    },
  });

interface Preferences {
    theme: string;
    language: string;
    dateFormat: string;
    timeFormat: string;
    timezone: string;
    accessibility: {
        highContrast: boolean;
        largeText: boolean;
    };
}

interface ChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLSelectElement> {}

const handleChange = (e: ChangeEvent) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (name.includes("accessibility")) {
        const key = name.split(".")[1] as keyof Preferences["accessibility"];
        setPreferences((prev) => ({
            ...prev,
            accessibility: {
                ...prev.accessibility,
                [key]: checked,
            },
        }));
    } else {
        setPreferences({ ...preferences, [name]: value });
    }
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    alert("App preferences updated successfully!");
    console.log("Updated Preferences:", preferences);
};

  useEffect(() => {
    // Apply theme dynamically
    document.body.className = preferences.theme === "dark" ? "dark-theme" : "";
  }, [preferences.theme]);

  return (
    <Layout>
    <div className="main-content p-5 bg-gray-100 min-h-screen mt-9">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center lg:text-3xl">App Preferences</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Theme Selection */}
          <div>
            <label className="block text-gray-700">Theme</label>
            <select
              name="theme"
              value={preferences.theme}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Language Preference */}
          <div>
            <label className="block text-gray-700">Language</label>
            <select
              name="language"
              value={preferences.language}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="hi">Hindi</option>
            </select>
          </div>

          {/* Date Format */}
          <div>
            <label className="block text-gray-700">Date Format</label>
            <select
              name="dateFormat"
              value={preferences.dateFormat}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY/MM/DD">YYYY/MM/DD</option>
            </select>
          </div>

          {/* Time Format */}
          <div>
            <label className="block text-gray-700">Time Format</label>
            <select
              name="timeFormat"
              value={preferences.timeFormat}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="12">12-Hour</option>
              <option value="24">24-Hour</option>
            </select>
          </div>

          {/* Timezone Selection */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700">Timezone</label>
            <select
              name="timezone"
              value={preferences.timezone}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
            </select>
          </div>

          {/* Accessibility Options */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-2">Accessibility Options</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="accessibility.highContrast"
                  checked={preferences.accessibility.highContrast}
                  onChange={handleChange}
                  className="w-5 h-5 mr-2 cursor-pointer"
                />
                High Contrast Mode
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="accessibility.largeText"
                  checked={preferences.accessibility.largeText}
                  onChange={handleChange}
                  className="w-5 h-5 mr-2 cursor-pointer"
                />
                Large Text
              </label>
            </div>
          </div>

          {/* Save and Navigation Buttons */}
          <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-[#A80038] text-white px-6 py-2 rounded-md hover:bg-[#FD0054] sm:w-auto cursor-pointer"
            >
              Save Changes
            </button>

            <Link href="/user-profile/Settings">
              <button
                type="button"
                className="bg-[#Fd0054] text-white px-4 py-2 rounded-md hover:bg-[#A80038] sm:w-auto cursor-pointer"
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

export default AppPreferences;