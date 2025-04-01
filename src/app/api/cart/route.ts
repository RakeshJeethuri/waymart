import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";
import Product from "@/models/productModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, productId, quantity } = body;

        if (!userId || !productId || !quantity) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Check if user already has a cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = new Cart({ user: userId, products: [] });
        }

        // Check if product already exists in cart
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex > -1) {
            // If product exists, update quantity
            cart.products[productIndex].quantity += quantity;
        } else {
            // Else, add new product to cart
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();

        return NextResponse.json({
            message: "Product added to cart",
            success: true,
            cart
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/** 🛒 GET USER CART */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const cart = await Cart.findOne({ user: userId }).populate("products.product", "name price image");

        if (!cart) {
            return NextResponse.json({ message: "Cart is empty", success: true, cart: [] });
        }

        return NextResponse.json({
            message: "Cart retrieved successfully",
            success: true,
            cart
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/** 🛒 REMOVE PRODUCT FROM CART */
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const productId = searchParams.get("productId");

        if (!userId || !productId) {
            return NextResponse.json({ error: "User ID and Product ID are required" }, { status: 400 });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return NextResponse.json({ error: "Cart not found" }, { status: 404 });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId);

        await cart.save();

        return NextResponse.json({
            message: "Product removed from cart",
            success: true
        });

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
