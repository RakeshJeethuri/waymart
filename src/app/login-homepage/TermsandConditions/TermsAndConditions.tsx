"use client";
import React from "react";

interface Props {
  onClose: () => void;
}

const TermsAndConditions: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 w-full max-w-lg rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <h1 className="text-2xl font-bold mb-4 text-[#FD0054]">Terms and Conditions</h1>
        <p>
          Welcome to our Fruits, Vegetables, and Cereals Ordering System. By accessing or using our platform, you agree to comply with the following terms.
        </p>

        <h2 className="text-lg font-semibold mt-4">1. Terms for Users</h2>
        <ul className="list-disc list-inside">
          <li>Users can browse and place orders for fruits, vegetables, and cereals.</li>
          <li>All orders must be paid for at checkout through available payment methods.</li>
          <li>Order cancellations are only allowed within 1 hour of placing an order.</li>
          <li>Refunds are processed based on our return policy.</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">2. Terms for Businesses</h2>
        <ul className="list-disc list-inside">
          <li>Businesses must register with valid details to list their products.</li>
          <li>All products should meet quality standards set by the platform.</li>
          <li>Pricing should be fair and comply with regulations.</li>
          <li>Businesses are responsible for managing inventory and order fulfillment.</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">3. Payments and Delivery</h2>
        <ul className="list-disc list-inside">
          <li>We accept online payments through secure gateways.</li>
          <li>Delivery times may vary based on location and availability.</li>
          <li>Orders must be received in good condition; report damages immediately.</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">4. Data Privacy</h2>
        <ul className="list-disc list-inside">
          <li>User data is securely stored and not shared without consent.</li>
          <li>We do not store payment information; transactions are handled by third-party providers.</li>
        </ul>

        <p className="mt-4">By continuing to use this platform, you agree to abide by these terms.</p>

        <button onClick={onClose} className="mt-4 bg-[#FD0054] hover:bg-[#A80038] text-white px-4 py-2 rounded-lg w-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
