"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('/api/orders');
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
 <>
      {/* <div className="w-full flex justify-center items-center h-16 bg-[#FBF9FA] text-[#2B2024]">
        <h1 className="text-2xl font-bold lg:text-3xl">Orders</h1>
      </div> */}
      <div className="main-content p-5 bg-gray-100 min-h-screen mt-9">
        <h1 className="text-2xl font-bold mb-6 text-center lg:text-3xl">Orders</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div className="orders-list space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="order-card bg-white p-4 rounded shadow flex flex-col lg:flex-row justify-between items-center"
              >
                <div className="order-info">
                  <p className="text-lg font-semibold">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-600">Date: {order.date}</p>
                  <p className="text-sm text-gray-600">Status: {order.status}</p>
                  <p className="text-sm text-gray-600">Total: ${order.total.toFixed(2)}</p>
                </div>
                <button className="view-details-btn mt-4 lg:mt-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      </>
  );
};

export default OrdersPage;