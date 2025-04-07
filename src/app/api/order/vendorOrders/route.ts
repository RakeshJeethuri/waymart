import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/orderModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const vendorId = request.nextUrl.searchParams.get("vendorId");

        if (!vendorId) {
            return NextResponse.json({ message: "Vendor ID is required" }, { status: 400 });
        }

        // Fetch orders containing products from this vendor
        const vendorOrders = await Order.find({
            "products.vendor": vendorId
        }).select("_id user products orderStatus orderDate");

        // Filter only relevant products
        const formattedOrders = vendorOrders.map(order => ({
            orderId: order._id,
            user: order.user,
            orderStatus: order.orderStatus,
            orderDate: order.orderDate,
            products: order.products
                .filter(p => p.vendor.toString() === vendorId)
                .map(p => ({
                    productId: p.product._id,
                    name: p.product.name,
                    price: p.product.price,
                    quantity: p.quantity,
                    conform: p.confrom
                }))
        }));

        return NextResponse.json({ success: true, orders: formattedOrders });

    } catch (error: any) {
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
}
    