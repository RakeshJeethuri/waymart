// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./style.css";
// import Layout from "../Layout/page";

// const DUMMY_API_URL = "/api/cart"; // Replace with the actual API URL

// interface Product {
// 	_id: string;
// 	name: string;
// 	image: string;
// 	price: number;
// }

// interface CartItem {
// 	_id: string;
// 	product: Product | null; // Handle cases where product might be null
// 	quantity: number;
// }

// const CartPage = () => {
// 	const [cart, setCart] = useState<CartItem[]>([]);
// 	const [user, setUser] = useState(null);

// 	useEffect(() => {
// 		const fetchCart = async () => {
// 			try {
// 				// Fetch user data
				
				
// 				const userResponse = await axios.get("/api/users/me");
// 				const currentUser = userResponse.data.data;
// 				console.log("User data", currentUser);
				
// 				setUser(currentUser);

// 				// Fetch cart data
// 				const response = await axios.get(`/api/cart?userId=${currentUser._id}`);
// 				const cartData = response.data.cart.products;
// 				setCart(cartData);
// 				console.log("Cart data", cartData);
// 			} catch (error) {
// 				console.error("Error fetching cart:", error);
// 			}
// 		};

// 		fetchCart();
// 	}, []);
// 	const handleIncrement = async (productId: string) => {
// 		const userId = user?._id; // Get the userId from the user state
	
// 		setCart((prevCart) =>
// 			prevCart.map((item) =>
// 				item.product?._id === productId && item.quantity < 10 // Assuming max stock is 10
// 					? { ...item, quantity: item.quantity + 1 }
// 					: item
// 			)
// 		);
	
// 		try {
// 			await axios.post(DUMMY_API_URL, {
// 				userId, // Include userId in the request
// 				productId,
// 				quantity: cart.find((item) => item.product?._id === productId)?.quantity! + 1,
// 			});
// 			console.log("Incremented quantity successfully");
// 		} catch (error) {
// 			console.error("Error incrementing quantity:", error);
// 		}
// 	};
	
// 	const handleDecrement = async (productId: string) => {
// 		const userId = user?._id; // Get the userId from the user state
	
// 		setCart((prevCart) =>
// 			prevCart.map((item) =>
// 				item.product?._id === productId && item.quantity > 1
// 					? { ...item, quantity: item.quantity - 1 }
// 					: item
// 			)
// 		);
	
// 		try {
// 			const updatedItem = cart.find((item) => item.product?._id === productId);
// 			await axios.post(DUMMY_API_URL, {
// 				userId, // Include userId in the request
// 				productId,
// 				quantity: updatedItem?.quantity! - 1,
// 			});
// 			console.log("Decremented quantity successfully");
// 		} catch (error) {
// 			console.error("Error decrementing quantity:", error);
// 		}
// 	};
	
// 	const handleRemove = async (productId: string) => {
// 		const userId = user?._id; // Get the userId from the user state
// 		setCart((prevCart) =>
// 			prevCart.filter((item) => item.product?._id !== productId)
// 		);
	
// 		try {
// 			await axios.post(DUMMY_API_URL, {
// 				userId, // Include userId in the request
// 				productId,
// 				action: "remove",
// 			});
// 			console.log("Removed item successfully");
// 		} catch (error) {
// 			console.error("Error removing item:", error);
// 		}
// 	};

// 	const calculateTotal = () => {
// 		return cart
// 			.reduce((total, item) => {
// 				if (item.product) {
// 					return total + item.product.price * item.quantity;
// 				}
// 				return total;
// 			}, 0)
// 			.toFixed(2);
// 	};

// 	return (
// 		<Layout>
// 			<div className="cart-container">
// 				<h1 className="cart-header">Your Cart</h1>
// 				{cart.length === 0 ? (
// 					<p className="empty-cart-message">Your cart is empty.</p>
// 				) : (
// 					<div>
// 						{cart
// 							.filter((item) => item.product !== null) // Filter out items with null products
// 							.map((item) => (
// 								<div key={item._id} className="cart-item">
// 									<div>
// 										<img src={item.product!.image} alt={item.product!.name} />
// 										<h2>{item.product!.name}</h2>
// 										<p>Price: ${item.product!.price}</p>
// 									</div>
	
// 									<div className="quantity-controls">
// 										<div className="quantity-buttons">
// 											<button onClick={() =>item.product && handleDecrement(item.product._id)}>-</button>
// 											<span>{item.quantity}</span>
// 											<button
// 												onClick={() =>
// 													item.product && handleIncrement(item.product._id)
// 												}
// 											>
// 												+
// 											</button>
// 										</div>
	
// 										<p>
// 											Total: $
// 											{(item.product!.price * item.quantity).toFixed(2)}
// 										</p>
// 										<button
// 											onClick={() =>
// 												item.product && handleRemove(item.product._id)
// 											}
// 										>
// 											Remove
// 										</button>
// 									</div>
// 								</div>
// 							))}
// 						<div>
// 							<h2 className="cart-total">Total: ${calculateTotal()}</h2>
// 							<div className="checkout-container">
// 								<button className="checkout-button">Checkout</button>
// 								<a href="/UserHomePage/Home" className="back-btn">
// 									Back
// 								</a>
// 							</div>
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</Layout>
// 	);
// };

// export default CartPage;


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
				setCart(response.data.cart.products);
			} catch (error) {
				console.error("Error fetching cart:", error);
			}
		};

		fetchCart();
	}, []);

	const updateCart = useCallback(async (productId: string, quantity: number) => {
		if (!user) return;

		setCart((prevCart) =>
			prevCart.map((item) =>
				item.product?._id === productId ? { ...item, quantity } : item
			)
		);

		try {
			await axios.post(API_URL, {
				userId: user._id,
				productId,
				quantity,
			});
		} catch (error) {
			console.error("Error updating cart:", error);
		}
	}, [user]);

	const handleIncrement = (productId: string) => {
		const item = cart.find((item) => item.product?._id === productId);
		if (item && item.quantity < 10) {
			updateCart(productId, item.quantity + 1);
		}
	};

	const handleDecrement = (productId: string) => {
		const item = cart.find((item) => item.product?._id === productId);
		if (item && item.quantity > 1) {
			updateCart(productId, item.quantity - 1);
		} else if (item && item.quantity === 1) {
			handleRemove(productId);
		}
	};

	const handleRemove = async (productId: string) => {
		if (!user) return;

		setCart((prevCart) =>
			prevCart.filter((item) => item.product?._id !== productId)
		);

		try {
			await axios.delete(`${API_URL}?userId=${user._id}&productId=${productId}`);
		} catch (error) {
			console.error("Error removing item:", error);
		}
	};

	const calculateTotal = () => {
		return cart
			.reduce((total, item) =>
				item.product ? total + item.product.price * item.quantity : total,
			0)
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
                    {cart
                        .filter((item) => item.product !== null) // Filter out items with null products
                        .map((item) => (
                            <div key={item._id} className="cart-item">
                                <div>
                                    <img src={item.product!.image} alt={item.product!.name} />
                                    <h2>{item.product!.name}</h2>
                                    <p>Price: ${item.product!.price}</p>
                                </div>
                                <div className="quantity-controls">
                                    <div className="quantity-buttons">
                                        <button onClick={() => handleDecrement(item.product!._id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrement(item.product!._id)}>+</button>
                                    </div>
                                    <p>Total: ${(item.product!.price * item.quantity).toFixed(2)}</p>
                                    <button onClick={() => handleRemove(item.product!._id)}>Remove</button>
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
    </Layout>
);
};

export default CartPage;
