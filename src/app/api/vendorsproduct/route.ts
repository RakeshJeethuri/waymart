import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import Vendor from "@/models/vendorModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        // Extract vendorId from the request body
        const { vendorId } = await request.json();

        // Check if vendorId is provided
        if (!vendorId) {
            return NextResponse.json({ error: "Vendor ID is required" }, { status: 400 });
        }

        // Find products that belong to the specified vendorId
        const products = await Product.find({ vendor: vendorId }).populate("vendor", "name businessName");

        if (products.length === 0) {
            return NextResponse.json({ message: "No products found for this vendor" }, { status: 404 });
        }

        // Return the list of products
        return NextResponse.json({
            message: "Products retrieved successfully",
            success: true,
            products
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}