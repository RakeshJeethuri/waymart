"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import Nav from "./Navbar/page"; // Import Nav component

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get("/api/products");
        setProducts(productResponse.data.products);
        setFilteredProducts(productResponse.data.products);

        const userResponse = await axios.get("/api/users/me");
        const currentUser = userResponse.data.data;
        setUser(currentUser);

        if (currentUser?._id) {
          const cartResponse = await axios.get(`/api/cart?userId=${currentUser._id}`);
          if (cartResponse.data.success) {
            const cartItems = cartResponse.data.cart.products.map((item: { product: Product; quantity: number }) => ({
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
        quantity: 1,
      });

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
        quantity: 1,
      });

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
        quantity: -1,
      });

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

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      // If the search bar is empty, revert to the previously filtered products
      setFilteredProducts(products);
    } else {
      // Filter products based on the search query
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div>
      {/* Pass the handleSearch function to the Nav component */}
      <Nav onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto mt-16 p-6 max-md:mt-28">
        <h2 className="text-2xl text-center text-[#A80038] font-semibold mb-6">
          {user ? `Hello, ${user.username}!` : "Welcome to WayMart!"}
        </h2>

        <div className="flex justify-center gap-4 mb-6">
          {["All", "Fruits", "Vegetables", "Cereals"].map((category) => (
            <button
              key={category}
              onClick={() =>
                category === "All"
                  ? handleAll()
                  : handleCategoryFilter(category)
              }
              className="bg-[#A80038] text-white px-4 py-2 rounded-md hover:bg-pink-200 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            const cartItem = cart.find((item) => item._id === product._id);
            return (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg overflow-hidden text-center p-4 hover:shadow-lg transition-transform"
              >
                <CldImage
                  width="960"
                  height="600"
                  src={product.image || "fallback-image.jpg"} // Use fallback if image is missing
                  sizes="100vw"
                  alt={product.name}
                  crop="fill"
                  gravity="auto"
                  className="w-full h-40 object-cover mb-4 rounded"
                />
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Price: ${product.price}
                </p>

                {cartItem ? (
                  <div className="flex items-center justify-center gap-3 mt-2">
                    <button
                      onClick={() => handleDecrement(product._id)}
                      className="bg-[#A80038] text-white px-3 py-1 rounded hover:bg-pink-200 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-base font-bold text-gray-700">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrement(product._id)}
                      className="bg-[#A80038] text-white px-3 py-1 rounded hover:bg-pink-200 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#A80038] text-white mt-3 px-4 py-2 rounded hover:bg-pink-200 cursor-pointer"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;