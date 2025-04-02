"use client";

import { ChevronRight } from "lucide-react"; // Import the arrow icon
import Link from "next/link"; // Import Next.js Link for client-side navigation
import Layout from '../Layout/page';
export default function Settings() {
  return (
    <Layout>
    <div className="main-content w-full p-5 bg-[#FBF9FA] text-[#2B2024]">
      <header className="header flex justify-center items-center mb-8">
        <h1 className="text-2xl font-bold lg:text-3xl">Settings</h1>
      </header>
      
      <section className="settings-list grid grid-cols-1 gap-4 text-[#2B2024]">
        {[
          { title: "Profile Settings", desc: "Update your profile details and preferences.", path: "/UserHomePage/Settings/Profile" },
          { title: "Security & Privacy", desc: "Manage your password and privacy settings.", path: "/UserHomePage/Settings/Security&Privacy" },
          { title: "Notification Preferences", desc: "Customize your notification alerts.", path: "/UserHomePage/Settings/Notifications" },
          { title: "Payment Settings", desc: "Manage your payment methods and transactions.", path: "/UserHomePage/Settings/PayNotifications" },
          { title: "App Preferences", desc: "Set your theme, language, and other app preferences.", path: "/UserHomePage/Settings/Preferences" },
        ].map(({ title, desc, path }) => (
          <Link
            key={path}
            href={path}
            className="settings-card flex items-center gap-4 bg-[#FBF9FA] p-4 rounded shadow cursor-pointer hover:bg-[#F1ECEE] transition no-underline"
          >
            <ChevronRight className="text-[#2B2024]" size={24} /> {/* Left arrow icon */}
            <div>
              <h3 className="text-xl font-bold mb-1">{title}</h3>
              <p className="text-sm">{desc}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
    </Layout>
  );
}