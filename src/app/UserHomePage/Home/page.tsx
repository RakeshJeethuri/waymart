"use client";

import React, { useEffect, useState } from "react";
import Layout from "../Layout/page";
import "./style.css";
import axios from "axios";

const Home = () => {
	interface Product {
		_id: string;
		name: string;
		description: string;
		price: number;
		image: string;
		category: string;
		stock: number;
	}

	interface CartItem extends Product {
		quantity: number;
	}

	interface User {
		_id: string;
		username: string;
	}

	const [products, setProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [cart, setCart] = useState<CartItem[]>([]);
	const [user, setUser] = useState<User | null>(null);

	// Fetch Products & User Data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [productsRes, userRes] = await Promise.all([
					axios.get("/api/products"),
					axios.get("/api/users/me"),
				]);

				setProducts(productsRes.data.products);
				setFilteredProducts(productsRes.data.products);
				setUser(userRes.data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	const handleAll = () => setFilteredProducts(products);

	const handleCategoryFilter = (category: string) => {
		setFilteredProducts(products.filter(
			(product) => product.category.toLowerCase() === category.toLowerCase()
		));
	};

	// Add to Cart & Update API
	const handleAddToCart = async (product: Product) => {
		if (!user) {
			alert("Please log in to add items to the cart.");
			return;
		}

		const existingItem = cart.find((item) => item._id === product._id);
		const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

		if (newQuantity > product.stock) {
			alert(`Only ${product.stock} available in stock.`);
			return;
		}

		const updatedCart = existingItem
			? cart.map((item) =>
					item._id === product._id ? { ...item, quantity: newQuantity } : item
			  )
			: [...cart, { ...product, quantity: 1 }];

		setCart(updatedCart);

		try {
			await axios.post("/api/cart", {
				userId: user._id,
				productId: product._id,
				quantity: newQuantity,
			});
			console.log("Cart updated successfully");
		} catch (error) {
			console.error("Error updating cart:", error);
		}
	};

	// Handle Increment Quantity
	const handleIncrement = async (productId: string) => {
		const updatedCart = cart.map((item) =>
			item._id === productId
				? item.quantity + 1 <= item.stock
					? { ...item, quantity: item.quantity + 1 }
					: (alert(`Only ${item.stock} available in stock.`), item)
				: item
		);
		setCart(updatedCart);

		const updatedItem = updatedCart.find((item) => item._id === productId);
		if (updatedItem && updatedItem.quantity <= updatedItem.stock) {
			try {
				await axios.put("/api/cart", {
					userId: user?._id,
					productId,
					quantity: updatedItem.quantity,
				});
				console.log("Cart item quantity increased");
			} catch (error) {
				console.error("Error updating cart:", error);
			}
		}
	};

	// Handle Decrement Quantity
	const handleDecrement = async (productId: string) => {
		const updatedCart = cart
			.map((item) =>
				item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
			)
			.filter((item) => item.quantity > 0);

		setCart(updatedCart);

		const updatedItem = updatedCart.find((item) => item._id === productId);
		if (updatedItem) {
			try {
				await axios.put("/api/cart", {
					userId: user?._id,
					productId,
					quantity: updatedItem.quantity,
				});
				console.log("Cart item quantity decreased");
			} catch (error) {
				console.error("Error updating cart:", error);
			}
		} else {
			try {
				await axios.delete("/api/cart", {
					data: { userId: user?._id, productId },
				});
				console.log("Cart item removed");
			} catch (error) {
				console.error("Error removing item from cart:", error);
			}
		}
	};

	return (
		<Layout>
			<div className="home">
				<h2>Hello, {user?.username}</h2>

				<div className="category">
					<button onClick={handleAll}>All</button>
					<button onClick={() => handleCategoryFilter("Fruits")}>Fruits</button>
					<button onClick={() => handleCategoryFilter("Vegetables")}>
						Vegetables
					</button>
					<button onClick={() => handleCategoryFilter("Cereals")}>
						Cereals
					</button>
				</div>

				{/* Products Section */}
				<div className="products">
					{filteredProducts.map((product) => {
						const cartItem = cart.find((item) => item._id === product._id);
						return (
							<div key={product._id} className="product-card">
								<img
									src={product.image.startsWith("http") ? product.image : "/fallback-image.jpg"}
									alt={product.name}
								/>
								<h2>{product.name}</h2>
								<p>{product.description}</p>
								<p>Price: ${product.price}</p>
								{cartItem ? (
									<div className="quantity-controls">
										<button onClick={() => handleDecrement(product._id)}>-</button>
										<span>{cartItem.quantity}</span>
										<button onClick={() => handleIncrement(product._id)}>+</button>
									</div>
								) : (
									<button onClick={() => handleAddToCart(product)}>Add to Cart</button>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</Layout>
	);
};

export default Home;
