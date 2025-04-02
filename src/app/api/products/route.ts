import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import Vendor from "@/models/vendorModel";
import { NextRequest, NextResponse } from "next/server";

import { getCldImageUrl } from 'next-cloudinary';

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
        const url = getCldImageUrl({
            width: 960,
            height: 600,
            src: '"C:/Users/Pavan/Downloads/logo.png"'
          });
        // Create new product
        const product = new Product({ vendor: vendorId, name, description, price, stock, category, image:url });
        await product.save();

        return NextResponse.json({
            message: "Product added successfully",
            success: true,
            product
        }, { status: 201 });

    } catch (error:any) {
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
    } catch (error:any) {
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

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { vendorId, productId, stock,price } = body;

        if (!vendorId || !productId || stock === undefined) {
            return NextResponse.json({ error: "vendorId, productId, and stock are required" }, { status: 400 });
        }

        // Check if vendor exists
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
        }

        // Find product and update stock
        const product = await Product.findOne({ _id: productId, vendor: vendorId });
        if (!product) {
            return NextResponse.json({ error: "Product not found for this vendor" }, { status: 404 });
        }

        product.stock = stock;
        product.price = price;
        await product.save();

        return NextResponse.json({
            message: "Stock updated successfully",
            success: true,
            product
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
