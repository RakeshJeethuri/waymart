"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./style.css";
import Layout from "../Layout/page";

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
			<div className="main-content cart-container">
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
											<img src={item.product.image} alt={item.product.name} />
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
								<button className="checkout-button">Checkout</button>
							</div>
						</div>
					</div>
				)}
				<div className="back"><a href="/UserHomePage/Home" className="back-btn">Back</a></div>
				
			</div>
		</Layout>
	);
};

export default CartPage;
