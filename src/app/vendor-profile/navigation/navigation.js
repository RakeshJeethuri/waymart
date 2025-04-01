


"use client"; // Required for using hooks in Next.js App Router

import React from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Package, DollarSign, Users, Settings } from "lucide-react";

const Navigation = () => {
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", path: "/vendor-profile/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Products", path: "/vendor-profile/products", icon: <Package size={20} /> },
    { name: "Orders", path: "/vendor-profile/orders", icon: <ShoppingCart size={20} /> },
    { name: "Finance", path: "/vendor-profile/finance", icon: <DollarSign size={20} /> },
    { name: "Manage Team", path: "/vendor-profile/manage-team", icon: <Users size={20} /> },
    { name: "Settings", path: "/vendor-profile/settings", icon: <Settings size={20} /> },
  ];

  return (
    <nav className="mt-4 overflow-auto h-full">
      <ul className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <li key={item.path} className="p-2 rounded mb-2 hover:bg-[#FD0054] flex items-center gap-3 cursor-pointer">
            <button
              onClick={() => router.push(item.path)}
              className="w-full text-left flex items-center gap-3"
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
