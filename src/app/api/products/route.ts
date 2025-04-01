import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import Vendor from "@/models/vendorModel";
import { NextRequest, NextResponse } from "next/server";

connect();

/** 🛍️ ADD PRODUCT (Only Vendor) */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { vendorId, name, description, price, stock, category, image } = body;

        if (!vendorId || !name || !description || !price || !stock || !category || !image) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if vendor exists
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
        }

        // Create new product
        const product = new Product({ vendor: vendorId, name, description, price, stock, category, image });
        await product.save();

        return NextResponse.json({
            message: "Product added successfully",
            success: true,
            product
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/** 🛍️ GET ALL PRODUCTS */
export async function GET() {
    try {
        const products = await Product.find().populate("vendor", "name businessName");
        return NextResponse.json({
            message: "Products retrieved successfully",
            success: true,
            products
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/** 🛍️ DELETE PRODUCT (Only Vendor) */
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get("productId");
        const vendorId = searchParams.get("vendorId");

        if (!productId || !vendorId) {
            return NextResponse.json({ error: "Product ID and Vendor ID are required" }, { status: 400 });
        }

        // Check if product exists
        const product = await Product.findOne({ _id: productId, vendor: vendorId });

        if (!product) {
            return NextResponse.json({ error: "Product not found or unauthorized" }, { status: 404 });
        }

        await Product.findByIdAndDelete(productId);

        return NextResponse.json({
            message: "Product deleted successfully",
            success: true
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
