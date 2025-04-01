"use client";

import { ChevronRight } from "lucide-react"; // Import the arrow icon

export default function Settings() {
  return (
    <div className="main-content w-full  p-5 bg-[#FBF9FA] text-[#2B2024]">
      <header className="header flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
      </header>
      
      <section className="settings-list grid grid-cols-1 gap-4 text-[#2B2024]">
        {[
          { title: "Profile Settings", desc: "Update your profile details and preferences.", path: "./settings/profile" },
          { title: "Security & Privacy", desc: "Manage your password and privacy settings.", path: "./settings/forget-password" },
          { title: "Notification Preferences", desc: "Customize your notification alerts.", path: "settings/notification-preferences" },
          { title: "Payment Settings", desc: "Manage your payment methods and transactions.", path: "settings/payment-settings" },
          { title: "App Preferences", desc: "Set your theme, language, and other app preferences.", path: "settings/app-preferences" },
        ].map(({ title, desc, path }) => (
          <a
            key={path}
            href={path}
            className="settings-card flex items-center gap-4 bg-[#FBF9FA] p-4 rounded shadow cursor-pointer hover:bg-[#F1ECEE] transition no-underline"
          >
            <ChevronRight className="text-[#2B2024]" size={24} /> {/* Left arrow icon */}
            <div>
              <h3 className="text-xl font-bold mb-1">{title}</h3>
              <p className="text-sm">{desc}</p>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}
