import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/orderModel";
import { connect } from "@/dbConfig/dbConfig";
connect();
export async function PUT(request: NextRequest) {
    try {

        const body = await request.json();
        const { orderId, productId, vendorId } = body; // Extract parameters from body

        if (!orderId || !productId || !vendorId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Find the order and update the product's "confrom" field
        const order = await Order.findOneAndUpdate(
            { _id: orderId, "products.product": productId, "products.vendor": vendorId },
            { $set: { "products.$.confrom": true } },
            { new: true }
        );

        if (!order) {
            return NextResponse.json({ message: "Order or product not found!" }, { status: 404 });
        }

        return NextResponse.json({ message: "Order confirmed successfully", success: true, order });

    } catch (error: any) {
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}
