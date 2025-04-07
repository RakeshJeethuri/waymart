"use client";

import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";

interface Address {
  id: string;
  name: string;
  details: string;
}

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState({ name: "", details: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // Fetch addresses from the API
        const response = await axios.get("/api/users/me");
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddAddress = async () => {
    if (!newAddress.name || !newAddress.details) return alert("Please fill in all fields.");

    try {
      const response = await axios.post("/api/addresses", newAddress);
      setAddresses((prev) => [...prev, response.data.address]);
      setNewAddress({ name: "", details: "" });
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleEditAddress = async () => {
    if (!newAddress.name || !newAddress.details) return alert("Please fill in all fields.");

    try {
      const response = await axios.put(`/api/addresses/${editingAddressId}`, newAddress);
      setAddresses((prev) =>
        prev.map((address) =>
          address.id === editingAddressId ? response.data.address : address
        )
      );
      setNewAddress({ name: "", details: "" });
      setIsEditing(false);
      setEditingAddressId(null);
    } catch (error) {
      console.error("Error editing address:", error);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await axios.delete(`/api/addresses/${id}`);
      setAddresses((prev) => prev.filter((address) => address.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const startEditing = (address: Address) => {
    setIsEditing(true);
    setEditingAddressId(address.id);
    setNewAddress({ name: address.name, details: address.details });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center text-[#A80038] mb-6">Manage Addresses</h1>

      {/* Address Form */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Address" : "Add New Address"}</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={newAddress.name}
              onChange={(e) => setNewAddress((prev) => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A80038] focus:border-[#A80038]"
            />
          </div>
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">
              Address Details
            </label>
            <textarea
              id="details"
              value={newAddress.details}
              onChange={(e) => setNewAddress((prev) => ({ ...prev, details: e.target.value }))}
              rows={3}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A80038] focus:border-[#A80038]"
            ></textarea>
          </div>
          <button
            onClick={isEditing ? handleEditAddress : handleAddAddress}
            className="w-full bg-[#A80038] text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors"
          >
            {isEditing ? "Save Changes" : "Add Address"}
          </button>
        </div>
      </div>

      {/* Address List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
        {addresses.length > 0 ? (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm"
              >
                <div>
                  <h3 className="font-semibold">{address.name}</h3>
                  <p className="text-sm text-gray-600">{address.details}</p>
                </div>
                <div className="flex space-x-3">
                  <PencilIcon
                    className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800"
                    onClick={() => startEditing(address)}
                  />
                  <TrashIcon
                    className="w-5 h-5 text-red-600 cursor-pointer hover:text-red-800"
                    onClick={() => handleDeleteAddress(address.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No addresses saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default Addresses;