import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import Cart from "@/models/cartModel";
import User from "@/models/userModel";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

connect();  

/** 🛒 PLACE ORDER */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, orderTotal, address } = body;

        if (!userId || !orderTotal || !address) {
            return NextResponse.json({ error: "Request body failed" }, { status: 400 });
        }

        // Get user's cart with product and vendor details
        const cart = await Cart.findOne({ user: userId }).populate("products.product");

        if (!cart || cart.products.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        // Filter out any products that are null (deleted from DB but still in cart)
        cart.products = cart.products.filter((item: { product: null; }) => item.product !== null);

        if (cart.products.length === 0) {
            return NextResponse.json({ error: "Cart contains invalid products" }, { status: 400 });
        }

        // Extract vendor IDs for each product
        const productsWithVendor = cart.products.map((item: { product: { _id: any; vendor: any; price: number }; quantity: any; }) => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
            vendor: item.product.vendor, // Ensure vendor ID is included
            confrom: false
        }));

        // Create order
        const order = new Order({
            user: userId,
            products: productsWithVendor,
            orderTotal,
            address
        });

        await order.save();

        // Decrement the quantity of products from vendor's inventory
        for (const item of cart.products) {
            await Product.findByIdAndUpdate(item.product._id, {
                $inc: { stock: -item.quantity }
            });
        }

        // Clear user's cart after order is placed
        await Cart.findOneAndDelete({ user: userId });

        // **Populate response to include vendor details**
        const populatedOrder = await Order.findById(order._id)
            .populate({
                path: "products.product",
                select: "name price vendor", // Select vendor info
                populate: {
                    path: "vendor", // Populate vendor details
                    select: "name _id" // Get vendor ID and name
                }
            })
            .lean();

        return NextResponse.json({
            message: "Order placed successfully",
            success: true,
            order: populatedOrder
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



/**  GET USER ORDERS */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const orders = await Order.find({ user: userId }).populate("products.product", "name price");

        if (!orders.length) {
            return NextResponse.json({ message: "No orders found", success: true, orders: [] });
        }

        return NextResponse.json({
            message: "Orders retrieved successfully",
            success: true,
            orders
        });

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**  UPDATE ORDER STATUS */
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { orderId, newStatus } = body;

        if (!orderId || !newStatus) {
            return NextResponse.json({ error: "Order ID and new status are required" }, { status: 400 });
        }

        const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
        if (!validStatuses.includes(newStatus)) {
            return NextResponse.json({ error: "Invalid order status" }, { status: 400 });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        order.orderStatus = newStatus;
        await order.save();

        return NextResponse.json({
            message: "Order status updated successfully",
            success: true,
            order
        });

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


/**  CANCEL ORDER */
export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { orderId } = body;

        if (!orderId) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        if (order.orderStatus === "Shipped" || order.orderStatus === "Delivered") {
            return NextResponse.json({ error: "Cannot cancel shipped or delivered orders" }, { status: 400 });
        }

        await Order.findByIdAndDelete(orderId);

        return NextResponse.json({
            message: "Order cancelled successfully",
            success: true
        });

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

