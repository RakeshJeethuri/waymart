// "use client";

// import React, { useEffect, useState } from "react";
// import Layout from "../Layout/page";
// import "./style.css";
// import axios from "axios";
// import { set } from "mongoose";

// const Home = () => {
// 	interface Product {
// 		_id: string;
// 		name: string;
// 		description: string;
// 		price: number;
// 		image: string;
// 		category: string;
// 		stock: number;
// 	}

// 	interface CartItem extends Product {
// 		quantity: number;
// 	}

// 	const [products, setProducts] = useState<Product[]>([]);
// 	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
// 	const [cart, setCart] = useState<CartItem[]>([]);
// 	interface User {
// 		_id: string; // Add the _id property
// 		username: string;
// 		// Add other properties of the user object as needed
// 	}

// 	const [user, setUser] = useState<User | null>(null);
// 	const [quantity, setQuantity] = useState(0);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await axios.get("/api/products");
// 				console.log("Products API Response:", response.data);
	
// 				try {
// 					const users = await axios.get("/api/users/me");
// 					console.log(users.data.data);
// 					setUser(users.data.data);
// 				} catch (userError) {
// 					console.error("Error fetching user data:", userError);

// 				}
	
// 				setProducts(response.data.products);
// 				setFilteredProducts(response.data.products);
// 			} catch (error) {
// 				console.error("Error fetching data:", error);
// 			}
// 		};
// 		fetchData();
// 	}, []);
// 	const handleAll = () => setFilteredProducts(products);

// 	const handleCategoryFilter = (category: string) => {
// 		setFilteredProducts(
// 			products.filter((product) =>
// 				product.category.toLowerCase().includes(category.toLowerCase())
// 			)
// 		);
// 	};

// 	const handleAddToCart = async (product: Product) => {
// 		const userId = user?._id; // Replace with actual user ID logic
// 		console.log("User ID:", userId);
// 		const productId = product._id;
// 		const quantity = 1;
	
// 		setCart((prevCart) => {
// 			const existingItem = prevCart.find((item) => item._id === productId);
// 			if (existingItem) {
// 				if (existingItem.quantity < product.stock) {
// 					return prevCart.map((item) =>
// 						item._id === productId
// 							? { ...item, quantity: item.quantity + 1 }
// 							: item
// 					);
// 				} else {
// 					alert(`Only ${product.stock} available in stock.`);
// 					return prevCart;
// 				}
// 			} else {
// 				if (product.stock > 0) {
// 					return [...prevCart, { ...product, quantity: 1 }];
// 				} else {
// 					alert(`This product is out of stock.`);
// 					return prevCart;
// 				}
// 			}
// 		});
	
// 		// Post the cart item to the API
// 		try {
// 			await axios.post("/api/cart", {
// 				userId,
// 				productId,
// 				quantity,
// 			});
// 			console.log("Cart item added successfully");
// 		} catch (error) {
// 			console.error("Error adding item to cart:", error);
// 		}
// 	};

// 	const handleIncrement = (productId: string) => {
// 		setCart((prevCart) =>
// 			prevCart.map((item) =>
// 				item._id === productId
// 					? item.quantity + 1 <= item.stock
// 						? { ...item, quantity: item.quantity + 1 }
// 						: (alert(`Only ${item.stock} available in stock.`), item)
// 					: item
// 			)
// 		);
// 	};

// 	const handleDecrement = (productId: string) => {
// 		setCart((prevCart) =>
// 			prevCart
// 				.map((item) =>
// 					item._id === productId
// 						? { ...item, quantity: Math.max(item.quantity - 1, 0) }
// 						: item
// 				)
// 				.filter((item) => item.quantity > 0)
// 		);
// 	};

// 	return (
// 		<Layout>
// 			<div className="home">
// 				<h2>Hello, {user?.username}</h2>

// 				<div className="category">
// 					<button onClick={handleAll}>All</button>
// 					<button onClick={() => handleCategoryFilter("Fruits")}>Fruits</button>
// 					<button onClick={() => handleCategoryFilter("Vegetables")}>
// 						Vegetables
// 					</button>
// 					<button onClick={() => handleCategoryFilter("Cereals")}>
// 						Cereals
// 					</button>
// 				</div>

// 				{/* Products Section */}
// 				<div className="products">
//     {filteredProducts.map((product) => {
//         const cartItem = cart.find((item) => item._id === product._id);
//         return (
//             <div key={product._id} className="product-card">
//                 <img
//                     src={product.image.startsWith("http") ? product.image : "/fallback-image.jpg"}
//                     alt={product.name}
//                 />
//                 <h2>{product.name}</h2>
//                 <p>{product.description}</p>
//                 <p>Price: ${product.price}</p>
//                 {/* <p>Stock: {product.stock}</p> */}
//                 {cartItem ? (
//                     <div className="quantity-controls">
//                         <button onClick={() => handleDecrement(product._id)}>-</button>
//                         <span>{cartItem.quantity}</span>
//                         <button onClick={() => handleIncrement(product._id)}>+</button>
//                     </div>
//                 ) : (
//                     <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
//                 )}
//             </div>
//         );
//     })}
// </div>
// 			</div>
// 		</Layout>
// 	);
// };

