"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPalette, FaGlobe, FaBell, FaSyncAlt } from "react-icons/fa";

export default function AppPreferences() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");
  const [notificationSound, setNotificationSound] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);

  return (
    <div className="container mx-auto py-10 px-8 bg-[#FBF9FA] min-h-screen flex justify-center text-black">
      <div className="w-2/3 bg-white shadow-lg rounded-lg p-6 border border-[#A80038]">
        <h2 className="text-2xl font-bold text-[#2B2024] mb-6 text-center">⚙️ App Preferences</h2>

        {/* Theme Selection */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#FD0054] flex items-center gap-2">
            <FaPalette /> Theme
          </h3>
          <div className="mt-3 flex gap-4">
            {["light", "dark", "system"].map((t) => (
              <button
                key={t}
                className={`px-4 py-2 border rounded-lg ${
                  theme === t ? "bg-[#FD0054] text-white border-[#A80038]" : "bg-gray-200 text-[#2B2024]"
                }`}
                onClick={() => setTheme(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#A80038] flex items-center gap-2">
            <FaGlobe /> Language
          </h3>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-3"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        {/* Notification Sound */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#2B2024] flex items-center gap-2">
            <FaBell /> Notification Sound
          </h3>
          <div className="mt-3 flex justify-between items-center p-3 bg-gray-100 rounded-lg">
            <span>Enable Sound</span>
            <button
              className={`w-12 h-6 flex items-center rounded-full p-1 ${
                notificationSound ? "bg-[#007BFF]" : "bg-gray-300"
              }`}
              onClick={() => setNotificationSound(!notificationSound)}
            >
              <motion.div className="w-5 h-5 bg-white rounded-full shadow-md" animate={{ x: notificationSound ? 20 : 0 }} />
            </button>
          </div>
        </div>

        {/* Auto-Update */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#FD0054] flex items-center gap-2">
            <FaSyncAlt /> Auto-Update
          </h3>
          <div className="mt-3 flex justify-between items-center p-3 bg-gray-100 rounded-lg">
            <span>Enable Auto-Update</span>
            <button
              className={`w-12 h-6 flex items-center rounded-full p-1 ${
                autoUpdate ? "bg-[#007BFF]" : "bg-gray-300"
              }`}
              onClick={() => setAutoUpdate(!autoUpdate)}
            >
              <motion.div className="w-5 h-5 bg-white rounded-full shadow-md" animate={{ x: autoUpdate ? 20 : 0 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
