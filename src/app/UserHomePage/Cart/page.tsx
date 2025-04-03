"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./style.css";
import Layout from "../Layout/page";
import { handleUseCurrentLocation } from "@/utils/locationUtils";
import { toast, ToastContainer } from "react-toastify";
import { CldImage } from 'next-cloudinary';

const API_URL = "/api/cart";

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
	const [isEditable, setIsEditable] = useState(false); // Track the selected tip button

	const placeorder = async () => {
		try {
			const res = await axios.post("/api/order", { userId: user?._id, orderTotal: getTotalAmount(), address: location });
			console.log(res);
			const res1 = await axios.post("/api/address", { userId: user?._id, address: location })
			console.log(res1)
			toast.success("Order placed")
		}
		catch (e) {
			console.log(e);
		}
	}
	// Function to update the tip
	const handleTip = (amount: number) => {
		if (selectedTipButton === amount) {
			setTip(0); // Remove the tip if the same button is clicked again
			setSelectedTipButton(null); // Reset the selected button
		} else {
			setTip(amount);
			setSelectedTipButton(amount); // Set the new selected tip button
		}
	};

	// Function to calculate the total amount with GST and tip
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
					response.data.cart.products.filter(
						(item: CartItem) => item.product !== null
					)
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
					response.data.cart.products.filter(
						(item: CartItem) => item.product !== null
					)
				);
			} catch (error) {
				console.error("Error updating cart:", error);
			}
		},
		[user]
	);

	const handleIncrement = (productId: string) => {
		updateCart(productId, 1);
	};

	const handleDecrement = (productId: string) => {
		const item = cart.find((item) => item.product?._id === productId);
		if (item && item.quantity > 1) {
			updateCart(productId, -1);
		} else if (item && item.quantity === 1) {
			handleRemove(productId);
		}
	};
	const handleButtonClick = async () => {
		try {
			const data = await handleUseCurrentLocation();
			console.log(data);
			setLocation(data.display_name);
		} catch (error) {
			console.error(error);
		}
	}


	// Open Checkout Modal
	const handleCheckout = () => {
		setShowModal(true);
	};

	// Close Checkout Modal
	const closeModal = () => {
		setShowModal(false);
	};

	const handleRemove = async (productId: string) => {
		if (!user) return;

		try {
			await axios.delete(
				`${API_URL}?userId=${user._id}&productId=${productId}`
			);
			const response = await axios.get(`/api/cart?userId=${user._id}`);
			setCart(
				response.data.cart.products.filter(
					(item: CartItem) => item.product !== null
				)
			);
		} catch (error) {
			console.error("Error removing item:", error);
		}
	};
	const handleLocationChange = (event) => {
		setLocation(event.target.value);
	};

	const calculateTotal = () => {
		return cart
			.reduce(
				(total, item) =>
					item.product ? total + item.product.price * item.quantity : total,
				0
			)
			.toFixed(2);
	};

	return (
		<Layout>
			<div className="cart-container">
				<h1 className="cart-header">Your Cart</h1>
				{cart.length === 0 ? (
					<p className="empty-cart-message">Your cart is empty.</p>
				) : (
					<div>
						{cart.map((item) => (
							<div key={item._id} className="cart-item">
								{item.product && (
									<>
										<div>

											<CldImage
												width="600"
												height="600"
												src={item.product.image}
												sizes="100vw"
												alt="transformed image"
												crop="fill"
												// aspectRatio={socialFormats[selectedFormat].aspectRatio}
												gravity='auto'

											// onLoad={() => setIsTransforming(false)}
											/>
											<h2>{item.product.name}</h2>
											<p>Price: ${item.product.price}</p>
										</div>
										<div className="quantity-controls">
											<div className="quantity-buttons">
												<button
													onClick={() => handleDecrement(item.product._id)}
												>
													-
												</button>
												<span>{item.quantity}</span>
												<button
													onClick={() => handleIncrement(item.product._id)}
												>
													+
												</button>
											</div>
											<p>
												Total: $
												{(item.product.price * item.quantity).toFixed(2)}
											</p>
											<button onClick={() => handleRemove(item.product._id)}>
												Remove
											</button>
										</div>
									</>
								)}
							</div>
						))}
						<div className="cart-summary">
							<h2 className="cart-total">Total: ${calculateTotal()}</h2>
							<div className="checkout-container">
								<button className="checkout-button" onClick={handleCheckout}>Checkout</button>
							</div>
						</div>
					</div>
				)}
				<div className="back"><a href="/UserHomePage/Home" className="back-btn">Back</a></div>

			</div>
			{showModal && (
				<div className="modal-overlay">
					<div className="modal">
						<h2>Order Summary</h2>

						<table className="order-summary-table">
							<thead>
								<tr>
									<th>Item</th>
									<th>Quantity</th>
									<th>Price</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								{cart.map((item) => (
									<tr key={item._id}>
										<td>{item.product?.name}</td>
										<td>{item.quantity}</td>
										<td>${item.product?.price}</td>
										<td>${(item.product?.price * item.quantity).toFixed(2)}</td>
									</tr>
								))}
							</tbody>
						</table>

						<div className="order-summary-footer">
							<p><strong>Subtotal:</strong> ${calculateTotal()}</p>
							<p><strong>Delivery Fee:</strong> $5.00</p>
							<p><strong>GST (5%):</strong> ${(calculateTotal() * 0.05).toFixed(2)}</p>

							<p><strong>Delivery Partner Tip:</strong>
								<div className="tip-buttons">
									<button
										className={`tip-button ${selectedTipButton === 10 ? 'selected' : ''}`}
										onClick={() => handleTip(10)}>
										₹10
									</button>
									<button
										className={`tip-button ${selectedTipButton === 20 ? 'selected' : ''}`}
										onClick={() => handleTip(20)}>
										₹20
									</button>
									<button
										className={`tip-button ${selectedTipButton === 30 ? 'selected' : ''}`}
										onClick={() => handleTip(30)}>
										₹30
									</button>
								</div>
							</p>

							<p><strong>Delivery Instructions:</strong>
								<textarea placeholder="Add any instructions for delivery" className="instructions-textarea"></textarea>
							</p>

							<p><strong>Total Amount:</strong> ${getTotalAmount()}</p>
							<div className="flex gap-3">
								<button
									onClick={handleButtonClick}
									className=" w-2xs px-6 py-2 h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
								>
									Use My Location
								</button>

								<div className="w-full ">
									<textarea
										value={location}
										onChange={handleLocationChange}
										placeholder="Enter your location"
										disabled={isEditable}
										className="w-full h-32 p-5  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-justify resize-none"
									/>
								</div>
							</div>
						</div>

						<div className="modal-buttons">
							<button className="order-button" onClick={placeorder}>Place Order</button>
							<button className="close-button" onClick={closeModal}>Cancel</button>
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default CartPage;