// export default Home;

"use client";

import React, { useEffect, useState } from "react";
import Layout from "../Layout/page";
import "./style.css";
import { CldImage } from 'next-cloudinary';
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

	const [products, setProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [cart, setCart] = useState<CartItem[]>([]);
	
	interface User {
		_id: string;
		username: string;
	}

	const [user, setUser] = useState<User | null>(null);

	// Fetch Products, User, and Cart Data on Page Load
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch products
				const productResponse = await axios.get("/api/products");
				setProducts(productResponse.data.products);
				setFilteredProducts(productResponse.data.products);

				// Fetch user data
				const userResponse = await axios.get("/api/users/me");
				const currentUser = userResponse.data.data;
				setUser(currentUser);

				if (currentUser?._id) {
					// Fetch cart data
					const cartResponse = await axios.get(`/api/cart?userId=${currentUser._id}`);
					if (cartResponse.data.success) {
						const cartItems = cartResponse.data.cart.products.map((item: any) => ({
							...item.product,
							quantity: item.quantity,
						}));
						setCart(cartItems);
					}
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	const handleAll = () => setFilteredProducts(products);

	const handleCategoryFilter = (category: string) => {
		setFilteredProducts(
			products.filter((product) =>
				product.category.toLowerCase().includes(category.toLowerCase())
			)
		);
	};

	const handleAddToCart = async (product: Product) => {
		if (!user) return alert("Please log in to add items to the cart.");

		const existingItem = cart.find((item) => item._id === product._id);
		const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

		if (newQuantity > product.stock) {
			alert(`Only ${product.stock} available in stock.`);
			return;
		}

		try {
			await axios.post("/api/cart", {
				userId: user._id,
				productId: product._id,
				quantity: 1, // Always add one item at a time
			});

			// Fetch updated cart from backend
			const cartResponse = await axios.get(`/api/cart?userId=${user._id}`);
			const cartItems = cartResponse.data.cart.products.map((item: any) => ({
				...item.product,
				quantity: item.quantity,
			}));
			setCart(cartItems);
		} catch (error) {
			console.error("Error adding item to cart:", error);
		}
	};

	const handleIncrement = async (productId: string) => {
		const cartItem = cart.find((item) => item._id === productId);
		if (!cartItem || cartItem.quantity >= cartItem.stock) {
			alert(`Only ${cartItem?.stock} available in stock.`);
			return;
		}

		try {
			await axios.post("/api/cart", {
				userId: user?._id,
				productId,
				quantity: 1, // Increment by 1
			});

			// Fetch updated cart from backend
			const cartResponse = await axios.get(`/api/cart?userId=${user?._id}`);
			const cartItems = cartResponse.data.cart.products.map((item: any) => ({
				...item.product,
				quantity: item.quantity,
			}));
			setCart(cartItems);
		} catch (error) {
			console.error("Error updating cart quantity:", error);
		}
	};

	const handleDecrement = async (productId: string) => {
		const cartItem = cart.find((item) => item._id === productId);
		if (!cartItem || cartItem.quantity <= 1) return;

		try {
			await axios.post("/api/cart", {
				userId: user?._id,
				productId,
				quantity: -1, // Decrease by 1
			});

			// Fetch updated cart from backend
			const cartResponse = await axios.get(`/api/cart?userId=${user?._id}`);
			const cartItems = cartResponse.data.cart.products.map((item: any) => ({
				...item.product,
				quantity: item.quantity,
			}));
			setCart(cartItems);
		} catch (error) {
			console.error("Error updating cart quantity:", error);
		}
	};

	return (
		<Layout>
			<div className="home">
			{user ? <h2>Hello, {user.username}!</h2> : <h2>Welcome to WayMart!</h2>}

				<div className="category">
					<button onClick={handleAll}>All</button>
					<button onClick={() => handleCategoryFilter("Fruits")}>Fruits</button>
					<button onClick={() => handleCategoryFilter("Vegetables")}>Vegetables</button>
					<button onClick={() => handleCategoryFilter("Cereals")}>Cereals</button>
				</div>

				{/* Products Section */}
				<div className="products">
					{filteredProducts.map((product) => {
						const cartItem = cart.find((item) => item._id === product._id);
						return (
							<div key={product._id} className="product-card">
								<CldImage
														width="960"
														height="600"
														src={product.image}
														sizes="100vw"
														alt="transformed image"
														crop="fill"
														// aspectRatio={socialFormats[selectedFormat].aspectRatio}
														gravity='auto'
														// ref={imageRef}
														// onLoad={() => setIsTransforming(false)}
														/>  
								<h2>{product.name}</h2>
								<p>{product.description}</p>
								<p>Price: ${product.price}</p>
								{/* <p>Stock: {product.stock}</p> */}
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
