"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
    _id: string;
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

const CartPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("/api/cart", {
                    params: { userId: "guest" }, // Replace with actual user ID logic
                });
                setCartItems(response.data.cartItems);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <div>
            <h1>Cart</h1>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item._id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CartPage;