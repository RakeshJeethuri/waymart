"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { FaBoxOpen, FaMoneyBillWave, FaChartLine, FaBell, FaShoppingCart, FaStore } from "react-icons/fa";

export default function VendorNotificationPreferences() {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState({});

  const notifications = [
    {
      id: "orderUpdates",
      title: "Order Updates",
      description: "Get notified about new orders, cancellations, and updates.",
      details: ["New order received", "Order #1256 has been canceled", "Order #4523 is out for delivery"],
      icon: <FaBoxOpen className="text-[#FD0054] text-3xl" />,
    },
    {
      id: "paymentAlerts",
      title: "Payment Alerts",
      description: "Receive alerts for successful payments and pending transactions.",
      details: ["Payment of ₹500 received from customer", "Pending payment reminder for Order #4523"],
      icon: <FaMoneyBillWave className="text-[#A80038] text-3xl" />,
    },
    {
      id: "stockAlerts",
      title: "Stock & Inventory",
      description: "Stay updated on low stock levels and replenishment reminders.",
      details: ["Tomatoes stock is running low", "New stock of Apples has been added"],
      icon: <FaChartLine className="text-[#2B2024] text-3xl" />,
    },
    {
      id: "marketingUpdates",
      title: "Marketing & Offers",
      description: "Get insights on promotions, seasonal sales, and vendor-exclusive offers.",
      details: ["Flash sale starts this weekend!", "New seasonal discount schemes are live"],
      icon: <FaBell className="text-[#FD0054] text-3xl" />,
    },
    {
      id: "vendorSupport",
      title: "Vendor Support & Assistance",
      description: "Receive updates on platform policies, guidelines, and support tickets.",
      details: ["Your support ticket #1234 has been resolved", "New policy update for vendors"],
      icon: <FaStore className="text-[#A80038] text-3xl" />,
    },
    {
      id: "deliveryNotifications",
      title: "Delivery Notifications",
      description: "Track shipments and get alerts for dispatched and delivered orders.",
      details: ["Order #3567 has been delivered", "Order #9021 is out for shipping"],
      icon: <FaShoppingCart className="text-[#2B2024] text-3xl" />,
    },
  ];

  const toggleNotification = (id) => {
    setNotificationStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container mx-auto py-10 px-8 flex gap-8 bg-[#FBF9FA] min-h-screen">
      {/* LEFT: Notification Buttons with Toggle */}
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 border border-[#A80038]">
        <h2 className="text-2xl font-bold text-[#2B2024] mb-4 text-center">🔔 Notification Preferences</h2>
        <div className="space-y-4">
          {notifications.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition border ${
                selectedNotification?.id === item.id
                  ? "bg-[#FD0054] text-white border-[#A80038]"
                  : "bg-gray-200 text-[#2B2024] border-gray-300"
              }`}
              onClick={() => setSelectedNotification(item)}
            >
              <div className="flex items-center gap-4 cursor-pointer">
                {item.icon}
                <span className="text-lg font-medium">{item.title}</span>
              </div>
              {/* Toggle Button */}
              <button
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  notificationStatus[item.id] ? "bg-[#007BFF]" : "bg-gray-300"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNotification(item.id);
                }}
              >
                <motion.div
                  className={`w-5 h-5 bg-white rounded-full shadow-md`}
                  animate={{ x: notificationStatus[item.id] ? 20 : 0 }}
                />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT: Notification Details */}
      <div className="w-2/3 bg-white shadow-lg rounded-lg p-6 border border-[#FD0054]">
        {selectedNotification ? (
          <>
            <h3 className="text-2xl font-semibold text-[#2B2024] flex items-center gap-3">
              {selectedNotification.icon} {selectedNotification.title}
            </h3>
            <p className="text-[#A80038] mt-2">{selectedNotification.description}</p>
            <ul className="mt-4 space-y-3">
              {selectedNotification.details.map((detail, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm text-[#2B2024]">
                  {detail}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-[#A80038] text-center">Click a notification category to view details.</p>
        )}
      </div>
    </div>
  );
}
