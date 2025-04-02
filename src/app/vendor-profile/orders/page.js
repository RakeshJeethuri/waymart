"use client"
import { useState } from "react";

const sampleOrders = [
  { id: "ORD-001", customer: "John Doe", contact: "123-456-7890", status: "Pending", total: "$50", date: "2025-03-20" },
  { id: "ORD-002", customer: "Jane Smith", contact: "987-654-3210", status: "Pending", total: "$75", date: "2025-03-19" },
  { id: "ORD-003", customer: "Alice Brown", contact: "555-123-4567", status: "Pending", total: "$120", date: "2025-03-18" },
  { id: "ORD-004", customer: "Bob Martin", contact: "444-987-6543", status: "Pending", total: "$30", date: "2025-03-17" },
  { id: "ORD-005", customer: "Charlie White", contact: "666-222-3333", status: "Pending", total: "$90", date: "2025-03-16" },
];

export default function Orders() {
  const [orders, setOrders] = useState(sampleOrders);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
    setSelectedOrderId(null);
  };

  return (
    <div className="main-content w-full h-screen p-5 bg-[#FBF9FA] text-[#2B2024]">
      <header className="header flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
      </header>
      <table className="w-full bg-white rounded shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="text-center">
              <td className="p-3 border">{order.id}</td>
              <td className="p-3 border">{order.customer}</td>
              <td className="p-3 border">{order.contact}</td>
              <td className="p-3 border">{order.total}</td>
              <td className="p-3 border">{order.date}</td>
              <td className={`p-3 border ${
                order.status === "Processing" ? "text-yellow-500" : 
                order.status === "Completed" ? "text-green-500" : 
                order.status === "Shipped" ? "text-blue-500" : "text-orange-600"
              }`} onClick={() => setSelectedOrderId(order.id)}>
                {selectedOrderId === order.id && order.status !== 'Rejected' && order.status !=='Completed' ?  (
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="bg-white border rounded p-1"
                  > <option value="Accepted">Accepted</option>
                    <option value="Processing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  order.status
                )}
              </td>
              <td className="p-3 border">
                {order.status === "Pending" ? (
                  <>
                    <button onClick={() => updateStatus(order.id, "Accepted")} className=" px-1 bg-green-500 text-white rounded mr-2">Accept</button>
                    <button onClick={() => updateStatus(order.id, "Rejected")} className=" px-1 bg-red-500 text-white rounded">Reject</button>
                  </>
                ) : (
                  <span className="text-gray-500">{order.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
