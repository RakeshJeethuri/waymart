"use client";
import React from "react";

interface Props {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 w-full max-w-lg rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <h1 className="text-2xl font-bold mb-4 text-[#FD0054]">Privacy Policy</h1>
        <p>
          Welcome to our Fruits, Vegetables, and Cereals Ordering System. Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
        </p>

        <h2 className="text-lg font-semibold mt-4">1. Information We Collect</h2>
        <ul className="list-disc list-inside">
          <li><strong>Personal Information:</strong> Name, email, phone number, and address for order processing.</li>
          <li><strong>Payment Information:</strong> We do not store your card details; payments are handled by secure third-party gateways.</li>
          <li><strong>Usage Data:</strong> We collect data about how you interact with our platform to improve user experience.</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside">
          <li>To process orders and manage deliveries.</li>
          <li>To provide customer support and respond to inquiries.</li>
          <li>To improve our services through analytics.</li>
          <li>To send updates about your orders or promotional content (if opted-in).</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">3. Data Security</h2>
        <ul className="list-disc list-inside">
          <li>We implement security measures to protect your data.</li>
          <li>Your data is encrypted and stored securely.</li>
          <li>We do not sell or share your personal data with third parties without consent.</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">4. Your Rights</h2>
        <ul className="list-disc list-inside">
          <li>You can request access, correction, or deletion of your personal data.</li>
          <li>You can opt out of marketing communications at any time.</li>
        </ul>

        <p className="mt-4">
          By using our platform, you consent to our Privacy Policy. For any concerns, contact our support team.
        </p>

        <button onClick={onClose} className="mt-4 bg-[#FD0054] hover:bg-[#A80038] text-white px-4 py-2 rounded-lg w-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
