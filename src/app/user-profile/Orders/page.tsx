"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  orderDate: string;
  products: Product[];
  orderTotal: number;
  address: string;
  orderStatus: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch user and orders
        const fetchUser = await axios.get("/api/users/me");
        const userId = fetchUser.data.data._id; // Assuming the user ID is in the response
        const response = await axios.get(`/api/order?userId=${userId}`);
        const sortedOrders = response.data.orders.sort(
          (a: Order, b: Order) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="main-content p-5 bg-gray-100 min-h-screen mt-9">
      <h1 className="text-2xl font-bold mb-6 text-center lg:text-3xl">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="orders-list space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="order-card bg-white p-6 rounded shadow-md"
            >
              {/* Order Header */}
              <div className="order-header mb-4">
                <p className="text-lg font-semibold">Order ID: {order._id}</p>
                <p className="text-sm text-gray-600">
                  Order Date: {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Status: {order.orderStatus}
                </p>
                <p className="text-sm text-gray-600">
                  Address: {order.address}
                </p>
              </div>

              {/* Products List */}
              <div className="products-list space-y-2">
                {order.products.map((product, index) => (
                  <div
                    key={index}
                    className="product-item flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm font-medium">{product.product.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Price: ${product.product.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="order-total mt-4 border-t pt-4">
                <p className="text-lg font-semibold">
                  Total: ${order.orderTotal.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;