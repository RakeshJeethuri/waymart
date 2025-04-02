"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"; // Import the normal CSS file

interface CartItem {
	productId: string;
	name: string;
	image: string;
	price: number;
	quantity: number;
	stock: number;
}

const CartPage = () => {
	const [cart, setCart] = useState<CartItem[]>([]);

	// Dummy API URL
	const DUMMY_API_URL = "https://jsonplaceholder.typicode.com/posts";

	useEffect(() => {
		const fetchCart = async () => {
			try {
				// Simulate fetching cart data from a dummy API
				const response = await axios.get(DUMMY_API_URL);
				const dummyCart = [
					{
						productId: "1",
						name: "Apple",
						image: "https://via.placeholder.com/150",
						price: 1.5,
						quantity: 2,
						stock: 10,
					},
					{
						productId: "2",
						name: "Banana",
						image: "https://via.placeholder.com/150",
						price: 0.5,
						quantity: 5,
						stock: 20,
					},
				];
				setCart(dummyCart);
			} catch (error) {
				console.error("Error fetching cart:", error);
			}
		};

		fetchCart();
	}, []);

	const handleIncrement = async (productId: string) => {
		setCart((prevCart) =>
			prevCart.map((item) =>
				item.productId === productId && item.quantity < item.stock
					? { ...item, quantity: item.quantity + 1 }
					: item
			)
		);

		// Simulate posting updated cart to the dummy API
		try {
			await axios.post(DUMMY_API_URL, {
				productId,
				action: "increment",
			});
			console.log("Incremented quantity successfully");
		} catch (error) {
			console.error("Error incrementing quantity:", error);
		}
	};

	const handleDecrement = async (productId: string) => {
		const item = cart.find((item) => item.productId === productId);
		if (item && item.quantity > 1) {
			setCart((prevCart) =>
				prevCart.map((item) =>
					item.productId === productId
						? { ...item, quantity: item.quantity - 1 }
						: item
				)
			);

			// Simulate posting updated cart to the dummy API
			try {
				await axios.post(DUMMY_API_URL, {
					productId,
					action: "decrement",
				});
				console.log("Decremented quantity successfully");
			} catch (error) {
				console.error("Error decrementing quantity:", error);
			}
		} else if (item && item.quantity === 1) {
			handleRemove(productId);
		}
	};

	const handleRemove = async (productId: string) => {
		setCart((prevCart) =>
			prevCart.filter((item) => item.productId !== productId)
		);

		// Simulate removing item from the dummy API
		try {
			await axios.post(DUMMY_API_URL, {
				productId,
				action: "remove",
			});
			console.log("Removed item successfully");
		} catch (error) {
			console.error("Error removing item:", error);
		}
	};

	const calculateTotal = () => {
		return cart
			.reduce((total, item) => total + item.price * item.quantity, 0)
			.toFixed(2);
	};

	return (
		<div className="cart-container">
			<h1 className="cart-header">Your Cart</h1>
			{cart.length === 0 ? (
				<p className="empty-cart-message">Your cart is empty.</p>
			) : (
				<div>
					{cart.map((item) => (
						<div key={item.productId} className="cart-item">
							<div>
								<img src={item.image} alt={item.name} />
								<h2>{item.name}</h2>
								<p>Price: ${item.price}</p>
							</div>

							<div className="quantity-controls">
								<div className="quantity-buttons">
									<button onClick={() => handleDecrement(item.productId)}>-</button>
									<span>{item.quantity}</span>
									<button onClick={() => handleIncrement(item.productId)}>+</button>
								</div>

								<p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
								<button onClick={() => handleRemove(item.productId)}>
									Remove
								</button>
							</div>
						</div>
					))}
					<div>
						<h2 className="cart-total">Total: ${calculateTotal()}</h2>
						<div className="checkout-container">
							<button className="checkout-button">Checkout</button>
							<a href="/UserHomePage/Home" className="back-btn">Back</a>
						</div>
						
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPage;
