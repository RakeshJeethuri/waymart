"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddressBook = () => {
	interface User {
		username: string;
	}

	interface Address {
		name: string;
		details: string;
	}

	const [user, setUser] = useState<User | null>(null);
	const [activeSection, setActiveSection] = useState("Orders"); // Default section
	const [addresses, setAddresses] = useState<Address[]>([
		{
			name: "Hyd Hostel",
			details:
				"Balaji Women's Hostel, KPHB Phase 1, Kukatpally, Hyderabad, Telangana",
		},
		{
			name: "Hostel",
			details:
				"Manaswika Women's PG, Opposite Street of Touch & Glow Beauty Parlour, GP Rao Estates, Kukatpally",
		},
	]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
	const [editedAddress, setEditedAddress] = useState<Address | null>(null);

	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userResponse = await axios.get("/api/users/me");
				const currentUser = userResponse.data.data;
				setUser(currentUser);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const logout = async () => {
		try {
			const res = await axios.get("/api/users/logout");
			router.push("/"); // Redirect to the home page after logout
		} catch (e) {
			console.log("error", e);
		}
	};

	const openEditModal = (address: Address) => {
		setSelectedAddress(address);
		setEditedAddress({ ...address });
		setIsModalOpen(true);
	};

	const handleEditChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setEditedAddress((prev) => (prev ? { ...prev, [name]: value } : null));
	};

	const saveEditedAddress = () => {
		if (selectedAddress && editedAddress) {
			setAddresses((prev) =>
				prev.map((address) =>
					address.name === selectedAddress.name ? editedAddress : address
				)
			);
			setIsModalOpen(false);
			setSelectedAddress(null);
			setEditedAddress(null);
		}
	};

	const deleteAddress = (addressToDelete: Address) => {
		setAddresses((prev) =>
			prev.filter((address) => address.name !== addressToDelete.name)
		);
	};

	const renderSection = () => {
		switch (activeSection) {
			case "Orders":
				return (
					<div>
						<h2 className="text-xl font-semibold mb-4">Your Orders</h2>
						<p className="text-gray-600">You have no orders yet.</p>
					</div>
				);
			case "CustomerSupport":
				return (
					<div>
						<h2 className="text-xl font-semibold mb-4">Customer Support</h2>
						<form className="space-y-4">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Name
								</label>
								<input
									type="text"
									id="name"
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A80038] focus:border-[#A80038]"
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A80038] focus:border-[#A80038]"
								/>
							</div>
							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-gray-700"
								>
									Message
								</label>
								<textarea
									id="message"
									rows={4}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A80038] focus:border-[#A80038]"
								></textarea>
							</div>
							<button
								type="submit"
								className="w-full bg-[#A80038] text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors"
							>
								Submit
							</button>
						</form>
					</div>
				);
			case "Addresses":
				return (
					<div>
						<h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
						<div className="mt-4 space-y-4">
							{addresses.map((address, index) => (
								<div
									key={index}
									className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
								>
									<div>
										<h3 className="font-semibold">{address.name}</h3>
										<p className="text-gray-600 text-sm">{address.details}</p>
									</div>
									<div className="flex space-x-3">
										<PencilIcon
											onClick={() => openEditModal(address)}
											className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800"
										/>
										<TrashIcon onClick={deleteAddress} className="w-5 h-5 text-red-600 cursor-pointer hover:text-red-800" />
									</div>
								</div>
							))}
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="mt-[60px] flex h-screen bg-gray-100">
			{/* Sidebar */}
			<aside className="w-64 bg-white shadow-lg p-4">
				<div className="flex flex-col items-center">
					<div className="w-16 h-16 bg-gray-300 rounded-full">
						<img src="/images/user-icon.png" alt="" />
					</div>
					<h2 className="text-lg font-semibold mt-2">
						{user ? user.username : "Loading..."}
					</h2>
				</div>
				<nav className="mt-6">
					<ul className="space-y-3">
						<li>
							<button
								onClick={() => setActiveSection("Orders")}
								className={`text-gray-700 font-medium flex items-center cursor-pointer hover:text-black ${
									activeSection === "Orders" ? "text-black font-semibold" : ""
								}`}
							>
								📦 Orders
							</button>
						</li>
						<li>
							<button
								onClick={() => setActiveSection("CustomerSupport")}
								className={`text-gray-700 font-medium flex items-center cursor-pointer hover:text-black ${
									activeSection === "CustomerSupport"
										? "text-black font-semibold"
										: ""
								}`}
							>
								💬 Customer Support
							</button>
						</li>
						<li>
							<button
								onClick={() => setActiveSection("Addresses")}
								className={`text-gray-700 font-medium flex items-center cursor-pointer hover:text-black ${
									activeSection === "Addresses"
										? "text-black font-semibold"
										: ""
								}`}
							>
								📍 Address
							</button>
						</li>
					</ul>
				</nav>
				<button
					onClick={logout}
					className="mt-4 bg-[#A80038] text-white px-4 py-2 rounded hover:bg-[#FD0054] transition cursor-pointer"
				>
					Logout
				</button>
			</aside>

			{/* Main Content */}
			<main className="flex-1 p-6 bg-white shadow-md rounded-lg mx-6">
				{renderSection()}
			</main>

			{/* Edit Address Modal */}
			{/* Edit Address Modal */}
			{isModalOpen && editedAddress && (
				<div className="fixed inset-0 bg-[#6d6d6d]/50  flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
						<h2 className="text-xl font-semibold mb-4">Edit Address</h2>
						<div className="space-y-4">
							<div>
								<label
									htmlFor="editName"
									className="block text-sm font-medium text-gray-700"
								>
									Name
								</label>
								<input
									type="text"
									id="editName"
									name="name"
									value={editedAddress.name}
									onChange={handleEditChange}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A80038] focus:border-[#A80038]"
								/>
							</div>
							<div>
								<label
									htmlFor="editDetails"
									className="block text-sm font-medium text-gray-700"
								>
									Address Details
								</label>
								<textarea
									id="editDetails"
									name="details"
									value={editedAddress.details}
									onChange={handleEditChange}
									rows={3}
									className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#A80038] focus:border-[#A80038]"
								></textarea>
							</div>
							<div className="flex justify-end space-x-4">
								<button
									onClick={() => setIsModalOpen(false)}
									className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
								>
									Cancel
								</button>
								<button
									onClick={saveEditedAddress}
									className="px-4 py-2 bg-[#A80038] text-white rounded-md hover:bg-pink-600"
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddressBook;
