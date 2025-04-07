"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { handleUseCurrentLocation } from "@/utils/locationUtils";
import { toast } from "react-toastify";
import { CldImage } from 'next-cloudinary';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
}

interface CartItem {
  _id: string;
  product: Product | null;
  quantity: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<{ _id: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [tip, setTip] = useState(0);
  const [selectedTipButton, setSelectedTipButton] = useState<number | null>(null);
  const [location, setLocation] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  const API_URL = "/api/cart";

  const placeorder = async () => {
    try {
      await axios.post("/api/order", {
        userId: user?._id,
        orderTotal: getTotalAmount(),
        address: location,
      });
      await axios.post("/api/address", { userId: user?._id, address: location });
      toast.success("Order placed");
    } catch (e) {
      console.error(e);
    }
  };

  const handleTip = (amount: number) => {
    if (selectedTipButton === amount) {
      setTip(0);
      setSelectedTipButton(null);
    } else {
      setTip(amount);
      setSelectedTipButton(amount);
    }
  };

  const getTotalAmount = () => {
    const subtotal = parseFloat(calculateTotal());
    const gst = subtotal * 0.05;
    const deliveryFee = 5;
    return (subtotal + gst + deliveryFee + tip).toFixed(2);
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userResponse = await axios.get("/api/users/me");
        const currentUser = userResponse.data.data;
        setUser(currentUser);

        const response = await axios.get(`/api/cart?userId=${currentUser._id}`);
        setCart(
          response.data.cart.products.filter((item: CartItem) => item.product !== null)
        );
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const updateCart = useCallback(
    async (productId: string, change: number) => {
      if (!user) return;

      try {
        await axios.post(API_URL, {
          userId: user._id,
          productId,
          quantity: change,
        });

        const response = await axios.get(`/api/cart?userId=${user._id}`);
        setCart(
          response.data.cart.products.filter((item: CartItem) => item.product !== null)
        );
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    },
    [user]
  );

  const handleIncrement = (productId: string) => updateCart(productId, 1);

  const handleDecrement = (productId: string) => {
    const item = cart.find((item) => item.product?._id === productId);
    if (item && item.quantity > 1) updateCart(productId, -1);
    else if (item && item.quantity === 1) handleRemove(productId);
  };

  const handleRemove = async (productId: string) => {
    if (!user) return;
    try {
      await axios.delete(`${API_URL}?userId=${user._id}&productId=${productId}`);
      const response = await axios.get(`/api/cart?userId=${user._id}`);
      setCart(
        response.data.cart.products.filter((item: CartItem) => item.product !== null)
      );
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleButtonClick = async () => {
    try {
      const data = await handleUseCurrentLocation();
      setLocation(data.display_name);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocation(event.target.value);
  };

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) => (item.product ? total + item.product.price * item.quantity : total),
        0
      )
      .toFixed(2);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto   max-md:mt-30 p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-md mb-4 shadow"
              >
                {item.product && (
                  <>
                    <div className="flex flex-col items-center md:flex-row md:gap-4">
                      <CldImage
                        width="100"
                        height="100"
                        src={item.product.image}
                        sizes="100vw"
                        alt="product image"
                        crop="fill"
                        gravity='auto'
                        className="rounded-md object-cover w-24 h-24"
                      />
                      <div className="text-center md:text-left">
                        <h2 className="text-lg font-semibold">{item.product.name}</h2>
                        <p className="text-gray-700">Price: ${item.product.price}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => item.product && handleDecrement(item.product._id)} className="bg-red-600 text-white px-2 py-1 rounded cursor-pointer">-</button>
                        <span className="font-bold">{item.quantity}</span>
                        <button onClick={() => item.product && handleIncrement(item.product._id)} className="bg-green-600 text-white px-2 py-1 rounded cursor-pointer">+</button>
                      </div>
                      <p>Total: ${(item.product.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => item.product && handleRemove(item.product._id)} className="bg-red-700 text-white px-3 py-1 rounded cursor-pointer">Remove</button>
                    </div>
                  </>
                )}
              </div>
            ))}

            <div className="text-center mt-6">
              <h2 className="text-xl font-bold mb-4">Total: ${calculateTotal()}</h2>
              <button onClick={() => setShowModal(true)} className="bg-green-600 text-white px-6 py-2 rounded cursor-pointer">Checkout</button>
            </div>
          </>
        )}

        <div className="text-center mt-6">
          <a href="/user-profile" className="bg-pink-700 text-white px-4 py-2 rounded inline-block cursor-pointer">Back</a>
        </div>
      </div>

      {/* {showModal && (
        <div className="fixed inset-0  bg-amber-950  flex justify-center items-center z-50 ">
          <div className="bg-white p-8 rounded-lg w-full max-w-3xl mt-20 scroll-auto">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <table className="w-full mb-4">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td>{item.product?.name}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-center">${item.product?.price}</td>
                    <td className="text-center">${((item.product?.price ?? 0) * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-2">
              <p><strong>Subtotal:</strong> ${calculateTotal()}</p>
              <p><strong>Delivery Fee:</strong> $5.00</p>
              <p><strong>GST (5%):</strong> ${(parseFloat(calculateTotal()) * 0.05).toFixed(2)}</p>

              <div>
                <strong>Delivery Partner Tip:</strong>
                <div className="flex gap-3 mt-1">
                  {[10, 20, 30].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handleTip(amt)}
                      className={`px-3 py-1 border rounded ${selectedTipButton === amt ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <strong>Delivery Instructions:</strong>
                <textarea placeholder="Add any instructions for delivery" className="w-full p-2 border mt-1 rounded"></textarea>
              </div>

              <p><strong>Total Amount:</strong> ${getTotalAmount()}</p>

              <div className="flex gap-3 mt-4">
                <button onClick={handleButtonClick} className="bg-blue-500 text-white px-4 py-2 rounded">Use My Location</button>
                <textarea
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="Enter your location"
                  disabled={isEditable}
                  className="flex-1 p-2 border rounded resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button onClick={placeorder} className="bg-green-600 text-white px-4 py-2 rounded">Place Order</button>
              <button onClick={() => setShowModal(false)} className="bg-red-600 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )} */}
      {showModal && (
  <div className="fixed inset-0 bg-[#FD0054]/100 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg w-full max-w-3xl  max-h-[90vh] overflow-y-auto scroll-smooth s">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <table className="w-full mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item._id} className="border-b">
              <td>{item.product?.name}</td>
              <td className="text-center">{item.quantity}</td>
              <td className="text-center">₹{item.product?.price}</td>
              <td className="text-center">₹{((item.product?.price ?? 0) * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="space-y-2">
        <p><strong>Subtotal:</strong> ₹{calculateTotal()}</p>
        <p><strong>Delivery Fee:</strong> $5.00</p>
        <p><strong>GST (5%):</strong> ₹{(parseFloat(calculateTotal()) * 0.05).toFixed(2)}</p>

        <div>
          <strong>Delivery Partner Tip:</strong>
          <div className="flex gap-3 mt-1">
            {[10, 20, 30].map((amt) => (
              <button
                key={amt}
                onClick={() => handleTip(amt)}
                className={`px-3 py-1 border rounded cursor-pointer ${selectedTipButton === amt ? 'bg-[#A80038] text-white' : 'bg-gray-200'}`}
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <strong>Delivery Instructions:</strong>
          <textarea placeholder="Add any instructions for delivery" className="w-full p-2 border mt-1 rounded"></textarea>
        </div>

        <p><strong>Total Amount:</strong> ${getTotalAmount()}</p>

        <div className="flex gap-3 mt-4">
          <button onClick={handleButtonClick} className="bg-[#FD0054] text-white px-2  rounded cursor-pointer">Use My Location</button>
          <textarea
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter your location"
            disabled={isEditable}
            className="flex-1 p-4 border rounded resize-none"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button onClick={placeorder} className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer">Place Order</button>
        <button onClick={() => setShowModal(false)} className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer">Cancel</button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default CartPage;